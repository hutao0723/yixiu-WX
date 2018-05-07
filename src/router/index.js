import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '*',
      redirect: '/home/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'home',
      path: '/home',
      redirect: '/home/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      },
      children: [
        {
          path: '/home/index',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('../pages/components/home/Index'));
            }, 'home');
          }
        }
      ]
    },
    // {
    //   path: '/goodsDetail/:id',
    //   component: function (resolve) {
    //     require.ensure([], function () {
    //       resolve(require('../pages/components/homepage/goodsDetail'));
    //     }, 'goodsDetail');
    //   }
    // },
    {
      name: 'cart',
      path: '/cart',
      redirect: '/cart/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart'));
        }, 'cart');
      },
      children: [{
        path: '/cart/index',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../pages/components/cart/Index'));
          }, 'cart');
        }
      }]
    },
    {
      path: '/user',
      redirect: '/user/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/User'));
        }, 'user');
      },
      children: [{
        path: 'index',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../pages/components/user/Index'));
          }, 'user');
        }
      }]
    }
  ]
});
