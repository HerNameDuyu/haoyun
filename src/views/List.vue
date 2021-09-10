<template>
  <div class="list">
    <van-nav-bar
      title="车辆评估"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="historyTitle">查询历史</div>
    <van-field
      class = "searchBox"
      v-model="value"
      label=""
      left-icon="search"
      placeholder="请输入关键字"
    />
    <!-- <div class="inputBox">
      <input placeholder="请输入关键字查询" v-model="searchValue">
    </div> -->
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
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
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
    onClickLeft(){},
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
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
}
.list{
  height: 100vh;
  overflow:hidden;
  display: flex;
  flex-direction: column;
}
.mainContent{
  // position: absolute;
  // top: 3.5rem;
  flex: 1;
  overflow: scroll;
  margin-top: .266667rem;
  padding-bottom: 1.2rem;
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
  // position: fixed;
  // top:1.3rem;
  width:100%;
  font-size: .4rem;
  font-weight: bold;
  letter-spacing: .1rem;
}
.searchBox{
  border-radius: .133333rem;
  border: 1px solid #297CE4;
  padding: 0;
  width: 90%;
  margin: auto;
  // position: fixed;
  // top:2.3rem;
  // left:5%;
  height: 1rem;
  line-height: 1rem;
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
