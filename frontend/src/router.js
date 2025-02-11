import { createWebHistory, createRouter } from 'vue-router'

import Roles from './views/Roles.vue'
import Home from './views/Home.vue'

const routes = [
  { path: '/roles', component: Roles },
  { path: '/', component: Home},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router