<script setup lang="ts">
import { onMounted } from "vue";
import Servers from "../components/index/Servers.vue";
import Administration from "../components/index/Administration.vue";
import $config from '../utils/$config'
import {Icon} from "@iconify/vue";
import {useShop} from "../store/shop"

const copy = async (value: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return await navigator.clipboard.writeText(value);
  }

  const copyArea = document.createElement('textarea');
  copyArea.value = value;
  copyArea.style.position = 'absolute';
  copyArea.style.left = '-9999px';
  document.body.appendChild(copyArea);
  copyArea.select();

  try {
    document.execCommand('copy');
  } catch (error) {
    console.log(error);
  } finally {
    copyArea.remove();
  }
};

onMounted(() => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      const element = box.querySelector('.animation-show');
      const valueToCopy = box.getAttribute('copy');

      if (valueToCopy) {
        copy(valueToCopy);
      }

      element?.classList.remove('opacity-0');
      element?.classList.add('translate-y-[50%]');

      setTimeout(() => {
        element?.classList.add('opacity-0');
        element?.classList.remove('translate-y-[50%]');
      }, 750);
    });
  });
});

const config = $config();
const {shop} = useShop()
</script>
<template>
  <section class="text-white">
    <div class="flex my-24 md:my-32">
      <div class="flex-1">
        <h1 class="text-5xl font-semibold">Poznaj świat z <span class="text-mainColor">innej</span> strony!</h1>
        <p class="opacity-50 pt-4">Przywitaj się z Exotia.net! Serwerem Minecraft o niesamowitym charakterze, który zapewnia niezapomniane doznania dzięki wyjątkowym modelom oraz fantastycznym pluginom.</p>
        <div class="flex gap-4 my-8">
          <a href="/" class="bg-main-gradient flex justify-center items-center h-10 w-28 rounded-lg text-md font-medium text-black">Discord</a>
          <button v-if="config.address" :copy="config.address" class="box relative hover:cursor-pointer w-fit h-full rounded-lg flex items-center text-lg">
            <span class="animation-show z-10 absolute inset-0 w-full h-full grid place-content-center opacity-0 transition-all duration-300 ease-in-out">
              <span class="w-fit h-fit text-center text-sm text-light font-bold translate-y-[75%] tracking-wide">Skopiowano!</span>
            </span>
            <span class="flex items-center gap-2 px-3 h-10 bg-div rounded-lg ">
              <span class="z-30 relative text-light text-sm tracking-wide font-medium">{{ config.address }}</span>
              <Icon icon="lucide:copy" class="z-30 icon w-4 h-full text-white hover:opacity-50 transition"/>
            </span>
          </button>
        </div>
      </div>
      <div class="flex-1 hidden xl:flex justify-center items-center">
<!--        <img :src="shop.imageUrl" class="max-h-[250px] "  alt="">-->
        <img src="https://i.imgur.com/P6wzOfJ.png" class="min-h-[330px] max-h-[400px] "  alt="">

      </div>
    </div>
  </section>
  <Servers/>
  <Administration/>
</template>
