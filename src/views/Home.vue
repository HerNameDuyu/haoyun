<template>
  <div class="home-wrap">
    <van-nav-bar
      title="车辆评估"
    />
    <div class="inputBox">
      <div class="upLoadBox">
        <van-uploader :after-read="afterRead" 
        :accept="'image/*'" 
        >
        <div class="cameraBox">
          <img src="../assets/icons/camera1.png">
        </div>

        <!-- <div style="width:100%;height:100%">
          <svg t="1631693379968" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2327" width="200" height="200"><path d="M880.672 899.013H143.33c-42.866 0-77.617-34.654-77.617-77.403V299.141c0-42.75 34.75-77.403 77.617-77.403h164.933l48.507-77.402c0-10.69 28.093-19.351 38.809-19.351h232.845c10.714 0 38.807 8.662 38.807 19.351l48.51 77.402H880.673c42.866 0 77.614 34.653 77.614 77.403v522.47c0 42.748-34.748 77.402-77.614 77.402z m-368.67-599.872c-139.313 0-252.25 112.627-252.25 251.56 0 138.935 112.937 251.559 252.25 251.559 139.308 0 252.241-112.621 252.247-251.546v-0.023c-0.006-138.929-112.939-251.55-252.247-251.55z m0 425.717c-96.448 0-174.634-77.969-174.634-174.156 0-96.183 78.186-174.157 174.634-174.157s174.632 77.974 174.632 174.157c0 96.187-78.185 174.156-174.632 174.156z" p-id="2328" fill="#bfbfbf"></path></svg>
        </div> -->
        
        </van-uploader>
      </div>
      <input placeholder="请输入行驶证上的17位车架号" v-model="carCode">
      <div class="btnSearch">
        <van-button class="search-btn" type="primary"  @click="handleSearch()">查询</van-button>
      </div>
    </div>    
    <div class="popList" v-if="showPopList">
      <van-cell v-for="(item,index) in popList" :key="index" :title="item.model_name" :value="item.model_price+'万'"  @click="popRowClick(item)"/>
    </div>
    <div class="bottomBox" v-show="hideShow" >
      <van-button class="bottom-btn"  type="default" @click="codeSearch()">车架号查询</van-button>
      <van-button class="bottom-btn"  type="default" @click="historySearch()">查询历史</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import api from "../api/index.js"
