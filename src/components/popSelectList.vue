<template>
  <div class="dh-field">
    <div class="van-hairline--bottom">
      <van-popup v-model="show" position="bottom">
        <div class="inputBox" v-if="showSearch">
          <form action="javascript:;" id="searchFrom_serch" style="width: 85%">
            <div class="imgBox">
              <img src="../assets/icons/search.png" />
            </div>
            <input
              type="search"
              v-model="searchValue"
              placeholder="请输入关键字查询"
              @keyup.enter="fetchList()"
            />
          </form>
          <div class="btnSearch">
            <van-button
              class="search-btn"
              type="info"
              size="middle"
              @click="fetchList()"
              >查询</van-button
            >
          </div>
        </div>
        <div v-if="columns && columns.length > 0">
          <van-picker
            show-toolbar
            :value-key="option.text"
            :columns="columnsData"
            close-icon="close"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </div>
        <div class="noData" v-else>暂无信息</div>
      </van-popup>
      <!-- <van-popup
        v-model="show"
        position="bottom"
        class=""
        :style="{ height: '30%' }"
      >
        <div
          v-if="columns && columns.length > 0"
          style="max-height: 264px; overflow-y: auto"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in columns"
              :key="item[option.value]"
              :title="item[option.label]"
              clickable
              @click="toggle(index, item)"
            >
            </van-cell>
          </van-cell-group>
        </div>
        <div class="noData" v-else>暂无信息</div>
      </van-popup> -->
    </div>
  </div>
</template>
<script>
// import { Checkbox, CheckboxGroup } from 'vant';
// import Vue from 'vue';
import { Checkbox, CheckboxGroup } from "vant";
// Vue.use(Checkbox).use(CheckboxGroup);

export default {
  name: "VanFieldCheckbox",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    require: {
      type: Boolean,
      default: true,
    },
    requireMessage: {
      type: String,
      default: "此处显示校验内容",
    },
    label: {
      type: String,
      default: "标题",
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // selectValue: {
    //   type: String,
    //   default: "",
    // },
    option: {
      type: Object,
      default: function () {
        return { label: "label", value: "value" };
      },
    },
    // 是否支持搜索
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data() {
    return {
      show: false,
      columnsData: [],
      searchValue: "", // 搜索值
    };
  },
  methods: {
    onConfirm(val) {
      this.show = false;
      this.$emit("confirm", val);
      this.$emit("update:showSearch",false);
    },
    onCancel() {
      this.show = false;
      this.$emit("update:showSearch",false);
      // this.$emit("cancel", this.resultValue);
    },
    // toggle(index, item) {
    //   this.show = false;
    //   this.$emit("confirm", item);
    //   //   this.$refs.checkboxes[index].toggle();
    // },
    // 搜索
    fetchList() {
      this.$emit("fetchList", this.searchValue);
    },
    //   toggleAll(all) {
    //     console.log(all);
    //     // this.checkedAll = !this.checkedAll;
    //     this.$refs.checkboxGroup.toggleAll(this.checkedAll);
    //   },
    // showPopu(disabled) {
    //   console.log(disabled);
    //   this.columnsData = JSON.parse(JSON.stringify(this.columns));
    //   this.checkboxValue = JSON.parse(JSON.stringify(this.selectValue));
    //   this.resultValue = JSON.parse(JSON.stringify(this.selectValue));
    //   if (disabled !== undefined && disabled !== false) {
    //     return false;
    //   } else {
    //     this.show = !this.show;
    //   }
    // },
  },
  watch: {
    isVisible(val) {
      if (val) {
        this.show = true;
      }
    },
    show(val) {
      if (!val) {
        this.$emit("update:isVisible", false);
      }
    },
    columns(val) {
      let list = [];
      val.forEach((item) => {
        list.push({ ...item, text: item[this.option.label] });
      });
      this.columnsData = list;
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .van-cell__title {
//   padding: 0 0.3rem;
// }
// .dh-field {
//   padding: 0;
//   background: #fff;
//   .dh-cell.van-cell {
//     padding: 10px 0;
//   }
//   .dh-cell.van-cell--required::before {
//     left: -8px;
//   }
//   .van-popup {
//     border-radius: 20px 20px 0 0;
//   }
// }
::v-deep .van-popup--bottom {
  top: 20%;
}
.noData {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
