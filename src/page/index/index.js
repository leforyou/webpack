//导入css--webpack打包css是由下而上
import "../../assets/css/style.scss";
import "../../assets/css/common.scss";
import "../../assets/css/api.css";

//导入js
import "../../assets/js/jquery-2.1.4.min.js";//其它方式：安装npm i jquery --save-dev 【使用1：import $ from "jquery";】【使用2：var $ = require("jquery");】
import "../../assets/js/common.js";

const aaa = 'webpack打包';


document.body.innerHTML += aaa;