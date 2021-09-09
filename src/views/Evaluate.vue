<template>
  <div class="evaluate">
    <van-nav-bar
      title="车辆评估"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContent">
      <van-form @submit="onSubmit">
        <van-row  class="city rowSection">
          <van-col span="4">城 市：</van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="浙江" v-model="result" readonly @click="showPicker = true"/>
              <div class="triangle" @click="showPicker = true"></div>
            </div>
            <span class="label">省</span>
            </van-col>
      
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="杭州" v-model="result" readonly @click="showPicker = true"/>
              <div class="triangle" @click="showPicker = true"></div>
            </div>
            <span class="label">市</span>
          </van-col>
        </van-row>
        <van-row  class="car rowSection">
          <van-col span="4">车 型：</van-col>
          <van-col span="20" class="formItem">
            <input placeholder="请输入车型" v-model="result" type="text"/>
          </van-col>
        </van-row>
        <van-row  class="timer rowSection">
          <van-col span="4">上牌日期：</van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="浙江" v-model="result" readonly @click="showPicker = true"/>
              <div class="triangle" @click="showPicker = true"></div>
            </div>
            <span class="label">年</span>
          </van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="杭州" v-model="result" readonly @click="showPicker = true"/>
              <div class="triangle" @click="showPicker = true"></div>
            </div>
            <span class="label">月</span>
          </van-col>
        </van-row>
        <van-row  class="mileage rowSection">
          <van-col span="4">行驶里程：</van-col>
          <van-col span="20" class="formItem">
            <input placeholder="请输入里程" v-model="result" type="number"/>
            <span class="label">万公里</span>
          </van-col>
        </van-row>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <van-popup v-model="showPicker"  position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

    </div>

    <div class="bottomBox">
      <!-- <mt-button class="bottom-btn" type="default" size="small" >车架号查询</mt-button>
      <mt-button class="bottom-btn" type="default" size="small" @click="historySearch()">查询历史</mt-button> -->
      
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
    </div>
  </div>
</template>
<script>

import request from "../utils/Axios.js"

console.log(request)
export default {
  data(){
    return {
      carCode:'',
      result:'',
      showPicker:false,
      columns:['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'],
    }
  },
  methods:{
    onSubmit(){
      console.log("kkkk")
            request({
      url: 'API_Evaluate_OcrDiscern?driveData=1&userId=1012',
      method: "get"
    });
      

    },
    onConfirm(){

    },
    codeSearch(){
      
    },
    historySearch(){

    },
    onClickLeft(){}
  }
}
</script>
<style scoped lang="scss" >
.bottom-btn{
  background-color: #91C5C7;
  border:none !important;
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
.triangle{
    width: 0;
    height: 0;
    border: .1rem /* 3px -> .04rem */ solid;
    border-color: #000 transparent transparent ;
    position: absolute;
    right: .066667rem /* 5px -> .066667rem */;
    top: 50%;
    transform:translateY (-50%);

}
.mainContent{
  margin-top: 1.5rem;
  padding: .266667rem /* 20px -> .266667rem */ .133333rem ;
  width: 100%;
  .rowSection{
    margin-bottom: .266667rem /* 20px -> .266667rem */;
    height: .8rem;
    line-height: .8rem;
  }
  input{
    height: .6rem;
  }
  .timer,.city,.car{
    input{
      width: 100%;
    }
  }
  .car{
    .formItem{
      padding-right: 5%;
    }
  }
  .mileage{
    input{
      flex: 1;
    }
    .label{
      width: 15%;
    }
  }
  .formItem{
    display: flex;
  }
  .inputBox{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .label{
    margin-left: .14rem ;
    margin-right: .133333rem;
  }
  // .formItem{
  //   display: flex;
  //   .formItem_left{
  //     width: 15%;
  //     text-align: right;
  //   }
  //   .formItem_right{
  //     display: flex;
  //     justify-content: space-around;
  //   }
  // }
}
</style>

