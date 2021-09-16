<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/list">List</router-link>
    </div> -->
    <div>没有值吗？</div>
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true
    }
  },
  created(){
    // console.log("APP创建啦！！！！！！！！！！！")
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
    // window.localStorage.removeItem('vinUserId')
    // window.localStorage.removeItem('vinNo')
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
