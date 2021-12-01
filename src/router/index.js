import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/HelloWorld.vue";
import CountdownManager from '@/components/CountdownMain.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/countdown-manager",
    name: "CountdownManager",
    component: CountdownManager,
  }

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

export default router;
