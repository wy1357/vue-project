const express = require('express')
    // 创建路由对象
const router = express.Router()

const router_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/register', router_handler.register)

// 登录
router.post('/login', router_handler.login)

// 将路由对象共享出去
module.exports = router