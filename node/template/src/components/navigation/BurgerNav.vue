<template>
  <div class="fixed left-0 z-50 backdrop-blur-2xl w-screen h-screen overscroll-y-none px-[10vw] py-12">
    <div class="flex justify-end">
      <ButtonBurgerNav @click="emitToggleNav"/>
    </div>
    <Links class="flex-col justify-center items-center py-12"/>
<!--    <VoucherButton class="w-full mx-auto"/>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import ButtonBurgerNav from "./ButtonBurgerNav.vue";
import Links from "./Links.vue";

const emit = defineEmits(['toggleNav'])
const emitToggleNav = () => {
  emit('toggleNav')
  document.body.classList.remove('overflow-hidden');
};

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});
</script>
