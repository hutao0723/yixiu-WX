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
      },
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
        path: '/index/course',
        component: function (resolve) {
          require.ensure([], function () {
            resolve(require('../views/read/Course'));
          }, 'reading_course');
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
      path: '/coupon',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/user/Coupon'));
        }, 'reading_coupon');
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
    },
    // 用户中心
    {
      path: '/personal',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/Personal'));
        }, 'reading_personal');
      },
    },

    // 我的收益
    {
      path: '/personal/share',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Share'));
        }, 'reading_share');
      },
      meta: {
        title: '我的收益'
      }
    },
    // 提现记录
    {
      path: '/personal/share/cash-history',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/CashHistory'));
        }, 'reading_cashHistory');
      },
      meta: {
        title: '提现记录'
      }
    },

    // 收益记录
    {
      path: '/personal/share/earnings-history',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/EarningHistory'));
        }, 'reading_earningHistory');
      },
      meta: {
        title: '收益记录'
      }
    },

    // 我的邀请
    {
      path: '/personal/share/correspondent',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Correspondent'));
        }, 'reading_correspondent');
      },
      meta: {
        title: '我的邀请'
      }
    },
    // 提现中
    {
      path: '/personal/share/deposit-success',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/DepositSuccess'));
        }, 'reading_depositSuccess');
      },
      meta: {
        title: '提现中'
      }
    },
    // 提现
    {
      path: '/personal/share/cash',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Cash'));
        }, 'reading_cash');
      },
      meta: {
        title: '提现'
      }
    },
    // 邀请海报
    {
      path: '/personal/share/poster',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Poster'));
        }, 'reading_poster');
      },
      meta: {
        title: '邀请海报'
      }
    },

    // 推广规则
    {
      path: '/personal/share/generalize-rule',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/GeneralizeRule'));
        }, 'reading_generalizeRule');
      },
      meta: {
        title: '推广规则'
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
      path: '/poster',
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
