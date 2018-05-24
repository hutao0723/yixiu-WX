var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// ----- HtmlWebpackPlugin ----- //
var glob = require('glob');
var files = glob.sync('./src/pages/*/main.js');
var pluginList = [];

// 匹配入口文件
files.forEach(function(f) {
  var mainName = /.*\/(pages\/.*?\/main)\.js/.exec(f)[1]; // 得到pages/mobile/main.js这样的文件名
  var mainPath = mainName.split('main')[0]; // 得到pages/mobile/这样的文件名
  var fileName = mainPath.split('/')[1];

  // HtmlWebpackPlugin 队列 - 负责插入js和css
  var plug = new HtmlWebpackPlugin({
    filename: fileName + '.html',
    chunks: ['vendors', fileName],
    template: path.resolve(__dirname, '../src/' + mainPath + 'index.html'),
    inject: true
  });
  // 插件
  pluginList.push(plug);
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new FriendlyErrorsPlugin()
  ].concat(pluginList)
})
