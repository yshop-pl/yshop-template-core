<script setup lang="ts">
import $config from '../../utils/$config'
</script>
<template>
  <section class="text-white">
    <div class="flex items-center gap-4">
      <h1 class="text-xl">Administracja</h1>
      <div class="bg-main-gradient h-[0.1rem] w-12"></div>
    </div>
    <div class="flex flex-wrap gap-4 mt-4">
      <div
          v-for="(admin, index) in $config().administration"
          :key="index"
          class="bg-main-gradient w-[340px] flex h-40 rounded-xl text-black">
        <div class="relative flex-1 flex flex-col justify-center items-center">
          <div class="absolute bg-[#161816] opacity-20 border-2 border-black w-28 h-28 rounded-full z-10"></div>
          <img :src="`https://minotar.net/armor/bust/${admin.name}/100.png`" :alt="admin.name" class="w-24 rounded-full object-cover z-20">
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <h2 class="text-xl font-medium">{{ admin.name }}</h2>
          <p class="text-sm ">{{ admin.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
