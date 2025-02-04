<script setup lang="ts">
import {$decode} from '../../utils/$decode'
import {useShop} from '../../store/shop'

const {shop} = useShop()
</script>

<template>
  <div class="flex gap-8 text-white transition-all md:mr-8">
    <template v-for="page in shop.subpages.filter(it => it.showInNavigation)">
      <a
          v-if="page.type == 'redirect'"
          :href="$decode(page.content)"
          class="opacity-50 hover:opacity-70">{{page.name}}
      </a>
      <router-link
          v-else
          :to="`/page/${page.slug}`"
          class="opacity-50 hover:opacity-70">{{page.name}}
      </router-link>
    </template>
  </div>
</template>
