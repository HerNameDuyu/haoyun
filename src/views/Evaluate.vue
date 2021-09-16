<template>
  <div class="evaluate">
    <van-nav-bar
      title="车辆评估"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContent">
      <!-- <van-form @submit="onSubmit"> -->
      <!-- <van-form> -->
        <van-row  class="city rowSection">
          <van-col span="4">城 市：</van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="请选择省份直辖市" v-model="formData.province" readonly @click="popCityPicker(0)"/>
              <div class="triangle" @click="popCityPicker(0)"></div>
            </div>
            <span class="label">省</span>
            </van-col>
      
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="请选择城市" v-model="formData.cityName" readonly @click="popCityPicker(1)"/>
              <div class="triangle" @click="popCityPicker(1)"></div>
            </div>
            <span class="label">市</span>
          </van-col>
        </van-row>
        <van-row  class="car rowSection">
          <van-col span="4">车 型：</van-col>
          <van-col span="20" class="formItem">
            <input :disabled="banEdit" placeholder="请输入车型" v-model="formData.modelName" type="text"/>
          </van-col>
        </van-row>
        <van-row  class="timer rowSection">
          <van-col span="4">上牌日期：</van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="请选择年份" v-model="date.year" readonly @click="popTimePicker(2)"/>
              <div class="triangle" @click="popTimePicker(2)"></div>
            </div>
            <span class="label">年</span>
          </van-col>
          <van-col span="10" class="formItem">
            <div class="inputBox">
              <input placeholder="请选择月份" v-model="date.month" readonly @click="popTimePicker(3)"/>
              <div class="triangle" @click="popTimePicker(3)"></div>
            </div>
            <span class="label">月</span>
          </van-col>
        </van-row>
        <van-row  class="mileage rowSection">
          <van-col span="4">行驶里程：</van-col>
          <van-col span="20" class="formItem">
            <input placeholder="请输入里程" v-model="formData.mile"/>
            <span class="label">万公里</span>
          </van-col>
        </van-row>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" @click="onSubmit">
            提交
          </van-button>
        </div>
      <!-- </van-form> -->
      <van-popup v-model="showPicker"  position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
    </div>
    <div class="bottomBox">
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
    </div>
  </div>
</template>
<script>

import api from "../api/index.js"


export default {
  data(){
    return {
      openType:'',
      formData:{
        vinNo:'',  
        regDate:'',
        mile:'', 
        cityName:'', 
        modelName:'',
        modelId:'',
      },
      date:{
        year:'',
        month:''
      },
      showPicker:false,
      banEdit:false,
      columns:[],
      yearList:[],
      monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
      provinceList:[],
      cityList:[],
    }
  },
  created(){
    this.creatYearList();
    if(this.$route.params != undefined && Object.keys(this.$route.params).length){
      this.formData = Object.assign({},this.formData,this.$route.params);
      if(this.formData.modelName){
        this.banEdit = true;
      }
      let dat = new Date(this.formData.regDate);
      this.date.year = dat.getFullYear();
      this.date.month = dat.getMonth()+1;
    }
    this.formData.vinNo = window.localStorage.getItem("vinNo")
  },
  methods:{
    creatYearList(){
      let dat = new Date();
      let year = dat.getFullYear();
      for(let i = year ;i >= year - 50;i--){
        this.yearList.push(i);
      }
    },
    valiteForm(formData){
      return new  Promise((resolve,reject) => {
        if(!formData.zone || !formData.mile || !formData.regDate || !formData.modelName){
          Toast("还有必填项未填写！");
          reject()
        }else{
          resolve()
        }
      })
    },
    onSubmit(){
      let month = this.date.month.toString().padStart(2,'0')
      this.formData.regDate = [this.date.year,month].join('');
      this.valiteForm(this.formData).then(()=>{
        api.evaluate(this.formData).then((res) => {
          if(res.status == 1){
            Toast.success('提交成功')
          }
        })
      })

    
    },
    popTimePicker(type){//type为2年份，3为月份
      this.openType = type;
      this.columns  = type == 2?this.yearList : this.monthList;
      this.showPicker = true
    },
    popCityPicker(type){ //type为0省份，1城市
      this.openType = type;
      let query = {
        ftype:type,
        filter: type == 1 ? this.formData.province : ''
      }
      if(!this.formData.province && type == 1){
        Toast.fail("请先选择省份")
        return 
      }
      api.getCity(query)
        .then((res) => {
          if(res.status == 1){
            this.showPicker = true;
            let list = res.record_list.map((item) => {
              return type == 0 ? item.provinceName : item.cityName
            })
            this.columns = list;
            if(type == 1){
              this.cityList = res.record_list;
            }
          }
        })
        .catch(()=>{
        })
    },
    onConfirm(val,index){
      switch(this.openType){
        case 0:
          this.formData.province = val;
          break;
        case 1:
          this.formData.cityName = val;
          this.formData.zone = this.cityList[index].cityCode;
          break;
        case 2:
          this.date.year = val;
          break;
        case 3:
          this.date.month = val;
          break;
      }
      this.showPicker = false;
    },
    onCancel(){
      this.showPicker = false;
      this.columns = [];
      this.cityList = [];
    },
    codeSearch(){
      this.$router.push('/')
    },
    historySearch(){
      this.$router.push('/list')
    },
    onClickLeft(){
      this.$router.replace('/details')
    },
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
  margin-top: .4rem;
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

