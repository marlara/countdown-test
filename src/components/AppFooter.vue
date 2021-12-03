<template>
  <v-footer app dark padless>
    <p>CC-BY — Lara Marziali — {{ year }} </p>
  </v-footer>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>
