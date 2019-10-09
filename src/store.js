import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canScroll:false,
    isLoaded:false,
  },
  getters: {
    getCanScroll:state=>{
      return state.canScroll
    },
    getIsLoaded:state=>{
      return state.isLoaded
    }
  },
  mutations: {
    setCanScroll(state,val){
        state.canScroll = val
    },
    setIsLoaded(state){
        state.isLoaded = true
    }
  },
  actions: {

  }
})
