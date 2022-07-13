const path = require('path')
const db = require('../db/db')

exports.getclassify = (req, res) => {
    const sql = `select * from address where flag=0 and specify=? order by id asc`
    db.query(sql, req.user.surname + req.user.danname, (err, results) => {
        // console.log(results);
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取地址成功！',
            data: results,
        })
    })
}
exports.getclassify1 = (req, res) => {
    const sql = `select * from address where flag=0 and specify=? and id=${req.query.id} order by id asc`
    db.query(sql, req.user.surname + req.user.danname, (err, results) => {
        // console.log(results);
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取地址成功！',
            data: results,
        })
    })
}
exports.addclassify = (req, res) => {
    const ss = {
        name: req.body.name,
        province: req.body.province,
        city: req.body.city,
        area: req.body.area,
        detailed: req.body.detailed,
        telephone: req.body.telephone,
        sex: req.body.sex,
        specify: req.user.surname + req.user.danname
    }
    const sql = `insert into address set ?`
    db.query(sql, ss, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加地址失败！')

        // 发布文章成功
        res.cc('添加地址成功', 0)
    })
}
exports.changeclassify = (req, res) => {
    const sql = `update address set flag=1 where id=?`
    db.query(sql, req.query.id, (err, results) => {
        // console.log(results);
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除地址失败！')
            // 删除文章分类成功
        res.cc('删除地址成功！', 0)
    })
}

exports.Reviseclassify = (req, res) => {
    const sql = `UPDATE address set ? where id=${req.body.id}`
    db.query(sql, req.body, (err, results) => {
        // console.log(results);
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改地址失败！')
        res.cc('修改地址成功！', 0)
    })
}