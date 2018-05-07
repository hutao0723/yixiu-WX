/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs');
var setOnline = [
  {
    name: 'goodsAll',
    comment: '产品接口',
    type: 'get',
    url: '/datainter/dataFillServlet/goodsAll'
  },
  {
    name: 'categroy',
    comment: '分类接口',
    type: 'get',
    url: '/datainter/dataFillServlet/categroy'
  }];

// 输出配置项
exports.setOnline = setOnline;

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  (function () {
    var name = setOnline[i].name;

    exports[name] = function (req, res) {
      fs.readFile('./mock/homepage/' + name + '.json', function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
      });
    };
  })(i);
}

