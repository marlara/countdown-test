import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import CountdownCreate from '@/views/CountdownCreate.vue'
import Login from "@/views/Login.vue";
import store from "@/state.js";
import NotFound from "@/views/NotFound.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/countdown-create",
    name: "CountdownCreate",
    component: CountdownCreate,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },


  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition){ //go to top of the page when changing it 
    return savedPosition || new Promise((resolve) => {
      setTimeout(()=> resolve({top: 0, behavior:'smooth'}), 300) //smooth and timeout for fading if set
    })
  }
});

router.beforeEach((to, from, next) => { //check before each route if the state logged is true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isUserLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()! 
  }
})


export default router;
