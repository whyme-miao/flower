import axios from 'axios'
import Vue from 'vue'
// import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})

// 拦截请求
http.interceptors.request.use(config => {
    // 注意 前端Authorization是大写，后端authorization是小写，自动匹配
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 全局捕获错误
http.interceptors.response.use(res => {
    
    return res

}, err => {

    if(err.response.data.message) {
        // Vue.prototype.$message({
        //     type: 'error',
        //     message: err.response.data.message
        // })
        if(err.response.status === 422) {
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
        }
        if(err.response.status === 500) {
            Vue.prototype.$message({
                type: 'error',
                message: '用户名已存在'
            })
        }
    }
    
    
    return Promise.reject(err)
})

export default http