const express = require('express')
const router = express.Router()
    // 导入解析 formdata 格式表单数据的包
const multer = require('multer')
    // 导入处理路径的核心模块
const path = require('path')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const article_handler = require('../router_handler/article')
router.get('/img', article_handler.getArticle)
router.get('/img/id', article_handler.getArticle1)
router.get('/img/banner', article_handler.getArticle3)
router.post('/change', multipartMiddleware, article_handler.changeclassify)
router.post('/add', multipartMiddleware, article_handler.addArticle)
router.get('/delimg', article_handler.deleteArticle)
router.get('/last', article_handler.lastArticle)
module.exports = router