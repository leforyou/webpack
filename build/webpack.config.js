'use strict'
const path = require('path');

//const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}




module.exports = {
    mode: 'production',
    //entry: string | object | array
    entry: [
        resolve("src/page/index"),
        //"./src/page/login"
    ],
    output:{
        path: resolve("dist"),// path.resolve(__dirname, '../dist'), //另一种方法：resolve(dist)
        filename: "[name].js", 
        publicPath: "/public/", 
    },
    devServer: {
       //"progress 显示打包进度 ; colors配置打包输出颜色显示  ;; -d 是debug模式，输入一个source-map，并且可以看到每一个打包的文件 ; -p 是对代码进行压缩 ; port 3008 服务器端口 ; open 启动后默认打开浏览器"
        contentBase: false,
        publicPath:'/',//静态文件
        host: 'localhost',//localhost   0.0.0.0
        inline:true,// inline 是刷新后的代码自动注入到打包后的文件中(当源文件改变时会自动刷新页面) 
        port: 8000,
        overlay: true, // 浏览器页面上显示错误
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true // 开启热更新(热加载)
    },
    module:{
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,//resolve("node_modules")
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    plugins: [
       //new HtmlWebpackPlugin()
        /* new HtmlWebpackPlugin({
            filename: __dirname + '/dist/index.html',
            template: resolve("src/page/index.html"),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
          })*/
    ]
}