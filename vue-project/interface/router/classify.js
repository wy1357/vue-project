// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
const multer = require('multer')
    // 导入处理路径的核心模块
const path = require('path')
    // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload1 = multer({ dest: path.join(__dirname, '../classify') })

const classify = require('../router_handler/classify')
router.get('/img', classify.getclassify)
router.get('/img3', classify.getclassify3)
router.post('/add', classify.addclassify)
router.post('/revise', classify.Reviseclassify)
router.get('/change', classify.changeclassify)
    // 向外共享路由对象
module.exports = router