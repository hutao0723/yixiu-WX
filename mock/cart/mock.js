/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs');
var setOnline = [
  {
    name: 'tradeType1',
    comment: '登录接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=1'
  },
  {
    name: 'tradeType2',
    comment: '产品接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=2'
  },
  {
    name: 'tradeType3',
    comment: '产品分类接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=3'
  },
  {
    name: 'tradeType4',
    comment: '注册接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=4'
  },
  {
    name: 'tradeType5',
    comment: '下单接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=5'
  },
  {
    name: 'tradeType6',
    comment: '订单查询接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=6'
  },
  {
    name: 'tradeType7',
    comment: '门店下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=7'
  },
  {
    name: 'tradeType8',
    comment: '订单删除接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=8'
  },
  {
    name: 'tradeType9',
    comment: '订单修改接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=9'
  },
  {
    name: 'tradeType10',
    comment: '根据门店ID查询订单接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=10'
  },
  {
    name: 'tradeType11',
    comment: '查询商品页码总数和条目数',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=11'
  },
  {
    name: 'tradeType12',
    comment: '按页码获取产品接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=12'
  },
  {
    name: 'tradeType13',
    comment: '根据门店ID查询营业员信息',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=13'
  },
  {
    name: 'tradeType14',
    comment: '订单修改接口(新)',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=14'
  },
  {
    name: 'tradeType15',
    comment: '价格区间下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=15'
  },
  {
    name: 'tradeType16',
    comment: '根据门店编号，查询库存信息接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=16'
  },
  {
    name: 'tradeType17',
    comment: '修改订单状态为发货状态接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=17'
  },
  {
    name: 'tradeType18',
    comment: '下载最新的产品信息接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=18'
  },
  {
    name: 'tradeType19',
    comment: '结算方式下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=19'
  },
  {
    name: 'tradeType20',
    comment: '商品品牌下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=20'
  },
  {
    name: 'tradeType21',
    comment: '商品品级下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=21'
  },
  {
    name: 'tradeType22',
    comment: '商品配型下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=22'
  },
  {
    name: 'tradeType23',
    comment: '商品母件和子件下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=23'
  },
  {
    name: 'tradeType24',
    comment: '商品库存总量下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=24'
  },
  {
    name: 'tradeType25',
    comment: '最新商品母件和子件下载接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=25'
  },
  {
    name: 'tradeType26',
    comment: '下载所有营业员信息',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=26'
  },
  {
    name: 'tradeType27',
    comment: '门店登陆验证',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=27'
  },
  {
    name: 'tradeType28',
    comment: '修改订单状态为提交状态接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=28'
  },
  {
    name: 'tradeType29',
    comment: '下载最新停用的产品信息接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=29'
  },
  {
    name: 'tradeType30',
    comment: '查询商品的详情页',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=30'
  },
  {
    name: 'tradeType35',
    comment: '商品的分页查询接口',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=35'
  },
  {
    name: 'tradeType36',
    comment: '根据商品名称过滤',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=36'
  },
  {
    name: 'tradeType37',
    comment: '订单查询',
    type: 'get',
    url: '/datainter/dataFillServlet?tradeType=37'
  }
];

// 输出配置项
exports.setOnline = setOnline;

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  (function() {
    var name = setOnline[i].name;
    exports[name] = function(req, res) {
      fs.readFile('./mock/cart/' + name + '.json', function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
      });
    };
  })(i);
}

