# webpack
webpack配置多页面项目

PS:之前在项目中一直用gulp，以前足够应付开发。现在想换webpack配置开发多页面应用，过程踩了不坑，也学习了不少东西。这个webpack配置还有值得优化的地方，如：Vue2.*那样分为生产环境和开发环境两个版本的webpack配置，公共部分用webpack-merge进行合并。在开发环境不需要压缩js、css，这样获取更高的性能。Vue2.**【webpack.base.conf.js公共部分配置】【webpack.dev.conf.js开发环境】【webpack.prod.conf.js生产环境】。
开发模式和生产模式：一些是”开发模式“下才有的，一些是”生产模式“下才有的，还有一些是两种模式下都有的。

打包：npm run build

开发： npm start  或  npm run dev

webpack -v 版本4.28.4



webpack-cli -v 版本3.2.1