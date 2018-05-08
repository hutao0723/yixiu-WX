import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
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
    {
      name: 'cart',
      path: '/cart',
      redirect: '/cart/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart'));
        }, 'cart');
      },
      children: [
      {
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
      children: [
      {
        path: 'index',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../pages/components/user/Index'));
          }, 'user');
        }
      }]
    },
    {
      path: '/activity/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Activity'));
        }, 'activity');
      }
    },
    {
      path: '/column/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Column'));
        }, 'column');
      }
    },
    {
      path: '/course/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Course'));
        }, 'course');
      }
    },
    {
      name: 'audio',
      path: '/audio',
      redirect: '/audio/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Audio'));
        }, 'audio');
      },
      children: [
        {
          path: '/audio/index',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('../pages/components/audio/Index'));
            }, 'audio');
          }
        },
        {
          path: '/audio/list',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('../pages/components/audio/List'));
            }, 'audio_list');
          }
        }
      ]
    }
  ]
});
