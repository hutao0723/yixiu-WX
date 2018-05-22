import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Index'));
        }, 'index');
      }
    },
    {
      name: 'index',
      path: '/index',
      redirect: '/index/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Index'));
        }, 'index');
      },
      children: [{
        path: '/index/home',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/Home'));
          }, 'home');
        }
      },
      {
        path: '/index/cart',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/Cart'));
          }, 'cart');
        }
      },
      {
        path: '/index/user',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/User'));
          }, 'user');
        }
      }
      ]
    },
    {
      path: '/help',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Help'));
        }, 'help');
      }
    },
    {
      path: '/activity/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Activity'));
        }, 'activity');
      }
    },
    {
      path: '/column/:columnId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Column'));
        }, 'column');
      }
    },
    {
      path: '/course/:courseId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Course'));
        }, 'course');
      }
    },
    {
      path: '/audio/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/AudioIndex'));
        }, 'audio_index');
      }
    },
    {
      path: '/audio/list',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/AudioList'));
        }, 'audio_list');
      }
    }
  ]
});
