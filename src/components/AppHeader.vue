<template>
    <v-app-bar>
      <v-app-bar-title>Countdown App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <router-link id="logo" to="/">Home page</router-link>
      </v-btn>
      <v-btn>
        <router-link to ="/countdown-manager">Countdown Manager</router-link> 
      </v-btn>
      <v-btn 
        @click="logout">
        Log Out
      </v-btn>
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

