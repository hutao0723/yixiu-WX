var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var os = require('os')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var publicPath = '';

if (process.env.NODE_ENV === 'production') {
  publicPath = config.build.assetsPublicPath;
} else if (process.env.NODE_ENV === 'debug') {
  publicPath = config.build.assetsPublicPathDebug;
} else {
  publicPath = config.dev.assetsPublicPath;
}

// ----- 动态查找所有入口entry文件 ----- //
var glob = require('glob');
var files = glob.sync('./src/pages/*/main.js');
var entryList = {};

// 匹配入口文件
files.forEach(function(f) {
  var mainName = /.*\/(pages\/.*?\/main)\.js/.exec(f)[1]; // 得到pages/mobile/main.js这样的文件名
  var mainPath = mainName.split('main')[0]; // 得到pages/mobile/这样的文件名
  var fileName = mainPath.split('/')[1];

  // 记录入口文件
  entryList[fileName] = f;
});

// './src/pages/knowledge/main.js'
module.exports = {
  entry: entryList,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   // loader: 'happypack/loader?id=eslint',
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new HappyPack({
    //   id: 'eslint',
    //   loaders: [ 'eslint-loader' ],
    //   threadPool: happyThreadPool,
    //   cache: true,
    //   verbose: true
    // }),
    // new HappyPack({
    //   id: 'happyvue',
    //   loaders: [ 'vue-loader' ],
    //   threadPool: happyThreadPool,
    //   cache: true,
    //   verbose: true
    // }),
    new HappyPack({
      id: 'babel',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
}
