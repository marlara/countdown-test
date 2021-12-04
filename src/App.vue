<template>
  <v-app>
    <app-header />
    <app-main /> 
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import AppFooter from '@/components/AppFooter.vue'
import('@/assets/main.css');

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
}
</script>
