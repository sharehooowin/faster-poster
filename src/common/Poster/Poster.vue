<template>
    <div id="poster_container" class="poster_container">
        <img :src="posterImg" alt="" class="posterImg">
    </div>
</template>

<script type="text/javascript">
import posterBg from  './/img/poster_bg.jpg';
export default {
    name: 'Poster',
    data:function(){
        return{
            posterImg:'',
            posterCanvas:null,
            posterImgs:this.imgList,
            posterTexts:this.textList,
            flag:0,
        }
    },
    // 属性
    props: {
        imgList:{
            type: Array,
            default: function () {
                return [
                    {
                        url:posterBg,
                        position:{ x:"center", y:"center" },
                        size:{
                            width:640,
                            height:1035
                        }
                    },
                ]
            }
        },
        textList:{
            type:Array,
            default: function(){
                return [
                    {
                        text:'海报文字测试测试',
                        style:{
                            font: "31px MheihksBold", // 字体
                            fillStyle: "#fff",        // 颜色
                            textAlign: "center",      // 水平对齐方式
                            textBaseline: "middle",   // 设置垂直对齐方式
                        },
                        position:{ x:0.5, y:0.3 },
                    }
                ]
            }
        },
        designWidth:{
            type:Number,
            default: function(){
                return 640
            }
        },
        designHeight:{
            type:Number,
            default: function(){
                return 1040
            }
        },
    },
    // 组件
    components: {

    },
    mounted(){
        this.init();
    },
    // 函数
    methods:{
        init(){
            this.createCanvas()
        },
        createCanvas(){

            let doc =  document.getElementById("poster_container");
            let width = this.designWidth;
            let height = this.designHeight;

            this.posterCanvas = document.createElement('canvas');
            let ctx = this.posterCanvas.getContext('2d');
            this.posterCanvas.width = width;
            this.posterCanvas.height = height;
            this.initLayout();

            // doc.appendChild(this.posterCanvas);
        },
        initLayout(){
            this.setImgs();
            this.setTexts();
        },
        setImgs(){
            if(this.posterImgs.length>0){
                this.createImg(0)
            }
        },
        createImg(i){
            let ctx = this.posterCanvas.getContext('2d');
            let posterImgs = this.posterImgs;
            let posterItem = posterImgs[i];
            let img = new Image();
            img.onload = () => {
                let x,y,width,height;
                // x轴坐标
                if(posterItem.position.x == 'center'){
                    x = (this.posterCanvas.width - posterItem.size.width) / 2;
                } else {
                    // x = posterItem.position.x * this.posterCanvas.width;
                    x = posterItem.position.x;
                }
                // y轴坐标
                if(posterItem.position.y == 'center'){
                    y = (this.posterCanvas.height - posterItem.size.height) / 2;
                } else {
                    // y = posterItem.position.y * this.posterCanvas.height;
                    y = posterItem.position.y;
                }

                if(posterItem.size.width.fitMode == 'width'){
                    width = posterItem.size.width.value * this.posterCanvas.width;
                } else if(posterItem.size.width.fitMode == 'height'){
                    width = posterItem.size.width.value * this.posterCanvas.height;
                } else{
                    width = posterItem.size.width;
                }

                if(posterItem.size.height.fitMode== 'width'){
                    height = posterItem.size.height.value * this.posterCanvas.width;
                } else if(posterItem.size.height.fitMode == 'height'){
                    height = posterItem.size.height.value * this.posterCanvas.height;
                } else{
                    height = posterItem.size.height;
                }

                console.log(x,y,width,height)

                ctx.drawImage(img,x,y,width,height);

                if(i >= posterImgs.length - 1){
                    this.setTexts();
                    this.generatePoster();
                }else{
                    i++;
                    this.createImg(i)
                }
            };
            img.src = posterItem.url;
        },
        setTexts(){
            let ctx = this.posterCanvas.getContext('2d');
            let posterTexts = this.posterTexts;
            for(let i in posterTexts){
                let posterText = posterTexts[i];
                let x = posterText.position.x * this.posterCanvas.width;
                let y = posterText.position.y * this.posterCanvas.height;
                for(let key in posterText.style){
                    ctx[key] = posterText.style[key]
                }
                ctx.fillText(posterText.text, x, y);

                if(i >= posterTexts.length-1){
                    this.generatePoster();
                }
            }
        },
        generatePoster(){
            let dataUrl = this.posterCanvas.toDataURL('image/jpeg');
            let img = new Image();
            img.onload = ()=> {
                let dataUrl = this.compress(img);
                this.posterImg = dataUrl;
            }
            img.src = dataUrl;
        },
        //图片压缩
        compress(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;

            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                console.log("大于400万像素")
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;

            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            // let ndata = canvas.toDataURL( 'image/jpeg' , 0.8);
            let ndata = canvas.toDataURL( 'image/jpeg' , 1);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        },
    },
    // 监听
    watch: {},
    // 计算
    computed: {},
    // 过滤
    filters: {},
}
</script>

<style lang="scss">
    .poster_container{
        width:100%;
        height:100%;
        .posterImg{
            width:100%;
            height:100%;
        }
        .posterCanvas{
            position:fixed;
            top:0;
            left:0;
        }
    }
</style>