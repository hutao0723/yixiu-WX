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
        path: '/index/card/:isTodayClock',
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
      path: '/comment/:readId/:courseId',
      name:'comment',
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
      path: '/look/:readId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/Look'));
        }, 'reading_look');
      }
    },
    {
      path: '/shelf',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/Shelf'));
        }, 'reading_shelf');
      }
    },
    {
      path: '/audio/index/:type',
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
    },
    {
      path: '/audio/article/:courseId',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/audio/Article'));
        }, 'reading_audioarticle');
      }
    },
    {
      path: '/poster/:commentId/:lastClock/:isClock',
      name:'poster',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/poster/poster'));
        }, 'reading_poster');
      }
    },
    {
      path: '/graduation',
      name:'graduation',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/poster/graduation'));
        }, 'reading_graduation');
      }
    }
  ]
});
