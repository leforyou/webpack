'use strict'
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');//生成HTML文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//清空打包目录
const ExtractTextPlugin = require('extract-text-webpack-plugin');//打包css
const CopyWebpackPlugin = require('copy-webpack-plugin');//复制静态资源(图片等)

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
        filename:'js/bundle-[name].js', //例如：index.js将打包成bundle-index.js。还有其它写法"[name].js"。
    },
    devServer:{
        //webpack-dev-server：会实时打包，但是并不会在本地硬盘生成dist目录文件，这是因为webpack-dev-server将打包好的文件放在了内存中（依旧是可以访问的），运行npm run build才会本地生成dist文件目录
        //"progress 显示打包进度 ; colors配置打包输出颜色显示  ;; -d 是debug模式，输入一个source-map，并且可以看到每一个打包的文件 ; -p 是对代码进行压缩 ; port 3008 服务器端口 ; open 启动后默认打开浏览器"
        contentBase:path.resolve(__dirname,"dist/"), //最好设置成绝对路径（启动服务器访问的页面）
        publicPath:'/',//静态文件
        historyApiFallback: false,
        hot: true,// 开启热更新(热加载)
        inline: true,// inline 是刷新后的代码自动注入到打包后的文件中(当源文件改变时会自动刷新页面)
        stats: 'errors-only',//stats: "errors-only"表示只打印错误：
        host: 'localhost',//localhost 或 0.0.0.0 或 127.0.0.1 或 局域网IP
        port: 8000,//服务器端口
        overlay: true,// 浏览器页面上显示错误
        open:true //启动后默认打开浏览器
    },
    module:{
        rules: [
            // 处理 CSS 文件的 loader
            { 
                test: /\.css$/, 
                /*use: ['style-loader', 'css-loader']   //不分离css,直接打包在html内*/
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    // css中的基础路径
                    publicPath: "../"
                })
            }, 
            // 处理 scss 文件的 loader
            {
                test: /\.(scss|sass)$/,
                /*//不分离css,直接打包在html内
                use: [
                    "style-loader", //将 JS 字符串生成为 style 节点 creates style nodes from JS strings
                    "css-loader", //将 CSS 转化成 CommonJS 模块 translates CSS into CommonJS
                    "sass-loader" //// 将 Sass 编译成 CSS compiles Sass to CSS, using Node Sass by default
                ]*/

                // 此处为分离css的写法
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    // css中的基础路径
                    publicPath: "../"
                })
            },
            // 处理 less 文件的 loader
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000
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
            }
            /**/
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/style.css"),/**/
        /*new ExtractTextPlugin("css/[name].css"),*/
        /*new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].min.css',
            allChunks: true // 一开始所有css都打包
        }),*/
        //清空打包目录dist
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        //复制静态资源
        new CopyWebpackPlugin([
            {
                from: 'public',
                to: undefined
            },
            {
                from: 'src/assets',
                to: undefined
            }
        ]),
        new HtmlWebpackPlugin({
            template:`src/page/index/index.html`,
            filename:`html/index.html`,// 生成文件名字
            // inject: false,    // 不把生成的css，js插入到html中
            hash:false,
            chunks:["index"],
            minify: {// 压缩html
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            template:`src/page/login/index.html`,
            filename:`html/login.html`,// 生成文件名字
            // inject: false,    // 不把生成的css，js插入到html中
            hash:false,
            chunks:["login"],
            minify: {// 压缩html
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