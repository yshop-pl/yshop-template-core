<template>
  <main v-if="!error.show && shop.shop" class="bg-bg w-full font-light pb-[25vh] xl:pb-[30vh]">
    <div class="bg-main bg-no-repeat bg-cover bg-center w-full h-full min-h-screen">
      <div class="px-4 sm:px-8 md:px-[10vw] xl:px-[15vw] 2xl:px-[20vw]">
        <Navigation />
        <router-view />
        <Footer />
      </div>
    </div>
  </main>
  <main v-if="error.show">
    <ApiError/>
  </main>
</template>
<script setup>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import {useShop} from './store/shop'
import {useError} from './store/error'
import ApiError from "./pages/ApiError.vue";

const shop = useShop()
if (!shop.shop) shop.fetchShop()

const error = useError()
</script>