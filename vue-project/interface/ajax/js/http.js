// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:3000/'

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiIxNDc4IiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IjQ1Iiwic2V4Ijoi55S3IiwiYmlydGhkYXkiOiIyMDAwLjEuMSIsInJlZ2lvbiI6IuS4reWbvSIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjUxNzM2MzI3LCJleHAiOjMuNjAwMDAwMDAwMDAwMTY1M2UrMjJ9.VDzww2gJ__Mfc7OMNaZ2A-fE1r5ul9cgKOrfGAUaYhg'

    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})