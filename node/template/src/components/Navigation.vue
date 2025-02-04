<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import { useShop } from "../store/shop";
import $config from '../utils/$config'
import Links from "./navigation/Links.vue";
import ButtonBurgerNav from "./navigation/ButtonBurgerNav.vue";
import BurgerNav from "./navigation/BurgerNav.vue";
import VoucherModal from "./modals/VoucherModal.vue";

const config = $config();
const hoverNav = ref(false)

const toogleNav = () => {
  hoverNav.value = !hoverNav.value
}
const playerCount = ref<number>(0)
const isActive = ref<boolean>(false)

const fetchPlayerCount = async () => {
  if (!config.address || !config.status) return
  try {
    const res = await axios.get(`https://api.mcstatus.io/v2/status/java/${config.address}`)
    playerCount.value = res.data.players.online
    isActive.value = true;
  }catch(err) {
    console.error("Bład pobierania graczy online:", err)
    isActive.value = false;
  }
}

onMounted(() => {
  fetchPlayerCount();
})
const isOpen = ref(false)
const {shop} = useShop()
</script>

<template>
  <VoucherModal v-model="isOpen"/>
  <transition name="burger-nav">
    <BurgerNav v-if="hoverNav" @toggle-nav="toogleNav"/>
  </transition>
  <section class="flex justify-between items-center py-12">
    <div class="flex items-center gap-4 text-white">
      <router-link to="/" class="bg-bgSecond bg-opacity-20 h-12 w-12 rounded-2xl flex justify-center items-center">
        <img :src="shop.imageUrl" alt="" class="h-5 w-5">
      </router-link>
      <div class="hidden lg:flex gap-4">
        <router-link to="/" class="opacity-50">{{ shop.name }}</router-link>
        <template v-if="config.status && config.address">
          <div class="border-r border-white h-6 border-opacity-20"></div>
          <div class="relative inline">
            <div class="flex items-center gap-4">
              <div
                  class="w-3 h-3 rounded-full animate-ping"
                  :class="{
                  'bg-main-gradient': isActive,
                  'bg-red-500': !isActive
                }">
              </div>
              <div class="absolute w-3 h-3 rounded-full"
                   :class="{
                  'bg-main-gradient': isActive,
                  'bg-red-500': !isActive
                }">
              </div>
              <p class="opacity-50">gracze online</p>
              <span
                  class="text-mainColor -translate-x-2"
                  :class="{
                  'text-red-500': !isActive
                }"
              >{{ playerCount !== null ? playerCount : '0' }}
            </span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="hidden xl:flex items-center">
      <Links/>
      <button @click="isOpen = !isOpen" class="bg-main-gradient h-10 w-28 rounded-lg text-md font-medium">Voucher</button>
    </div>
    <div class="inline-block xl:hidden">
      <ButtonBurgerNav @toggle-nav="toogleNav"/>
    </div>
  </section>
</template>

<style>
.burger-nav-enter-active, .burger-nav-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.burger-nav-enter-from, .burger-nav-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.burger-nav-enter-to, .burger-nav-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>