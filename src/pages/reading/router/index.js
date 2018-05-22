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
        }, 'reading_read');
      }
    },
    {
      name: 'read',
      path: '/read',
      redirect: '/read/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/read/Index'));
        }, 'reading_read');
      },
      children: [{
        path: '/read/home',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/read/Home'));
          }, 'reading_home');
        }
      }
      ]
    },
    {
      path: '/card',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/card/Card'));
        }, 'reading_card');
      }
    },
    {
      path: '/comment',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/card/Comment'));
        }, 'reading_comment');
      }
    },
    {
      path: '/opinion',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/opinion/Opinion'));
        }, 'reading_opinion');
      }
    },
    {
      path: '/user',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/user'));
        }, 'reading_user');
      }
    },
    {
      path: '/audio/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/audio/Index'));
        }, 'reading_audioindex');
      }
    },
    {
      path: '/audio/list',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/audio/List'));
        }, 'reading_audiolist');
      }
    }
  ]
});
