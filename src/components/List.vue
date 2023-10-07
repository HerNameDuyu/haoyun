<template>
  <div class="list-wrap">
    <!-- <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->

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
          <img src="../assets/icons/search.png" />
        </div>
        <input
          type="search"
          v-model="searchValue"
          placeholder="请输入关键字查询"
          @keyup.enter="getHisToryList(2)"
        />
      </form>
      <div class="btnSearch">
        <van-button
          class="search-btn"
          type="info"
          size="middle"
          @click="getHisToryList(2)"
          >查询</van-button
        >
      </div>
    </div>
    <div v-if="loadingLock" class="mainContent-wrap">
      <div class="mainContent" v-if="historyList.length > 0">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="historySection"
            v-for="(item, index) in historyList"
            :key="index"
            @click="goDetails(item)"
          >
            <div class="rowDetail">
              <div class="rowTitle">车架号</div>
              <div class="rowValue">{{ item.vinNo }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">申请车型</div>
              <div class="rowValue">{{ item.applyModelName }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">贷款银行</div>
              <div class="rowValue">{{ item.bank }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">评估渠道</div>
              <div class="rowValue">{{ item.evaluateOrg }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">业务部门</div>
              <div class="rowValue">{{ item.busOrg }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">金融专员</div>
              <div class="rowValue">{{ item.debiter }}</div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">查询时间</div>
              <div class="rowValue">{{ item.time }}</div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="mainContent" v-else>暂无搜索记录</div>
    </div>
    <div class="bottomBox" v-if="hideShow">
      <van-button class="bottom-btn" type="default" @click="codeSearch()"
        >车架号查询</van-button
      >
      <van-button class="bottom-btn" type="default" @click="historySearch()"
        >查询历史</van-button
      >
    </div>
  </div>
</template>
<script>
import api from "../api/index.js";
export default {
  data() {
    return {
      searchValue: "",
      historyList: [],
      count: 0,
      loading: false,
      finished: false,
      list: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      query: {
        size: 5,
        page: 1,
        total: 0,
      },
      loadingLock: false,
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true,
    };
  },
  created() {
    this.getHisToryList(1);
  },
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
    onLoad() {
      this.query.page++;
      this.getHisToryList(1);
    },
    getHisToryList(type) {
      if (type == 2) {
        this.query.page = 1;
        this.finished = false;
      }
      let queryData = {
        filter: this.searchValue,
        page: this.query.page,
        pageSize: this.query.size,
      };
      if (this.query.page == 1) {
        this.historyList = [];
      }
      api
        .getHistorySerch(queryData)
        .then((res) => {
          this.loadingLock = true;
          this.loading = false;
          let nextList = res.record_list || [];
          if (res.status == 1) {
            if (type == 1) {
              this.historyList = this.historyList.concat(nextList);
            }
            if (type == 2) {
              this.historyList = nextList;
            }
            if (res.record_list.length < 1) {
              this.finished = true;
            }
          }
        })
        .catch(() => {
          this.loadingLock = true;
          this.loading = false;
        });
    },
    goDetails(item) {
      let formDatas = {
        vinNo: item.vinNo,
        bank: item.bank || "", // 贷款银行
        evaluateOrg: item.evaluateOrg || "", //评估渠道
        cardDate: "", // 车辆注册日期
        // modelId: "", // 车型id
        // modelName: item.applyModelName || "",
        // seriesId: "",
        // seriesName: "",
        // brandId: "",
        // brandName: "",
        brandDetailName: "",
        oldOwner: "",
        engineNo: "",
        base64String: "",
      };

      this.$router.push({
        name: "Details",
        params: formDatas,
      });
    },
    onRefresh() {
      Toast("刷新成功");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    codeSearch() {
      this.$router.push("/");
    },
    historySearch() {
      // this.$router.push('/list')
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
  // overflow: scroll;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+, edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.mainContent {
  height: 100%;
  margin-top: 0.266667rem;
  padding-bottom: 1.2rem;
  width: 100%;
  .historySection {
    // width: 90%;
    margin: 0 0.3rem;
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
    // width: 1.7rem /* 120px -> 1.6rem */;
    margin-left: 0.2rem;
    height: 100%;
    .search-btn {
      font-size: small;
      padding: 0 0.20667rem;
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
