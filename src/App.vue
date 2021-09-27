<template>
  <div id="app" :style="{'height':appHeight}">
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true,
      appHeight:'100%'
    }
  },
  metaInfo: {
    meta: [
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
    ],
  },
  created(){
    // console.log("APP创建啦！！！！！！！！！！！")
    if(window.localStorage.getItem("vinNo")){
      window.localStorage.removeItem("vinNo");
    }
  },
  mounted(){
    window.onresize = () => {
      return (
        ()=>{
          this.showHeight = document.body.clientHeight;
        })()
    }
  },
  beforeDestroy(){
    // console.log("APP要销毁啦！！");
    window.localStorage.removeItem('vinUserId')
    window.localStorage.removeItem('vinNo')
  },
  watch:{
    showHeight:function(){
      if(this.docmHeight > this.showHeight){
        this.hideShow = false;
      }else{
        this.hideShow = true;
      }
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
