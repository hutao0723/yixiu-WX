import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/read',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/read/Index'));
        }, 'read');
      }
    },
    {
      name: 'read',
      path: '/read',
      redirect: '/read/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/read/Index'));
        }, 'read');
      },
      children: [{
        path: '/read/home',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/read/Home'));
          }, 'home');
        }
      }
      ]
    },
    {
      path: '/card',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/card/Card'));
        }, 'card');
      }
    },
    {
      path: '/comment',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/card/Comment'));
        }, 'comment');
      }
    },
    {
      path: '/opinion',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/opinion/Opinion'));
        }, 'opinion');
      }
    },
    {
      path: '/user',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/user'));
        }, 'user');
      }
    },
    {
      path: '/audio/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/audio/Index'));
        }, 'audio_index');
      }
    },
    {
      path: '/audio/list',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/audio/List'));
        }, 'audio_list');
      }
    }
  ]
});
