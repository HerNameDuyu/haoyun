<template>
  <div class="list">
    <van-nav-bar
      title="车辆评估"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="inputBox">
      <input placeholder="请输入行驶证上的17位车架号" v-model="carCode">
      <div class="btnSearch">
        <van-button class="search-btn" type="primary"  @click="handleSearch()">查询</van-button>
      </div>
    </div>
    <div class="bottomBox">
      <!-- <mt-button class="bottom-btn" type="default" size="small" @click="codeSearch()">车架号查询</mt-button>
      <mt-button class="bottom-btn" type="default" size="small" @click="historySearch()">查询历史</mt-button> -->
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
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
  height: 100%;
}
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
}
.inputBox{
  position: fixed;
  top:1.3rem;
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
