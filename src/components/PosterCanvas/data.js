import bg from '../../assets/img/bg_poster.jpg'
import bg1 from '../../assets/img/bg1_poster.png'
import title from '../../assets/img/poster_title.png'
import man from '../../assets/img/poster_man.png'
import avator_border from '../../assets/img/avator_border.png'
import avatar from '../../assets/img/avatar.jpg';
import job_man from '../../assets/img/poster_job_man.png'

export default function data() {
	return {
        imgList:[
            {
                url:bg,
                position:{ x:"center", y:"center" },
                size:{
                    width:640,
                    height:1040
                }
            },
            {
                url:title,
                position:{ x:"center", y:55 },
                size:{
                    width:534,
                    height:267
                }
            },
            {
                url:man,
                position:{ x:144, y:250 },
                size:{
                    width:493,
                    height:703
                }
            },
            {
                url:avator_border,
                position:{ x:44, y:568 },
                size:{
                    width:89,
                    height:89
                }
            },
            {
                url:avatar,
                // url:require("../../assets/img/test.png"),
                position:{ x:50, y:574 },
                size:{
                    width:78,
                    height:78
                }
            },
            {
                url:bg1,
                position:{ x:0, y:800.9 },
                size:{
                    width:640,
                    height:262
                }
            },
            {
                url:job_man,
                position:{ x:358, y:728 },
                size:{
                    width:209,
                    height:66
                }
            },
        ],
        textList:[
            {
                text:'你的名字？',
                style:{
                    font: "24px MheihksBold", // 字体
                    fillStyle: "#fff",        // 颜色
                    textBaseline: "middle",   // 设置垂直对齐方式
                },
                position:{ x:0.07, y:0.655 },
            }
		],
	}
}
