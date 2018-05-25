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
        }, 'reading_read');
      }
    },
    {
      name: 'index',
      path: '/index',
      redirect: '/index/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/Index'));
        }, 'reading_read');
      },
      children: [{
        path: '/index/home',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/read/Home'));
          }, 'reading_home');
        }
      },
      {
        path: '/index/card',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/card/Card'));
          }, 'reading_card');
        }
      },
      {
        path: '/index/opinion',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/opinion/Opinion'));
          }, 'reading_opinion');
        }
      },
      {
        path: '/index/user',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/user/User'));
          }, 'reading_user');
        }
      }]
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
      path: '/journey',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/Journey'));
        }, 'reading_journey');
      }
    },
    {
      path: '/lecturer',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/Lecturer'));
        }, 'reading_lecturer');
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
