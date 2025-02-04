<template>
  <div class="text-white" v-if="shop.subpage">
    {{$decode(shop.subpage.content)}}
  </div>
</template>
<script setup lang="ts">
import {useShop} from '../store/shop'
import {useRoute} from "vue-router";
import {$decode} from '../utils/$decode'

const route = useRoute()
const shop = useShop()
shop.fetchSubpage(route.params['pageSlug'])
</script>