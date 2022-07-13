const db = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')



exports.register = (req, res) => {
    console.log(req.body);
    // 接收表单数据
    const body = req.body
    let userNameSql = 'select * from Information where username=?'
        // 判断数据是否合法
    if (!body.username || !body.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    db.query(userNameSql, [body.username], function(err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
        // TODO: 用户名可用，继续后续流程...
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        body.password = bcrypt.hashSync(body.password, 10)
        let { username, password, sex, surname, danname, province, city, area, address } = req.body
        const zcsql = 'insert into Information set ?'
        db.query(zcsql, { username: username, password: password, sex: sex, surname: surname, danname: danname, province: province, city: city, area: area, address: address }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
        })


    })
}

exports.login = (req, res) => {
    const body = req.body
    console.log(body);
    const userName = `select * from Information where username=?`
    db.query(userName, body.username, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('没有该账户')
            // TODO：判断用户输入的登录密码是否和数据库中的密码一致
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(body.password, results[0].password)
        console.log(compareResult);
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误')
        }

        // TODO：登录成功，生成 Token 字符串
        let user = {...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10000000000000000000h', // token 有效期为 10 个小时
        })
        console.log('Bearer ' + tokenStr);
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })


}