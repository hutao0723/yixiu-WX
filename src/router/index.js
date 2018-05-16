import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'home',
      path: '/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'cart',
      path: '/cart',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Cart'));
        }, 'cart');
      }
    },
    {
      name: 'user',
      path: '/user',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/User'));
        }, 'user');
      }
    },
    {
      path: '/help',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Help'));
        }, 'help');
      }
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
      path: '/column/:columnId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Column'));
        }, 'column');
      }
    },
    {
      path: '/course/:courseId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/Course'));
        }, 'course');
      }
    },
    {
      path: '/audio/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../pages/components/audio/Index'));
        }, 'audio_index');
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
});
