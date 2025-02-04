<template>
  <section class="text-white mb-32">
    <div class="flex items-center gap-4">
      <h1 class="text-xl">Wybierz Produkt</h1>
      <div class="bg-main-gradient h-[0.1rem] w-12"></div>
    </div>
    <template v-if="shop.server">
      <div v-for="category in shop.server.categories" class="flex justify-around flex-wrap gap-4">
        <div v-for="product in category.products" class="bg-div bg-opacity-50 w-[400px] mt-4 rounded-lg p-8 flex gap-4">
          <div class="flex-1 flex justify-center items-center">
            <div class="h-[200px] h-max-[200px] w-[200px] max-w-[200px] bg-[#161816] rounded-xl">
              <img :src="product.imageUrl" alt="" class="h-[200px] h-max-[200px] w-[200px] max-w-[200px]">
            </div>
          </div>
          <div class="flex-1 flex flex-col">
            <h1 class="text-lg font-medium">{{ product.name }}</h1>
            <div class="flex items-center text-sm gap-4 opacity-50">{{$decode(product.short_description)}}</div>
            <div class="flex justify-end mt-auto">
              <button @click="shop.redirectToPayment(product.id)" class="bg-main-gradient h-8 w-24 rounded-lg text-sm font-medium text-black">Zakup</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {$decode} from "../utils/$decode";
import {useShop} from '../store/shop';

const route = useRoute()
const {serverSlug} = route.params
const shop = useShop()
shop.fetchProducts(serverSlug)
</script>