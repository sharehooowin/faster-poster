// import { Utils, Services } from '@/common'
import html2canvas from 'html2canvas';
const methods = {
    init(){
        this.createPoster();
    },
    close(){
        this.$router.replace('/');
    },
    createPoster(){
        html2canvas(this.$refs["html2canvas_poster_content"]).then(canvas=>{
            this.posterImgData = canvas.toDataURL();
            // this.$refs["html2canvas_poster_content"].style.opacity = 0;
            // this.$refs["poster"].style.opacity = 1;
        });
    },
}
export default methods
