var aa = require('./src/api/jgcmessage')

module.exports = {
  publicPath: '',   // 根路径
  outputDir:'dist',  // 打包时生成的一个文件名
  devServer:{
    open: true,   // 启动项目后自动开启浏览器
    host: '127.0.0.1',
    port: 5001,
    proxy: null,   // 设置代理
    before(app){
      aa(app)
      // app.get('/api/message1',(req,res) =>{
      //     res.json(require('./src/api/static/message1.json'))
      // })
    }
  }
}