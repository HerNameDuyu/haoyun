<template>
  <div class="list">
    <mt-header title="车辆评估" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="mainContain">
        <div class="firstSection">
            <div class="secTitle">车型信息</div>
            <div class="rowDetail">
                <div class="rowTitle">左边名称1</div>
                <div class="rowValue">右边详情</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">左边名称2</div>
                <div class="rowValue">右边详情</div>
            </div>
        </div>
        <div class="secondSection">
            <div class="secTitle">估值信息</div>
            <div class="rowDetail">
                <div class="rowTitle">左边名称1</div>
                <div class="rowValue">右边详情</div>
            </div>
            <div class="noContain">无</div>
        </div>
        <div class="thirdSection">
            <div class="secTitle">综合车况</div>
            <div class="rowDetail">
                <div class="rowTitle">左边名称1</div>
                <div class="rowValue">右边详情</div>
            </div>
            <div class="noContain">无</div>
        </div>
    </div>
    <div class="searchBox">
      <mt-button  type="primary" size="small" @click="valueSearch()">估值查询</mt-button>
      <mt-button  type="primary" size="small" @click="carSearch()">车况历史</mt-button>
      <mt-button  type="primary" size="small" @click="carReport()">车型上报</mt-button>
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
   
    }
  },
  methods:{

  }
}
</script>
<style scoped lang="scss">
.search-btn{
  background-color: #D0C378;
}
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
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
.searchBox{
  width:100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 1.2rem;
  padding: 0 .133rem 0 .133rem;
}
.mainContain{
    margin-top: 1.1rem;
    .secTitle{
        height: 1.1rem;
        line-height: 1.1rem;
        text-align: left;
        font-size: .48rem;
        font-weight: bold;
        background-color: white;
        border-bottom: .0133rem solid #5E79A2;
    }
    .noContain{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
    }
    .rowDetail{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        display: flex;
        border-bottom: .0133rem solid #5E79A2;
        text-align: left;
        .rowTitle{
            background-color: #E2EAEC;
            width: 30%;
            height: 100%;
            border-right: .0133rem solid #5E79A2;
            padding-left: .133rem;
            font-weight: bold;
        }
        .rowValue{
            flex: 1;
            padding-left: .133rem;
        }
    }
}

</style>

