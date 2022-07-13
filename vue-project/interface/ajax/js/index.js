//获得用户信息
$(function() {
    axios.get('/my/userinfo').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }

    })
})

//更改用户信息
$(function() {
    const data = $(this).serialize()
    axios.post('/my/userinfo', data).then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//更改密码
$(function() {
    const data = $(this).serialize()
    axios.post('/my/updatepwd', data).then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//更改头像
$(function() {
    axios.post('/my/update/avatar').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//获取轮播图
$(function() {
    axios.get('/my/article/img').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//添加轮播图
$(function() {
    axios.post('/my/article/add').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//删除轮播图
$(function() {
    axios.get('/my/article/delimg/:id').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//获取分类
$(function() {
    axios.get('/classify/img').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//添加分类
$(function() {
    axios.post('/classify/add').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//修改分类
$(function() {
    axios.post('/classify/change').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//获取详情
$(function() {
    axios.get('/detail/img').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//添加详情
$(function() {
    axios.post('/detail/add').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//修改详情
$(function() {
    axios.post('/detail/change').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//获取商品
$(function() {
        axios.get('/commodity/img').then((res) => {
            //成功
            if (res.status === 0) {
                console.log(res.data);
            }
        })
    })
    //添加商品
$(function() {
    axios.post('/commodity/add').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})

//修改商品
$(function() {
    axios.post('/commodity/change').then((res) => {
        //成功
        if (res.status === 0) {
            console.log(res.data);
        }
    })
})