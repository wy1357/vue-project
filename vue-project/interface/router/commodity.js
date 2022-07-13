// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
const multer = require('multer')
    // 导入处理路径的核心模块
const path = require('path')
    // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload2 = multer({ dest: path.join(__dirname, '../commodity') })

const detail = require('../router_handler/commodity')
router.get('/img', detail.getclassify)
router.get('/img/id', detail.getclassify1)
router.post('/add', detail.addclassify)
router.get('/change', detail.changeclassify)
router.post('/revise', detail.Reviseclassify)
    // 向外共享路由对象
module.exports = router