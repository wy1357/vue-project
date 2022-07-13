// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
const multer = require('multer')
    // 导入处理路径的核心模块
const path = require('path')
const expressJoi = require('@escook/express-joi')
    // 导入需要的验证规则对象
    // 导入需要的验证规则对象
const { update_password_schema } = require('../schema/user')
    // const { update_avatar_schema } = require('../schema/user')
const upload2 = multer({ dest: path.join(__dirname, '../userinfo') })


const userinfo_handler = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
    // 获取所有用户的基本信息
router.get('/getUserInfo', userinfo_handler.getUserInfo1)
    // 根据id获取用户的基本信息
router.get('/getUserInfo/id', userinfo_handler.getUserInfo2)
    //修改用户信息
router.post('/userinfo', userinfo_handler.updateUserInfo)
    // 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
    // 向外共享路由对象
module.exports = router