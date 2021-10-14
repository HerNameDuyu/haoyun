<template>
  <div class="detail-wrap">
    <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContain" v-if="loadingLock">
        <div class="firstSection">
          <div class="secTitle">车型信息</div>
          <div v-if="Object.keys(allDetails.modelInfo).length>0">
            <div class="rowDetail">
                <div class="rowTitle">品牌</div>
                <div class="rowValue">{{allDetails.modelInfo.brand_name}}</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">车系</div>
                <div class="rowValue">{{allDetails.modelInfo.series_name}}</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">车型</div>
                <div class="rowValue">{{allDetails.modelInfo.model_name}}</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">车型年款</div>
                <div class="rowValue">{{allDetails.modelInfo.model_year}}</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">车型指导价</div>
                <div class="rowValue">{{allDetails.modelInfo.model_price}}</div>
            </div>
            <div class="rowDetail">
                <div class="rowTitle">排放标准</div>
                <div class="rowValue">{{allDetails.modelInfo.model_emission_standard}}</div>
            </div>
          </div>
          <div v-else  class="noContain">无</div>
        </div>
        <div class="secondSection">
            <div class="secTitle">估值信息</div>
            <div v-if="Object.keys(allDetails.evaluateInfo).length>0">
              <div class="rowDetail">
                  <div class="rowTitle">所在城市</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.city_name}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">上牌日期</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.reg_date}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">行驶里程(万公里)</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.mile}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">车商收购价</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.dealer_buy_price}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">个人交易价</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.individual_price}}</div>
              </div>
                <div class="rowDetail">
                  <div class="rowTitle">车商零售价</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.dealer_price}}</div>
              </div>
               <div class="rowDetail">
                  <div class="rowTitle">估值报告</div>
                  <div class="rowValue" @click="viewReport(allDetails.evaluateInfo.report_url)"  style="color:#169BD5">{{allDetails.evaluateInfo.report_url?'点击查看':''}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">报告时间</div>
                  <div class="rowValue">{{allDetails.evaluateInfo.report_time}}</div>
              </div>
            </div>
            <div v-else  class="noContain">无</div>
        </div>
        <div class="thirdSection">
            <div class="secTitle">综合车况</div>
            <div v-if="Object.keys(allDetails.wholestateInfo).length>0">
              <div class="rowDetail">
                  <div class="rowTitle">是否事故车</div>
                  <div class="rowValue" v-if="allDetails.wholestateInfo.is_accident_car == '1'">是</div>
                  <div class="rowValue" v-else-if="allDetails.wholestateInfo.is_accident_car == '0'">否</div>
                  <div class="rowValue" v-else></div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">事故等级</div>
                  <div class="rowValue">{{allDetails.wholestateInfo.accident_grade}}</div>
              </div>
               <div class="rowDetail">
                  <div class="rowTitle">车况报告</div>
                  <div class="rowValue" @click="viewReport(allDetails.wholestateInfo.report_url)" style="color:#169BD5">{{allDetails.wholestateInfo.report_url?'点击查看':''}}</div>
              </div>
              <div class="rowDetail">
                  <div class="rowTitle">报告时间</div>
                  <div class="rowValue">{{allDetails.wholestateInfo.report_time}}</div>
              </div>
            </div>
            <div v-else class="noContain">无</div>
        </div>
    <div class="searchBox">
      <van-button  type="primary" size="small" @click="evaluationSearch()">估值查询</van-button>
      <van-button  type="primary" size="small" @click="carSearch()">车况查询</van-button>
      <van-button  type="primary" size="small" @click="carReport()">车型上报</van-button>
    </div>
    </div>
    <div class="bottomBox" v-if="hideShow">
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import api from "../api/index.js"
export default {
  data(){
    return {
      allDetails:{
        modelInfo:{},
        evaluateInfo:{},
        wholestateInfo:{}
      },
      loadingLock:false,
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true
    }
  },
  created(){
    this.getDetails()
  },
  mounted(){
    window.onresize = () => {
      return (
        ()=>{
          this.showHeight = document.body.clientHeight;
        })()
    }
  },
  watch:{
    showHeight:function(){
      if(this.docmHeight > this.showHeight){
        this.hideShow = false;
      }else{
        this.hideShow = true;
      }
    }
  },
  methods:{
    //获取详情
    getDetails(){
      let query = {
        vinNo:'',//车架号
        modelId:'',//车型内码
        modelName:'',//车型名称
      };
      if(this.$route.params != undefined && Object.keys(this.$route.params).length){
        query =  Object.assign({},query,this.$route.params);
      }else{
        this.$router.push('/');
        return
      }
      api.getDetais(query)
      .then((res) => {
        this.loadingLock = true;
        if(res.status == 1){
          this.allDetails.modelInfo = res.modelInfo;
          this.allDetails.evaluateInfo = res.evaluateInfo;
          this.allDetails.wholestateInfo = res.wholestateInfo;
        }else{
          Toast.fail(error_msg);
        }
      })
      .catch(() => {
        this.loadingLock = true;
      })
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    viewReport(url){
      if(!url) return
      window.location.href = url;
    },
    evaluationSearch(){
      let formDatas = {
        modelName: this.allDetails.modelInfo.model_name || '',
        modelId: this.allDetails.modelInfo.model_id.toString() || '',//车型内码
        regDate: this.allDetails.evaluateInfo.reg_date || '',//上牌日期
        mile: this.allDetails.evaluateInfo.mile || '',//行驶里程
        cityName: this.allDetails.evaluateInfo.city_name || '',//所在城市
        zone: this.allDetails.evaluateInfo.zone || '',//所在城市编码
        province: this.allDetails.evaluateInfo.province_name || '',
        vinNo: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),//车架号
      }
      this.$router.replace({
        name:'Evaluate',
        params:formDatas
      })
    },
    carSearch(){
      let query = {
        vinNo: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
        brandName: this.allDetails.modelInfo.brand_name,
        seriesName: this.allDetails.modelInfo.series_name,
      };
      api.generalInfo(query).then((res)=>{
        if(res.status == 1){
          Toast.success('提交成功！');
        }else{
          Toast.fail(error_msg);
        }
      })
    },
    carReport(){
      let query = {
        vinNo: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
      };
      api.carModelReport(query).then((res) => {
        if(res.status == 1){
          Toast.success('上报成功！');
        }else{
          Toast.fail(error_msg);
        }
      })
    },
    codeSearch(){
      this.$router.push('/')
    },
    historySearch(){
      this.$router.replace('/list')
    },
  }
}
</script>
<style scoped lang="scss">
.search-btn{
  background-color: #D0C378;
}
.searchBox{
  width:100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  // position: fixed;
  // bottom: 1.0rem;
  margin-top: .5rem;
  padding: 0 .133rem 0 .133rem;
  // background-color: rgba(0,0,0,.3);
  align-items: center;
}
.detail-wrap{
  height: 100%;
  overflow:hidden;
  display: flex;
  flex-direction: column;
}
.mainContain{
    margin-top: .3rem;
    flex: 1;
    overflow: scroll;
    padding-bottom: 1.5rem;
    width: 100%;
    padding-left: .2rem;
    padding-right: .2rem;
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
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.bottom-btn{
  background-color: #91C5C7;
  width:4rem;
  height: 100%;
  border:none !important;
}
.bottomBox{
  width:100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  background-color: #E5EDF0;
  padding: .2rem 0;
}
</style>

