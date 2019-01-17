const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
  }
  

console.log("111111111888888888888888888",path.resolve(__dirname, "node_modules"))
console.log("999999999999999999999999999",resolve("src/page/index.js"))


