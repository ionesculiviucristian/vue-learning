import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Page1 from './views/Page1.vue'
import Page2 from './views/Page2.vue'
import User from './views/User.vue'
import UserShow from './views/UserShow.vue'
import UserDetails from './views/UserDetails.vue'
import UserMenu from './views/UserMenu.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/page-1',
      name: 'page-1',
      component: Page1
    }, {
      path: '/page-2',
      name: 'page-2',
      component: Page2
    }, {
      path: '/users/:id',
      component: User,
      props: true,
      children: [
        {
          path: '',
          components: { menu: UserMenu, details: UserShow },
          props: { menu: true, details: true },
          name: 'user.show'
        }, {
          path: 'details',
          components: { menu: UserMenu, details: UserDetails },
          props: { menu: true, details: true },
          name: 'user.details',
          beforeEnter: (to, from, next) => {
            if (to.matched.some(record => record.meta.details)) {
              console.log('we have some details');
            }

            next();
          },
          meta: {
            details: 'Some details'
          }
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
