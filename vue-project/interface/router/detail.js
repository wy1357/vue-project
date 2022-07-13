// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const multer = require('multer')


// 导入处理路径的核心模块
const path = require('path')
    // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径

const detail = require('../router_handler/detail')
    //获取单独商品商品
router.get('/img', detail.getclassify)
    //获取商品详情
router.get('/inquire', detail.inquireclassify)
    //添加商品
router.post('/add', multipartMiddleware, detail.addclassify)
    //修改商品
router.post('/change', multipartMiddleware, detail.changeclassify)
    //删除商品
router.get('/delete', detail.deleteclassify)
    //根据商品名称模糊查询
router.get('/fuzzyquery', detail.fuzzyquery)
    //根据分类获得商品
router.get('/img/classify', detail.getclassify1)
    // 向外共享路由对象
module.exports = router