<template>
    <v-app-bar>
      <v-app-bar-title>Countdown App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/')">Home page</v-btn>
      <v-btn @click="$router.push('/countdown-manager')">Countdown Manager</v-btn>
      <v-btn @click="logout">Log Out</v-btn>
    </v-app-bar>
</template>

<script>

export default {
  methods: {
    logout () {
      this.$store.commit('setLogin', false)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

