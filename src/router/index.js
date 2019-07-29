import Vue from 'vue';
import VueRouter from 'vue-router';

import AllList from './views/list/AllList.vue';
import MyList from './views/list/MyList.vue';
import NewList from './views/list/NewList.vue';
import NewObject from './views/list/NewObject.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/list/all',
      name: 'AllList',
      component: AllList,
    },
    {
      path: '/list/my-list/:id',
      name: 'My List',
      component: MyList,
    },
    {
      path: '/list/new-list',
      name: 'NewList',
      component: NewList,
    },
    {
      path: '/list/new-object',
      name: 'New',
      component: NewObject,
    },
    {
      path: '/list/edit/:id',
      name: 'Edit',
      component: NewList,
    },
    {
      path: '*',
      component: AllList,
    },
  ],
  mode: 'hash',
  linkActiveClass: 'active',
});
