const path = require('path')
// 启用热更新的 第2步
const webpack = require('webpack')
// 导入内存中生成 HTML 页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: { // 输出文件相关的配置
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true, // 自动打开浏览器
    port: 16201, // 设置启动时候的运行端口
    // contentBase: 'src', // 指定托管的根目录
    hot: true, // 启用热更新的 第1步
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML 页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html',  // 指定生成的页面的名称
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=3881&name=[hash:8]-[name].[ext]'] },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' },
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候 包的路径
      // "vue$": "vue/dist/vue.js"
    }
  }
}