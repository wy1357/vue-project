const path = require('path')
const db = require('../db/db')
const connection = require('../db/db')
    //查询图片
exports.getArticle = (req, res) => {
    const page_num = req.query.page_num //当前的num
    const page_size = req.query.page_size //当前页的数量
    const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
    var sql = "select * from Carousel where flag=0 limit  ?,?"
    connection.query(sql, params, function(err, result) {
        if (err) {
            console.log('err', err.message)
            res.json({
                code: 1,
                message: '查询失败'
            })

        } else {
            let sqlTotal = 'select count(*) as total from Carousel where flag=0' //as更换名称
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

exports.getArticle1 = (req, res) => {
    const sql = 'select * from Carousel where flag=0 and id=? order by id asc'
    db.query(sql, req.query.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取banner图成功！',
            data: results,
        })
    })
}
exports.getArticle3 = (req, res) => {
        const sql = 'select * from Carousel where flag=0 and banner=1 order by id asc'
        db.query(sql, req.query.id, (err, results) => {
            // 1. 执行 SQL 语句失败
            if (err) return res.cc(err)

            // 2. 执行 SQL 语句成功
            res.send({
                status: 0,
                message: '获取banner图成功！',
                data: results,
            })
        })
    }
    //新增图片
exports.addArticle = (req, res) => {
    const articleInfo = {
            name: req.files.img.path,
            category: req.body.category,
            banner: req.body.banner
        }
        // console.log(articleInfo);
    const sql = `insert into Carousel set ?`
    db.query(sql, articleInfo, (err, results) => {
        // console.log(results);
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布banner图失败！')

        // 发布文章成功
        res.cc('发布banner图成功', 0)
    })
}
exports.changeclassify = (req, res) => {
        console.log(req);
        const articleInfo = {
                name: req.files.img.path,
                category: req.body.category,
            }
            // console.log(articleInfo);
        const sql = `UPDATE Carousel set ? where id=${req.body.id}`
        db.query(sql, articleInfo, (err, results) => {
            // console.log(results);
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // 执行 SQL 语句成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('修改banner图失败！')

            // 发布文章成功
            res.cc('修改banner图成功', 0)
        })
    }
    //删除图片
exports.deleteArticle = (req, res) => {
    const sql = `update Carousel set flag=1 where id=?`
    db.query(sql, req.query.id, (err, results) => {
        // console.log(results);
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除分类失败！')
            // 删除文章分类成功
        res.cc('删除分类成功！', 0)
    })
}
exports.lastArticle = (req, res) => {
    const sql = `select * from carousel where flag=0 and banner= 0 order by id desc limit 8`
    db.query(sql, req.query.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取banner图成功！',
            data: results,
        })
    })
}