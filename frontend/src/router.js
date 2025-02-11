import { createWebHistory, createRouter } from 'vue-router'

import Roles from './views/Roles.vue'
import Home from './views/Home.vue'
import Users from './views/Users.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/roles', component: Roles },
  { path: '/users', component: Users},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router