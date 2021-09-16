<template>
  <div class="list-wrap">
    <van-nav-bar
      title="车辆评估"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="historyTitle">查询历史</div>
    <!-- <van-cell-group inset class="searchWrap">
      <van-field
        class = "searchBox"
        v-model="searchValue"
        label=""
        left-icon="search"
        placeholder="请输入关键字"
        @keyup.enter = "getHisToryList"
        clearable
      />
    </van-cell-group> -->
    <!-- <form action="javascript:;" id="searchFrom" onsubmit="searchList">
      <input type="search" v-model="searchValue" placeholder="搜索Javan的博客" />
    </form> -->
    <div class="inputBox">
        <form action="javascript:;" id="searchFrom">
          <div class="imgBox">
            <img src="../assets/icons/search.png">
          </div>
          <input type="search" v-model="searchValue" placeholder="请输入关键字查询" @keyup.enter = "getHisToryList" />
        </form>
    </div>
    <div v-if="loadingLock" class="mainContent-wrap">
    <div class="mainContent" v-if="historyList.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="historySection"  v-for="(item,index) in historyList" :key="index" @click="goDetails(item)">
          <div class="rowDetail">
              <div class="rowTitle">车架号</div>
              <div class="rowValue">{{item.vin_no}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">车型</div>
            <div class="rowValue">{{item.model_name}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">城市</div>
            <div class="rowValue">{{item.city}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">业务部门</div>
            <div class="rowValue">{{item.busorg}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">金融专员</div>
            <div class="rowValue">{{item.debiter}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">估值时间</div>
            <div class="rowValue">{{item.evaluate_time}}</div>
          </div>
          <div class="rowDetail">
            <div class="rowTitle">车况查询</div>
            <div class="rowValue">{{item.wholestate_time}}</div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="mainContent" v-else>暂无搜索记录</div>
    </div>
    <div class="bottomBox">
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js'
export default {
  data(){
    return {
      searchValue:'',
      historyList : [],
      count:0,
      loading:false,
      finished:false,
      list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      query:{
        size: 5,
        page: 1,
        total: 0
      },
      loadingLock:false
    }
  },
  created(){
    this.getHisToryList()
  },
  methods:{
    onLoad(){
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      this.query.page ++ ;
      this.getHisToryList();
    },
    getHisToryList(){
      let queryData = {
        filter:this.searchValue,
        page: this.query.page,
        pageSize: this.query.size
      };
      api.getHistorySerch(queryData)
      .then((res) => {
        this.loadingLock = true;
        this.loading = false;
        let nextList = res.record_list || [];
        if(res.status == 1){
          this.historyList = this.historyList.concat(nextList);
          if(res.record_list.length < 1){
            this.finished = true;
          }
        }
      })
      .catch(() => {
        this.loadingLock = true;
        this.loading = false;
      })
    },
    goDetails(item){
      let formDatas ={
        vinNo : item.vin_no || window.localStorage.getItem("vinNo"),
        modelId : item.model_name,
        modelName : item.model_id,
      }
      this.$router.push({
        name:'Details',
        params:formDatas
      })
    },
    onRefresh(){
      Toast("刷新成功")
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    codeSearch(){
      this.$router.push('/')
    },
    historySearch(){
      // this.$router.push('/list')
    },
  }
}
</script>
<style scoped lang="scss" >  
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
}
.list-wrap{
  height: 100vh;
  overflow:hidden;
  display: flex;
  flex-direction: column;
}
.mainContent-wrap{
    flex: 1;
  overflow: scroll;
}
.mainContent{
  // position: absolute;
  // top: 3.5rem;
  // flex: 1;
  // overflow: scroll;
  height:100%;
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
.searchWrap{
  display: flex;
}
.searchBox{
  border-radius: .133333rem;
  border: 1px solid #297CE4;
  padding: 0;
  width: 90%;
  margin: auto;
  height: 1rem;
  line-height: 1rem;
}
.inputBox{  
  width:100%;
  padding: 0 5%;
  height: 1rem;
  line-height: 1rem;
  margin-bottom: .3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  form{
    width: 100%;
    height: 100%;
    position: relative;
    }
  input {
    width: 100%;
    height: 100%;
    border:none;
    padding-left: .8rem;
    border-radius: .133rem;
    border: 1px solid #297CE4;
  }
  .imgBox{
    position: absolute;
    top: .35rem;
    left: .3rem;
    width: .3rem;
    height: .3rem;
    line-height: .3rem;
    img{
      width: 100%;
      height: 100%;
    }
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
