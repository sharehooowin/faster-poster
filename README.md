# builder-master-template

## Project setup
```
npm install 
```
or
```
yarn install 
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## 内容简介
最近一直在做基于微信平台的H5项目，遇到很多生成海报的需求，所以记录一下我常用到的两种生成海报的方法：
```
1、直接使用canvas书写布局，通过toDataURL将canvas内容转换为base64在<img/>标签中显示。
2、通过html + css书写布局，通过html2canvas将网页内容先转换为canvas，然后再将canvas内容转换为base64在<img/>标签中显示。
```
### 使用
#### 一、使用canvas
```
1、引入common文件夹下封装好的的Poster组件
2、四个参数designWidth、degignHeight、imgList、textList分别为设计稿的宽、高、图片布局、文字布局
3、分别配置imgList和textList实现canvas元素布局
例如:
imgList:[
    {
        url:bg, // 图片路径
        position:{ x:"center", y:"center" }, // 元素对齐方式
        size:{   //元素的宽高
            width:640,
            height:1040
        }
    },
],
textList:[
    {
        text:'你的名字？',  // 文字内容
        style:{
            font: "24px MheihksBold", // 字体
            fillStyle: "#fff",        // 颜色
            textBaseline: "middle",   // 设置垂直对齐方式
        },
        position:{ x:0.07, y:0.655 },
    }
],
```
#### 二、使用html2canvas
```
1、使用html+css完成页面布局
2、使用html2canvas插件将相应的dom元素转换为canvas内容
3、将canvas内容通过toDataURL转换为base64在<img/>标签中显示
```

## 问题说明
一、使用canvas
```
1、通过canvas实现页面布局会比较麻烦，可以使用封装好的Poster组件稍微提高一下效率
2、海报生成完成前可能有一段时间的黑屏、因为图片的加载和canvas转base64需要一定的时间
3、对于例如文字换行这样的布局不好处理
```
二、使用html2canvas
```
1、使用html+css布局比使用canvas布局更方便更快
2、海报生成前显示html元素可以解决使用canvas出现的黑屏尴尬
3、使用background-image会使图片很模糊
4、可以很好的结局文字布局的问题
5、海报容器<img/>标签要注意设置display:block;，不让其出现白边,否则生成海报的时候会有一下的偏移，体验很不好
```
