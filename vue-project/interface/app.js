// 导入 express 模块
const express = require('express')
const unless = require('express-unless');
var multipart = require('connect-multiparty');
// 导入 cors 中间件
const cors = require('cors')
const joi = require('joi')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 导入配置文件
const config = require('./config')
const userRouter = require('./router/user')
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
//导入轮播图
const articleRouter = require('./router/article')
//导入分类
const classify = require('./router/classify')
//导入详情
const detail = require('./router/detail')
//导入商品
const commodity = require('./router/commodity')
// 创建 express 的服务器实例
const app = express()
app.use(multipart({ uploadDir: 'public/images' }))
app.use(express.static('public'));

//使用unless中间件防止整个文件夹也需要token
var static = express.static(__dirname);
//这里为开放整个文件夹的权限，也可express.static(__dirname,****)只开放部分文件访问权限
static.unless = unless;
app.use(static.unless({ method: 'OPTIONS' }));
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: ['/classify/blob:null'] }))
// 响应数据的中间件 全局挂载报错
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api|article|detail|classify\//] }))
// 将 cors 注册为全局中间件
app.use(cors())
var bodyParser = require('body-parser');
const { query } = require('express');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
//登陆注册
app.use('/api', userRouter)
app.get('/', (req, res) => {
  res.send('ok')
})
//用户信息
app.use('/my', userinfoRouter)
//轮播
app.use('/article', articleRouter)
//分类
app.use('/classify', classify)
//详情
app.use('/detail', detail)
//地址
app.use('/commodity', commodity)
//托管静态资源
app.use('/uploads', express.static('./uploads'))
app.use('/classify1', express.static('./classify'))
app.use('/commodity2', express.static('./commodity'))
app.use('/detail3', express.static('./detail'))
app.listen(3000, function () {
  console.log('服务器开启成功')
})