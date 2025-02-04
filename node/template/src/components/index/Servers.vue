<script setup lang="ts">
import {useShop} from '../../store/shop'

const {shop} = useShop()
</script>
<template>
  <section class="text-white mb-32">
    <div class="flex items-center gap-4">
      <h1 class="text-xl">Wybór Trybu</h1>
      <div class="bg-main-gradient h-[0.1rem] w-12"></div>
    </div>
    <div class="flex flex-wrap gap-4">
      <template v-for="server in shop.servers">
        <div v-if="!server.hidden" class="bg-div bg-opacity-50 w-[400px] h-48 mt-4 rounded-xl p-8 flex">
          <div class="flex-1">
            <h1 class="text-xl font-medium">{{ server.name }}</h1>
            <div class="flex items-center gap-4">
              <div class="w-3 h-3 bg-main-gradient rounded-full animate-ping"></div>
              <div class="absolute w-3 h-3 bg-main-gradient rounded-full"></div>
              <p class="opacity-50 -translate-x-2 text-sm">online</p><span class="text-mainColor text-sm -translate-x-4">5</span>
            </div>
            <router-link :to="`/server/${server.slug}`">
              <div class="pt-14">
                <p class="opacity-50 hover:opacity-70 transition-all text-sm cursor-pointer">Przejdz do sklepu</p>
              </div>
            </router-link>
          </div>
          <div class="flex-1 flex justify-center items-center">
            <div class="w-32 h-32 bg-[#161816] rounded-full">
              <img class="h-32 w-32 rounded-full" :src="server.imageUrl" alt="">
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
