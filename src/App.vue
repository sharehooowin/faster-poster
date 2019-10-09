<template>
  <div id="app"  >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    name: 'app',
    components: {
    },
    mounted(){
    },
    methods:{
        touchMove(e){
            if(!this.$store.getters.getCanScroll){
                e.preventDefault()
            }
        }
    }
}
</script>

<style lang="scss">
html,body{padding: 0;margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%!important;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
