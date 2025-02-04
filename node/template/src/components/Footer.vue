<script setup lang="ts">
import Links from "./navigation/Links.vue";
import {useShop} from '../store/shop'
import $config from '../utils/$config'
import {Icon} from "@iconify/vue";
const {shop} = useShop()
</script>

<template>
  <section class="text-white pt-20">
    <div class="w-full h-[1px] bg-[#2a3227]">

      <div class="py-6 xl:px-4 flex">
        <div class="flex-1">
          <div class="flex gap-4 items-center">
            <div class="bg-bgSecond bg-opacity-20 h-12 w-12 rounded-2xl flex justify-center items-center">
              <img :src="shop.imageUrl" alt="" class="h-5 w-5">
            </div>
            <h1 class="opacity-50">{{ shop.name }}</h1>
          </div>
          <p class="text-sm opacity-50 mt-6">Serwer nie jest w żaden sposób powiązany z firmą Mojang. Dochody ze sklepu przekazywane są na rzecz właściciela serwisu w celu utrzymania serwera.</p>
        </div>
        <div class="flex-1 hidden xl:inline-block">
          <div class="flex justify-end h-12 translate-x-8 items-center gap-8 text-white transition-all">
            <Links/>
          </div>
          <div class="flex gap-2 justify-end mt-6">
            <a
                v-for="media in $config().socialmedia"
                :href="media.href"
                class="flex justify-center items-center opacity-50 w-10 h-10 bg-[#212121] rounded-lg hover:bg-[#232323] hover:opacity-80 transition-all"
            >
              <Icon :icon="media.icon" width="30" height="30"></Icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
