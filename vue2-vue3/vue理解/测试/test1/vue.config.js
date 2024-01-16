const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // version
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '';
        // 添加 build 时间 -- version
        args[0].version = getVersion()
        return args
      })
  }
})


function getVersion () {
  let date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()) // toJSON 的时区补偿
  return date.toJSON().substr(0, 19).replace(/[-T:]/g, '')
}
