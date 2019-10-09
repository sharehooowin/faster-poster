import axios from 'axios'
// 微信分享
let title='微信分享标题'
let desc='微信分享语'
let link= ''
let imgUrl='分享图片'
let h5_url=''
const wx = window.wx||{}
const MtaH5 = window.MtaH5||{}
class Utils{
    constructor(){
        this.shareCallback
        this.optionsWx = new Object()
        this.openid = ""
    }
    /**
     * 获取Url参数
     */
    GetRequest(){
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for(let i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    /**
     * POST请求
     */
    async httpPost(url='',data={},config={}){
        //url = "http://wx.vip-h5.com/api/wx/getJSSDKConfig"
        if(config.headers){
            if(config.headers['Content-Type'] == 'application/json'){
                data = JSON.stringify(data)
            }
        }
        let result = await axios.post(url,data,config)
        return result.data
    }
    /**
     * GET请求
     */
    async httpGet(url=''){
        let retult = await axios.get(url)
        return retult.data
    }
    /**
     * * 初始化微信JS-SDK
     */
    async initWX(url='', title='', desc='', link='', imgUrl='',shareCallback=''){
        this.shareCallback = shareCallback
        this.optionsWx.title = title
        this.optionsWx.desc = desc
        this.optionsWx.link = link
        this.optionsWx.imgUrl = imgUrl

        let data = new Object()
        let config = new Object()
        data.url = window.location.href.split("#")[0]
        data.projectAppId = ""
        config.headers = {'Content-type':'application/json'}
        let result = await this.httpPost(url,data,config)
        if(result.errcode == 0){
            try {
                wx.config({
                    beta: true, // 开启内测接口调用，注入wx.invoke方法
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.data.appId, // 公众号的唯一标识
                    timestamp: result.data.timestamp, // 生成签名的时间戳
                    nonceStr: result.data.nonceStr, // 生成签名的随机串
                    signature: result.data.signature,// 签名，见附录1
                    jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage','getLocation'] //分享到朋友圈：onMenuShareTimeline， 分享到朋友：onMenuShareAppMessage
                    // 需要使用的jsapi列表，所有jsapi列表见附录2
                });
                wx.ready(()=>{
                    this.reOnMenuShareTime({title, link, imgUrl});
                    this.reOnMenuShareAppMessage({title, desc, link, imgUrl});
                })
            }catch (e){
                return e
            }
        }
    }
    /**
     * 微信分享朋友圈
     */
    reOnMenuShareTime({title='', link='', imgUrl=''}) {
        if(!title) title = this.optionsWx.title
        if(!link) link = this.optionsWx.link
        if(!imgUrl) imgUrl = this.optionsWx.imgUrl
        try {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: () =>{
                    if(this.shareCallback) {
                        this.shareCallback(2)
                    }
                },
                cancel: function () {
                    //用户取消分享后执行的回调函数
                    return
                }
            });
        }catch (e){
            return e
        }
    }
    /**
     * 微信分享好友
     */
    reOnMenuShareAppMessage({title='', desc='', link='', imgUrl=''}) {
        if(!title) title = this.optionsWx.title
        if(!desc) desc = this.optionsWx.desc
        if(!link) link = this.optionsWx.link
        if(!imgUrl) imgUrl = this.optionsWx.imgUrl
        try {
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc:desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: () =>{
                    if(this.shareCallback) {
                        this.shareCallback(1)
                    }
                },
                cancel: function () {
                    return
                }
            });
        }catch (e){
            return e
        }
    }

    /**
     * 允许指定doc滚动
     * context:vue上下文,doc：需要滚动的doc
     */
    canScroll(context,doc){
        let startY
        doc.addEventListener('touchstart',(e)=>{
            startY = e.targetTouches[0].clientY
        })
        doc.addEventListener('touchmove',(e)=>{
            let endY = e.targetTouches[0].clientY
            if(endY-startY>=0){
                if(0<doc.scrollTop){
                    context.$store.commit('setCanScroll',true)
                }else {
                    context.$store.commit('setCanScroll',false)
                }
            }else {
                if(doc.scrollTop+doc.clientHeight<doc.scrollHeight){
                    context.$store.commit('setCanScroll',true)
                }else {
                    context.$store.commit('setCanScroll',false)
                }
            }
        })
        doc.addEventListener('touchend',()=>{
            context.$store.commit('setCanScroll',false)
        })
    }
    /**
     * toast提示
     * val:显示文本，time：显示时间
     */
    showToast(val='提示',time=2000){
        if(this.toastTimer){
            clearTimeout(this.toastTimer)
        }
        let toastList = document.getElementsByClassName('toast-utils')
        if(toastList.length>0){
            document.body.removeChild(toastList[0])
        }
        let toastDoc = document.createElement('span')
        toastDoc.innerText = val
        toastDoc.className = "toast-utils"
        toastDoc.style = "display: inline-block;max-width: 60vw;position: fixed;" +
            "top: 80%;left: 50%;transform: translate(-50%,-50%);overflow: hidden;" +
            "text-overflow: ellipsis;white-space: nowrap;color: #ffffff;" +
            "padding: 3px 10px;font-size: 14px;border-radius: 5px;" +
            "background-color: rgba(0, 0, 0, .7);z-index:10000000000;"
        document.body.appendChild(toastDoc)
        this.toastTimer = setTimeout(()=>{
            document.body.removeChild(toastDoc)
        },time)
    }
    /**
     *微信授权
     */
    auth() {
        let url = location.href
        const key = encodeURI(url.split('?')[0])
        if (this.GetRequest().openid) {
            const obj = { openid: this.GetRequest().openid, expireTime: Date.now() + 24*60*60*1000 }
            localStorage.setItem(key, JSON.stringify(obj))
            url = url.replace(/&?openid=[^&]+/, '')
            location.replace(url)
            return false
        }
        const o = localStorage.getItem(key)
        if (o){
            const obj = JSON.parse(o)
            if (Date.now() >= obj.expireTime) {
                localStorage.removeItem(key)
                // location.replace('https://service.vip-h5.com/cmvoice/index?uid=dbv7DOurS3QRiO5u1Tu0gFhJWWgujcKj')
                location.replace(h5_url)
            }else {
                this.openid = obj.openid
                this.initWX(url+this.GetRequest().uid, title, desc, link, imgUrl,(type)=>{
                    if (type==1){
                        MtaH5.clickShare('wechat_friend')
                    }else {
                        MtaH5.clickShare('wechat_moments')
                    }
                })
            }
        }else {
            // location.replace('https://service.vip-h5.com/chery/index?uid=6h5dUSCn9PKpH694kxe5w8lzAxAqyneS')
            location.replace(h5_url)
        }
    }
    slideDown(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = -100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientY;
            // conosle.log(startX)
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientY;
            // conosle.log(moveX);
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX < maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideUp(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = 100 ;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientY;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientY;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX > maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideLeft(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = 100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientX;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientX;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX > maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideRight(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = -100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientX;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientX;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX < maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    /**
     * 信息提示
     * @param text 内容文本
     * @param cssStyle 自定义样式,最终会与默认样式融合(自定义样式覆盖默认样式)
     * @param time 关闭时间,默认2秒后关闭
     */
    showTips(text='',cssStyle={},time=2000){
        if(this.tipsTimer){
            clearTimeout(this.tipsTimer);
        }
        this.hideTips();
        let tipsDoc = document.createElement('div'); // 创建一个div dom
        tipsDoc.innerHTML = text;  // 设置文本提示内容
        tipsDoc.className = "tips-utils"; // 类名
        // 默认样式
        let originCssStyle = {
            "position": "fixed",
            "max-width": "60%",
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%,-50%)",
            "background-color": "rgba(0, 0, 0, .7)",
            "color": "white",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "text-align": "center",
            "padding": "10px",
            "font-size": "14px",
            "border-radius": "5px",
        };
        // 最终样式
        let targetCssStyle = Object.assign({},originCssStyle,cssStyle);

        // 将css对象属性转换为字符串
        let cssStyleString = '';
        for(let key in targetCssStyle){
            cssStyleString += `${key}:${targetCssStyle[key]};`;
        }
        // 设置样式
        tipsDoc.style = cssStyleString;

        // 添加显示提示窗口
        document.body.appendChild(tipsDoc);

        // 延时隐藏提示窗口
        this.tipsTimer = setTimeout(()=>{
            document.body.removeChild(tipsDoc)
        },time)
    }
    hideTips(){
        let tipsList = document.getElementsByClassName('tips-utils')
        if(tipsList.length>0){
            document.body.removeChild(tipsList[0])
        }
    }
    isIphoneX(){
        if(window.innerWidth/window.innerHeight<0.54){
            return true;
        }
        return false;
    }
    isSmallPhone() {
        if (window.innerWidth / window.innerHeight >= 0.6) {
            return true;
        }
        return false;
    }
    getApiHeaders(){
        return {
            'openid': this.openid,
        }
    }
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return decodeURI(r[2]); return null; //返回参数值
    }
    delUrlParam(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name)>-1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
            return url
        }else{
            return baseUrl + query;
        };
    }
}
let utils = new Utils()
export default utils