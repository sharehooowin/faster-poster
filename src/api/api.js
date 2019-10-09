import axios from './axios'
import apiObj from './apiInfo'
class Api{
    /*
    * apiObj接口参数
    * publicHeaders公共请求头信息
    * */
    constructor(){
        this.apiObj = apiObj
        this.publicHeaders = {}
    }
    /**
     * 设置公共请求头
     * obj公共请求头对象
     * */
    setPublicHeader(obj={}){
        this.publicHeaders =obj
    }
    /**
     * 获取请求头
     * privateHeaders私有请头信息*/
    getHeaders(privateHeaders){
        Object.assign(privateHeaders,this.publicHeaders)
        return Object.assign(privateHeaders,this.publicHeaders)
    }
    /**
     * POST请求
     * url：接口地址
     * data:借口参数
     * config：请求信息
     */
    async httpPost(url='',data={},privateHeaders={}){
        let config = new Object()
        config.headers = this.getHeaders(privateHeaders)
        let result
        result = await axios.post(url,data,config)
        return result.data
    }
    /**
     * GET请求
     * url：接口地址
     */
    async httpGet(url='',privateHeaders={}){
        let config = new Object()
        config.headers = this.getHeaders(privateHeaders)
        let result= await axios.get(url,config)
        return result.data
    }
    /**
     * 返回请求api结果
     * name:接口对应名称
     * data:接口参数
     */
    async getResult(name='login',data=''){
        let apiInfo = this.apiObj[name]
        let result = ''
        if(apiInfo.method==='GET'){
            let url = apiInfo.url
            if(data){
                url = url+'?'
                for (let item in data){
                    url += `${item}=${data[item]}&`
                }
            }
            result = await this.httpGet(url,apiInfo.headers)
        }else if(apiInfo.method==='POST'){
            result = await this.httpPost(apiInfo.url,data,apiInfo.headers)
        }
        return result
    }
}
export default new Api()