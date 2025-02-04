<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-div bg-opacity-80 transition-opacity flex items-center justify-center z-50">
      <div class="flex flex-col bg-div p-8 rounded-2xl shadow-lg max-w-4xl w-full transition-all">
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center">
            <h2 class="text-2xl font-bold text-white">Voucher</h2>
          </div>
          <button class="text-gray-400 hover:text-white text-2xl focus:outline-none" @click="isOpen = !isOpen">×</button>
        </div>
        <div class="flex pt-6">
          <div class="w-1/2 pr-6">
            <input v-model="state.nickname" placeholder="Wpisz swój nick..." class="w-full p-3 bg-gray-700 text-white rounded-lg mb-6 focus:outline-none" />
            <input v-model="state.code" placeholder="Wpisz kod..." class="w-full p-3 bg-gray-700 text-white rounded-lg mb-6 focus:outline-none" />
            <button @click="useVoucher" class="bg-main-gradient py-3 w-full rounded-lg text-md font-medium">Zrealizuj kod</button>
          </div>
          <div class="w-1/2 flex items-center justify-center">
            <img src="../../assets/images/skin-render.png" alt="Minecraft Render" class="w-full max-w-lg" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import $api from '../../utils/$api'
import sendNotification from '../../utils/sendNotification'

const isOpen = defineModel()

const state = reactive({
  nickname: undefined,
  code: undefined
})

async function useVoucher() {
  const data = await $api("/license/voucher", "POST", state, false)
  if (data && data.message) sendNotification(data.message, "error")
  else {
    sendNotification("Wykorzystano kod vouchera", "success")
    isOpen.value = false
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>