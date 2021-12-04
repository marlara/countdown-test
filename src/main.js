import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css';
import store from "./state.js"
//import { sync } from 'vuex-router-sync'

loadFonts()

//sync(store, router) //synchronize the route and the store (used for the countdown id api)

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')