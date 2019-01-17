'use strict'
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//空打包目录
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}




module.exports = {
    stats: { children: false },
    mode: 'development',//development &&  production 生产环境是默认值
    //entry: string | object | array
    /*entry: [
        resolve("src/page/index/index.js"),
        //"./src/page/login/index.js"
    ],*/
    entry:{
        index: path.resolve(__dirname, 'src/page/index/index.js'), //resolve("src/page/index/index.js")
        login: path.resolve(__dirname, 'src/page/login/index.js')
    },
    /*output:{
        path: resolve("dist"),// path.resolve(__dirname, '../dist'), //另一种方法：resolve(dist)
        filename: "[name].js", 
        publicPath: "/public/", 
    },*/
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'js/bundle-[name].js',
    },
    /*devServer: {
       //"progress 显示打包进度 ; colors配置打包输出颜色显示  ;; -d 是debug模式，输入一个source-map，并且可以看到每一个打包的文件 ; -p 是对代码进行压缩 ; port 3008 服务器端口 ; open 启动后默认打开浏览器"
        contentBase: false,
        publicPath:'/',//静态文件
        host: 'localhost',//localhost   0.0.0.0
        inline:true,// inline 是刷新后的代码自动注入到打包后的文件中(当源文件改变时会自动刷新页面) 
        port: 8000,
        overlay: true, // 浏览器页面上显示错误
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true // 开启热更新(热加载)
    },*/
    devServer:{
        contentBase:path.resolve(__dirname,"src/page/index/"), //最好设置成绝对路径（启动服务器访问的页面）
        historyApiFallback: false,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: 'localhost',
        port: 8000,
        overlay: true,
        open:true
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
                test: /\.js$/,
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
            }/**/
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].min.css',
        }),
        //清空打包目录dist
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        new HtmlWebpackPlugin({
            template:`src/page/index/index.html`,
            filename:`html/index.html`,
            inject:true,
            hash:false,
            chunks:["index"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            template:`src/page/login/index.html`,
            filename:`html/login.html`,
            inject:true,
            hash:false,
            chunks:["index"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
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