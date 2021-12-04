<template>
  <v-card class="mx-auto my-12" elevation="2" max-width="1000">
      <v-card-title>Login</v-card-title>
        <v-text-field
          label="Username"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          @click="login">
          Login
        </v-btn>
  </v-card>
</template>


<script>

export default {
    name: 'MyLogin',

    data(){
        return {
            username: '',
            password: '',
            error: null
        }
    },

    methods: {
        login() {
            if (this.username != "admin"){
                return ({
                    error: 'Invalid username'
                })
            }
            if (this.password != "admin"){
                return ({
                    error: 'Invalid password'
                })
            }
            this.$store.commit('setLogin', true) //commit to the vuex store mutation
            this.$router.push({
            name: 'Home'
            })
        }
    }
}
</script>