import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Index from '../components/Index/Index.vue';
import PosterCanvas from '../components/PosterCanvas/PosterCanvas.vue';
import PosterHtml2Canvas from '../components/PosterHtml2Canvas/PosterHtml2Canvas.vue';

const routes = [
    { path:'/', component:Index },
    { path:'/canvas', component:PosterCanvas },
    { path:'/html2canvas', component:PosterHtml2Canvas },
]

const router = new VueRouter({
    // mode : 'history',
    routes // (缩写) 相当于 routes: routes
})

export default router;