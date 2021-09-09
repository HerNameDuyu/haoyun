<template>
  <div class="list">
    <mt-header title="车辆评估" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="inputBox">
      <input placeholder="请输入行驶证上的17位车架号" v-model="carCode">
      <div class="btnSearch">
        <mt-button class="search-btn" type="danger" size="small" @click="handleSearch()">查询</mt-button>
      </div>
    </div>
    <div class="bottomBox">
      <mt-button class="bottom-btn" type="default" size="small" @click="codeSearch()">车架号查询</mt-button>
      <mt-button class="bottom-btn" type="default" size="small" @click="historySearch()">查询历史</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      carCode:'',
    }
  },
  methods:{
    handleSearch(){
      console.log('点击查询,跳转详情页面');

    },
    codeSearch(){
      
    },
    historySearch(){

    }
  }
}
</script>
<style scoped lang="scss" >
.search-btn{
  background-color: #D0C378;
}
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
}
.inputBox{
  position: fixed;
  top:1.1rem;
  border:.013rem solid #D0C378;
  width:100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;

  input {
    flex:1;
    border:none;
    background-color: transparent !important;
    padding-left: .2rem;
  }
}
.bottomBox{
  width:100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: #E5EDF0;
}
</style>
