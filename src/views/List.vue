<template>
  <div class="list">
    <mt-header title="车辆评估" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="historyTitle">查询历史</div>
    <div class="inputBox">
      <input placeholder="请输入关键字查询" v-model="searchValue">
      <!-- <div class="btnSearch">
        <mt-button class="search-btn" type="danger" size="small" @click="handleSearch()">查询</mt-button>
      </div> -->
      <!-- <mt-search v-model="searchValue" cancel-text="取消" placeholder="请输入关键字查询">
      </mt-search> -->
    </div>
    <div class="mainContent">
      <div class="historySection">
        <div class="rowDetail">
            <div class="rowTitle">车架号1</div>
            <div class="rowValue">123344556777</div>
        </div>
          <div class="rowDetail">
            <div class="rowTitle">车型</div>
            <div class="rowValue">2017款胜达 2.0T 自动 两驱 智能型 7座 新款低油耗</div>
        </div>
      </div>

      <div class="historySection">
        <div class="rowDetail">
            <div class="rowTitle">车架号2</div>
            <div class="rowValue">123344556777</div>
        </div>
          <div class="rowDetail">
            <div class="rowTitle">车型</div>
            <div class="rowValue">2017款胜达 2.0T 自动 两驱 智能型 7座 新款低油耗</div>
        </div>
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
      searchValue:'',
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
.mainContent{
  position: absolute;
  top: 3.5rem;
  width: 100%;
  .historySection{
    width: 90%;
    margin: auto;
    background-color: #F2F2F2;
    border-radius: .1333rem;
    margin-bottom: .2666rem;
    .rowDetail{
        width: 100%;
        // height: .8rem;
        line-height: .8rem;
        display: flex;
        text-align: left;
        .rowTitle{
            width: 30%;
            height: 100%;
            padding-left: .133rem;
            font-weight: bold;
        }
        .rowValue{
            flex: 1;
            padding-left: .133rem;
        }
    }
  }
}
.historyTitle{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  position: fixed;
  top:1.1rem;
  width:100%;
  font-size: .4rem;
  font-weight: bold;
  letter-spacing: .1rem;
}
.inputBox{
  position: fixed;
  top:2.1rem;
  width:100%;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: center;
  input {
    width: 90%;
    height: 100%;
    border:none;
    padding-left: .2rem;
    border-radius: .133rem;
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
