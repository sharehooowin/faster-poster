// import { Utils, Services } from '@/common'

const methods = {
    init(){
    },
    touchMove(e){
        if(!this.$store.getters.getCanScroll){
            e.preventDefault();
        }
    },
    to(path){
        this.$router.replace(path);
    }
}
export default methods
