const path = require('path')
const db = require('../db/db')
let set = []
exports.getclassify = (req, res) => {
    const sql = 'select * from category where flag=0 and category=1 and children=1 group by directory'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        let data = []
        for (let i = 0; i < results.length; i++) {
            data = {
                name: results[i].directory,
                id: results[i].id,
                children: []
            }
            set.push(data)
            data = []
        }
        const mysql = 'select * from category where flag=0 and category<>1 and children=1 group by category'
        db.query(mysql, (err, become) => {
            let name = {}

            function obj(x, z) {
                for (let i = 0; i < become.length; i++) {
                    if (become[i].directory === set[x].name) {
                        name = {
                            id: become[i].id,
                            name: become[i].category,
                            children: []
                        }
                        set[x].children.push(name)
                        name = {}
                    }
                }
            }
            for (let i = 0; i < results.length; i++) {
                obj(i)
            }
            const mysqls = 'select * from category where flag=0'
            db.query(mysqls, (err, success) => {
                let name = {}

                function arr(x) {
                    for (let i = 0; i < success.length; i++) {
                        if (success[i].children != '1') {
                            for (let j = 0; j < set[x].children.length; j++) {
                                if (set[x].children[j].name === success[i].category) {
                                    name = {
                                        id: success[i].id,
                                        name: success[i].children
                                    }
                                    set[x].children[j].children.push(name)
                                    name = {}
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < results.length; i++) {
                    arr(i)
                }
                console.log(set[0]);
                res.send({
                    status: 0,
                    message: '获取分类列表成功！',
                    data: set,
                })
                set = []
            })
        })
    })
}
exports.getclassify3 = (req, res) => {
    const mysql = 'select * from category where flag=0 and id=?'
    db.query(mysql, req.query.id, (err, results) => {
        let name = ''
        if (results[0].category === '1' && results[0].children === '1') {
            name = results[0].directory
        } else if (results.category != '1' && results[0].children === '1') {
            name = results[0].category
        } else {
            name = results[0].children
        }
        console.log(name);
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取分类列表成功！',
            data: name,
        })
    })
}
exports.addclassify = (req, res) => {
    const sql = `insert into category set ?`
    db.query(sql, req.body, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布分类失败！')

        // 发布文章成功
        res.cc('发布分类成功', 0)
    })
}
exports.Reviseclassify = (req, res) => {
    console.log(req.body);
    let name = {
        directory: '',
        category: '1',
        children: '1'
    }
    const mysqls = 'select * from category where flag=0'
    db.query(mysqls, (err, results) => {
        for (let i = 0; i < results.length; i++) {
            if (req.body.id.toString() === results[i].id.toString()) {
                if (results[i].category === '1' && results[i].children === '1') {
                    name.directory = req.body.name
                } else if (results[i].category != '1' && results[i].children === '1') {
                    name.directory = results[i].directory
                    name.category = req.body.name
                } else {
                    name.directory = results[i].directory
                    name.category = results[i].category
                    name.children = req.body.name
                }
            }
        }
        const sql = `update category set ? where id=${req.body.id}`
        db.query(sql, name, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('修改分类失败！')
                // 删除文章分类成功
            res.cc('修改分类成功！', 0)
        })
    })

}

exports.changeclassify = (req, res) => {
    const sql = `update category set flag=1 where id=?`
    db.query(sql, req.query.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除分类失败！')
            // 删除文章分类成功
        res.cc('删除分类成功！', 0)
    })
}