/**webpack 配置自动添加 CSS3 前缀
 *1. 安装 npm install postcss-loader autoprefixer --save-dev
 *2. 在package.json中配置(Vue2.*配置)，如果兼容要求苛刻，可将 1% 改 99% ，last 2 versions 改 last 30 versions。
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
 *
 *3.在webpack.config.js中配置【postcss-loader】
 *4.在postcss.config.js中导出如下内容
 * 
 * browserslist配置请参考【https://www.npmjs.com/package/browserslist】  &&  【https://github.com/browserslist/browserslist】
 * 
 */

module.exports = {
    plugins: [
        require("autoprefixer")
    ]
}