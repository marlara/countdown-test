<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
        <v-card-title>Login</v-card-title>
        <v-text-field 
        class="px-12 pt-4"
        label="Username"
        v-model="username"
        ></v-text-field>
        <v-text-field
        class="px-12"
        label="Password"
        type="password"
        v-model="password"
        ></v-text-field>
            <div class="danger-alert" v-html="error" />
            <v-card-actions class="justify-center py-4">
            <v-btn elevation="2"
            @click="login">
            Login
            </v-btn>
            </v-card-actions>
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