import config from "../config.js"
export default {
  data(){
    return {
      carCode:'',
      fileList: [],
      showPopList: false,
      popList:[],
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true
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
  mounted(){
    window.onresize = () => {
      return (
        ()=>{
          this.showHeight = document.body.clientHeight;
        })()
    }
  },
  created(){
    if(window.localStorage.getItem("vinNo")){
      // window.localStorage.removeItem("vinNo");
      this.carCode = window.localStorage.getItem("vinNo")
    }
  },
  methods:{
    getVin(imgUrlBase64){
      return new Promise((resolve,reject) => {
        let query = {
          driveData: imgUrlBase64
        };
        api.ocrDiscern(query).then((res) => {
          if(res.status == 1){
            resolve(res.data || '')
          }else{
            reject(res.error_msg)
          }
        })
      })
    },
    async afterRead(file){
      // console.log('上传的文件',file)
      if(!file) return;
      let baseImage = ''
      //接口图片上限是1.5MB,对大于1MB的图片进行压缩
      //压缩是一个异步过程
      if(file.file.size > 1 * 1024 * 1024){
        baseImage = await this.compress(file.content);
      }else{
        baseImage = file.content;
      }
      if(!baseImage){return}
      this.getVin(baseImage).then((res) => {
        this.carCode = res.vin;
      })
      .catch((err) => {
        Toast(err || "识别失败！")
      })

    },
    validateVin(VIN){
      if(typeof(VIN)!='string') return false;
      if(VIN.length!=17) return false;
      VIN=VIN.toUpperCase();
      const RE =/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{3}\d{5}$/
      if(!RE.test(VIN)) return false;
      let cOT={
          '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,
          '8':8,'9':9,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,
          'G':7,'H':8,'J':1,'K':2,'L':3,'M':4,'N':5,'P':7,
          'R':9,'S':2,'T':3,'U':4,'V':5,'W':6,'X':7,'Y':8,
          'Z':9
      };
      let xWT=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2]; // 因为第9位权重为0，所以原来是什么字符不影响结果，可以方便后面计算
      let sum=0;
      let VINs=VIN.split('');
      for(let i=0;i<17;i++){
          sum=sum + cOT[ VINs[i] ] * xWT[i];
      }
      let cT=['0','1','2','3','4','5','6','7','8','9','X'];
      if( cT[ (sum%11) ] == VINs[8]) return true;
      return false;
    },
    checkVin(vin){
      if(vin.length>0 && vin.length!=17) return false;
      var vinVal = vin.toUpperCase();
      var charToNum = {
          'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,
          'J':1,'K':2,'L':3,'M':4,'N':5,'P':7,'R':9,
          'S':2,'T':3,'U':4,'V':5,'W':6,'X':7,'Y':8,'Z':9
      }
      var obj = 0;
      var arr = new Array();
      for(var i = 0;i < vinVal.length;i++){
        var temp = vinVal.charAt(i);
        if(charToNum[temp]){
          arr[i] = charToNum[temp];
        }else{
          arr[i] = Number(temp)
        }
        if(i == 8){
          arr[i] = vinVal.charAt(i)
        }
      }
      var a1 = 8;
      for(let i = 0; i < 7;i++){
        obj += Number(arr[i])*a1;
        a1--;
      }
      obj += Number(arr[7])*10;
      var a2 = 9;
      for(let i = 9; i < 17;i++){
        obj += Number(arr[i])*a2;
        a2--;
      }
      var result = Number(obj)%11;
      if(parseInt(result) === 10){
        result =  'X'
      }
      if(result == arr[8]){
        return true
      }else{
        return false
      }
    },
    handleSearch(){
      if(!this.carCode){
        Toast.fail('请先填写车架号')
        return
      }
      window.localStorage.setItem("vinNo", this.carCode);//点击查询之后再把车架号存储到localStorage
      //做一个vin格式校验，模糊图片等返回的车架号可能有问题
      // if(!this.validateVin(this.carCode)){
      //   Toast.fail('车架号格式不正确，请重新填写!')
      //   return
      // }
      if(!this.checkVin(this.carCode)){
        Toast({
          message:'车架号格式不正确，请重新填写！',
        })
        return
      }
      let query = {
        vinNo:  this.carCode
      }
      api.matchCar(query).then((res) => {
        if(res.status == 1){
          let obj = {
            model_id: 82,
            model_liter: "2.0T",
            model_name: "2010 款 奥迪 A6L 2.0 TFSI 自动标准型",
            model_price: 39.99
          }
          //假造数据
          // res.modelInfo = [res.modelInfo[0],obj]
          if(res.modelInfo.length == 1){
            let formDatas ={
              vinNo : window.localStorage.getItem("vinNo"),
              modelId : res.modelInfo[0].model_id,
              modelName : res.modelInfo[0].model_name,
            }
            this.$router.push({
              name:'Details',
              params:formDatas
            })
          }else if(res.modelInfo.length > 1){
            //弹出多行list
            this.showPopList = true
            this.popList = res.modelInfo
          }
        }else{
          Toast.fail(res.error_msg || '系统异常！')
        }
      })
    },
    popRowClick(row){
      let formDatas ={
        vinNo : window.localStorage.getItem("vinNo"),
        modelId : row.model_id,
        modelName : row.model_name,
      }
      this.$router.push({
        name:'Details',
        params:formDatas
      })
    },
    codeSearch(){},
    historySearch(){
      this.$router.push('/list')
    },
    compress(imgUrlBase){
      return new Promise((resolve,reject) => {
        const image = new Image();
        image.src = imgUrlBase;
        // console.log("*******未压缩前的图片大小XX KB********",imgUrlBase.length/1024)
        let that = this;
        image.onload = function(){
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          let width = image.width;
          let height = image.height;
          canvas.height = height;
          canvas.width = width;
          ctx.fillStyle = '#fff';
          ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.drawImage(image,0,0,width,height);
          //进行中等压缩
          let nData = canvas.toDataURL('image/jpeg',config.compressRadio);
          if(nData.length/1024/1024 > 1.4){ //对半压缩后仍然大于1.5MB，提醒换小点图片吧
            Toast("图片体积过大，换小一点的图片吧！")
            nData = ''
            resolve(nData)
          }
          // console.log("*******压缩后的图片大小********",nData.length/1024);
          resolve(nData)
          // document.body.appendChild(image)
        }
      })

    },
  }
}
</script>
<style scoped lang="scss" >
.van-cell__title{
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80%;
  overflow: hidden;
  text-align: left;
}
.van-cell__value{
   flex: none;
}
.search-btn{
  background-color: #D0C378;
  height: 100%;
}
.home-wrap{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .popList{
    flex: 1;
    overflow-y: scroll;
  }

}
.inputBox{
  margin: .1rem .2rem .6rem .2rem;
  // width:100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;

  input {
    flex:1;
    border:none;
    background-color: transparent !important;
    padding-left: .2rem;
    // border:.013rem solid #297CE4;
    box-shadow:none; /*去除阴影*/
    outline: none;/*聚焦input的蓝色边框*/
    resize: none; /*textarea 禁止拖拽*/
    border: .013333rem #A9A9A9 solid; /*去除边框*/
    -webkit-appearance: none;/*常用于IOS下移除原生样式*/
    -webkit-tap-highlight-color: rgba(0,0,0,0); /*点击高亮的颜色*/
  }
  .upLoadBox{
    position: absolute;
    top: 0;
    right: 1.6rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .cameraBox{
    width: 1rem;
    height: 1rem;
    padding: .2rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .btnSearch{
    width: 1.7rem /* 120px -> 1.6rem */;
  }
}
.bottom-btn{
    background-color: #91C5C7;
    width:4rem;
    height: 100%;
}
.bottomBox{
  width:100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: #E5EDF0;
  padding: .2rem 0;
}
</style>
