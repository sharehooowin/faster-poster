import axios from 'axios'
let Axios = axios.create({
    //baseURL: "https://api.xxxxxx.com", // 基础URL
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);
export default Axios