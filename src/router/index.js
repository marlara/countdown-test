import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import CountdownManager from '@/views/CountdownMain.vue'
import Login from "@/components/TheLogin.vue";
import store from "@/state.js"

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
    path: "/countdown-manager",
    name: "CountdownManager",
    component: CountdownManager,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  
  /*
    component: ()=> import("/views/QuizShow.vue"),
    props: true,
    beforeEnter(to){ // all this is to have the NotFound if the data doesn't exists in the json. It's called Navigation Guard
      const exists = sourceData.quizzes.find(
        quiz => quiz.id === parseInt(to.params.id)
      )
      if(!exists) return { 
        name: 'NotFound',
        params: { pathMatch: to.path.split('/').slice(1)}, //this is to retreive also the wrong url in the address
        query: to.query,
        hash: to.hash,
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ()=> import("/views/NotFound.vue"),
  }*/
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
