<template>
  <div class="list-wrap">
    <!-- <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->

    <div class="mainContent-wrap">
      <Home v-show="activeName=='home'"></Home>
      <List v-show="activeName=='history'"></List>
    </div>
    <van-tabbar v-model="activeName">
      <van-tabbar-item icon="search" name="home">车辆评估</van-tabbar-item>
      <van-tabbar-item icon="sign" name="history">查询历史</van-tabbar-item>
    </van-tabbar>
    <!-- <div class="bottomBox" v-if="hideShow">
      <van-button class="bottom-btn" type="default" @click="codeSearch()"
        >车架号查询-首页</van-button
      >
      <van-button class="bottom-btn" type="default" @click="historySearch()"
        >查询历史-首页</van-button
      >
    </div> -->
  </div>
</template>
<script>
import api from "../api/index.js";
import Home from "@/components/Home.vue";
import List from "@/components/List.vue";
export default {
  components: { Home, List },
  data() {
    return {
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true,
      showHome: true,
      showHistory: false,
      activeName: "home"
    };
  },
  created() {},
  mounted() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hideShow = false;
      } else {
        this.hideShow = true;
      }
    },
  },
  methods: {
    onLoad() {},

    onRefresh() {
      Toast("刷新成功");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    codeSearch() {
      this.showHistory = false;
      this.showHome = true;
    },
    historySearch() {
      this.showHome = false;
      this.showHistory = true;
    },
  },
};
</script>
<style scoped lang="scss">
.list-wrap {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mainContent-wrap {
  flex: 1;
  overflow: scroll;
}
.mainContent {
  height: 100%;
  margin-top: 0.266667rem;
  padding-bottom: 1.2rem;
  width: 100%;
  .historySection {
    width: 90%;
    margin: auto;
    background-color: #f2f2f2;
    border-radius: 0.1333rem;
    margin-bottom: 0.2666rem;
    .rowDetail {
      width: 100%;
      // height: .8rem;
      line-height: 0.8rem;
      display: flex;
      text-align: left;
      .rowTitle {
        width: 30%;
        height: 100%;
        padding-left: 0.133rem;
        font-weight: bold;
      }
      .rowValue {
        flex: 1;
        padding-left: 0.133rem;
      }
    }
  }
}
.historyTitle {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  // position: fixed;
  // top:1.3rem;
  width: 100%;
  font-size: 0.4rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}
.searchWrap {
  display: flex;
}
.searchBox {
  border-radius: 0.133333rem;
  border: 1px solid #297ce4;
  padding: 0;
  width: 90%;
  margin: auto;
  height: 1rem;
  line-height: 1rem;
}
.inputBox {
  margin: 0.1rem 0.3rem 0.3rem 0.3rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  .btnSearch {
    width: 1.7rem /* 120px -> 1.6rem */;
    height: 100%;
    .search-btn {
      background-color: #d0c378;
      height: 100%;
    }
  }
  #searchFrom {
    flex: 1;
    // width: 100%;
    height: 100%;
    position: relative;
  }
  input {
    width: 100%;
    // flex: 1;
    height: 100%;
    border: none;
    padding-left: 0.8rem;
    border-radius: 0.133rem;
    // border: 1px solid #297CE4;
    // padding-left: .2rem;
    box-shadow: none; /*去除阴影*/
    outline: none; /*聚焦input的蓝色边框*/
    resize: none; /*textarea 禁止拖拽*/
    border: 0.013333rem #a9a9a9 solid; /*去除边框*/
    -webkit-appearance: none; /*常用于IOS下移除原生样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*点击高亮的颜色*/
  }
  .imgBox {
    position: absolute;
    top: 0.35rem;
    left: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.bottom-btn {
  background-color: #91c5c7;
  width: 4rem;
  height: 100%;
  border: none !important;
}
.bottomBox {
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  background-color: #e5edf0;
  padding: 0.2rem 0;
}
</style>
