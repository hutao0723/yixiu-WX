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
          resolve(require('../views/user/User'));
        }, 'reading_user');
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

    // 分享中心
    {
      path: '/personal/share',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Share'));
        }, 'reading_share');
      }
    },
    // 提现记录
    {
      path: '/personal/share/cash-history',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/CashHistory'));
        }, 'reading_cashHistory');
      }
    },

    // 收益记录
    {
      path: '/personal/share/earnings-history',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/EarningHistory'));
        }, 'reading_earningHistory');
      }
    },

    // 我的客户
    {
      path: '/personal/share/correspondent',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Correspondent'));
        }, 'reading_correspondent');
      }
    },
    // 提现中
    {
      path: '/personal/share/deposit-success',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/DepositSuccess'));
        }, 'reading_depositSuccess');
      }
    },
    // 提现
    {
      path: '/personal/share/cash',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Cash'));
        }, 'reading_cash');
      }
    },
    // 海报
    {
      path: '/personal/share/poster',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/Poster'));
        }, 'reading_poster');
      }
    },

    // 推广规则
    {
      path: '/personal/share/generalize-rule',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('../views/personal/share/GeneralizeRule'));
        }, 'reading_generalizeRule');
      }
    },
  ]
});
