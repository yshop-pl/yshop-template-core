<template>
  <main class="bg-bg w-full font-light pb-[25vh] xl:pb-[30vh]">
    <div class="px-[10vw] md:px-[12vw] h-screen flex items-center justify-center">
      <div class="text-white text-center flex flex-col items-center gap-y-5 xl:w-1/2 2xl:w-1/3">
        <img src="../assets/images/error.svg" alt="Błąd API">
        <h1 class="text-3xl font-medium">{{error.message}}</h1>
        <span class="text-sm opacity-50">Ta strona jest oparta o API yshop.pl</span>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import {useError} from '../store/error'

const error = useError()
document.title = 'yshop.pl'
</script>