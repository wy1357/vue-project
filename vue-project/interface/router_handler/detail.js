const path = require('path')
const db = require('../db/db')
const connection = require('../db/db')
exports.getclassify = (req, res) => {
    const page_num = req.query.page_num //当前的num
    const page_size = req.query.page_size //当前页的数量
    const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
    var sql = "select * from detail where flag=0 limit  ?,?"
    connection.query(sql, params, function(err, result) {
        if (err) {
            console.log('err', err.message)
            res.json({
                code: 1,
                message: '查询失败'
            })

        } else {
            let sqlTotal = 'select count(*) as total from detail where flag=0' //as更换名称
            connection.query(sqlTotal, function(error, among) {
                if (error) {
                    console.log(error);
                } else {
                    let total = among[0]['total'] //查询表中的数量
                    res.json({
                        result: 1,
                        status: 200,
                        message: "success",
                        data: result,
                        paging: {
                            page_num: page_num,
                            page_size: page_size,
                            total: total
                        }
                    })
                }
            })

        }
    })
}
exports.inquireclassify = (req, res) => {
    console.log(req.query);
    const sql = 'select * from detail where flag=0 and id=?'
    db.query(sql, req.query.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取商品列表成功！',
            data: results,
        })
    })
}

exports.addclassify = (req, res) => {
    let colorclass = ''
    let arr = req.body.classify.split(',')
    for (let i = 0; i < req.files.colorclass.length; i++) {
        colorclass += req.files.colorclass[i].path + ','
    }
    const articleInfo = {
            //标题
            title: req.body.title,
            //价格
            value: req.body.value,
            // 封面在服务器端的存放路径
            img: req.files.img.path,
            //颜色
            clcor: req.body.clcor,
            //颜色图片
            colorclass: colorclass.slice(0, colorclass.length - 1),
            //尺码
            measure: req.body.measure,
            //详情
            details: req.body.details,
            //分类
            classify: arr[arr.length - 1]
        }
        // console.log(articleInfo);
    const sql = `insert into detail set ?`
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加商品失败！')

        // 发布文章成功
        res.cc('添加商品成功', 0)
    })
}
exports.changeclassify = (req, res) => {
    console.log(req.body);
    let colorclass = ''
    let arr = req.body.classify.split(',')
    for (let i = 0; i < req.files.colorclass.length; i++) {
        colorclass += req.files.colorclass[i].path + ','
    }
    console.log(arr[arr.length - 1]);
    const articleInfo = {
        //标题
        title: req.body.title,
        //价格
        value: req.body.value,
        // 封面在服务器端的存放路径
        img: req.files.img.path,
        //颜色
        clcor: req.body.clcor,
        //颜色图片
        colorclass: colorclass.slice(0, colorclass.length - 1),
        //尺码
        measure: req.body.measure,
        //详情
        details: req.body.details,
        //分类
        classify: arr[arr.length - 1]
    }
    const sql = `update detail set ? where id=${req.body.id}`
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更改商品失败！')
            // 删除文章分类成功
        res.cc('更改商品成功！', 0)
    })
}

exports.deleteclassify = (req, res) => {
    const sql = `update detail set flag=1 where id=?`
    db.query(sql, req.query.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除商品失败！')
            // 删除文章分类成功
        res.cc('删除商品成功！', 0)
    })
}

exports.fuzzyquery = (req, res) => {
    console.log(req.query);
    const sql = `SELECT * FROM detail WHERE flag=0 and  title Like '%${req.query.title}%' `
    db.query(sql, (err, results) => {
        // console.log(results);
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        res.send({
            results
        })
    })
}
exports.getclassify1 = (req, res) => {
    let s = ''
    if (req.query.num == 1) {
        //由低到高
        s = 'order by value asc'
    } else if (req.query.num == 0) {
        //由高到低
        s = 'order by value desc'
    } else {
        s = 'order by id asc'
    }
    const sql = `select * from detail where flag=0 and classify=? ${s}`
    db.query(sql, req.query.classify, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取分类商品成功！',
            data: results,
        })
    })
}