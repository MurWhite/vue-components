/**
 * Created by BaiBai on 2017/3/1.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './index.vue'
import Btns from './Buttons.vue'
import Modals from './Modals.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/', component: Index,
    children: [
      {path: 'buttons', component: Btns},
      {path: 'modals', component: Modals}
    ]
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app');
