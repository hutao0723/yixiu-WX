### 准备工作

* 使用到的相关库或工具：vue2 + vuex2 + vue-router2 + vue-cli + vue-js-modal
* 安装node （推荐最新版8.0+）(npm 4.0+）
* npm install -g vue-cli

### 启动项目
npm run dev

### 代码打包
npm run build

```
### 目录结构/knowledge-h5/config/index.js
-build
-config
-node_modules // node包
-src      // 项目代码所在文件夹
-static     
-.babelrc
-.editorconfig
-.eslintignore
-.eslintrc.js
-.gitignore
-index.html
-package.json
-README.md
```

### 本地预览步骤

```
# 进入 knowledge-h5 文件夹
cd knowledge-h5

# install dependencies
npm install / cnpm i

# 运行 npm run dev 会在浏览器打开 localhost:8666
npm run dev
```
### vuex2

state为状态数据，触发action，mutations会去改变state的值，getters对外提拱state的值。


