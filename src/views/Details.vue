<template>
  <div class="detail-wrap">
    <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContain" v-if="loadingLock">
      <div class="searchBox">
        <van-button
          type="info"
          size="small"
          @click="evaluationSearch()"
          :disabled="!isEmpty(allDetails.evaluateInfo.evaluateReportURL)"
          >估值查询</van-button
        >
        <van-button
          type="info"
          size="small"
          @click="carSearch()"
          :disabled="!isEmpty(allDetails.wholestateInfo.isAccidentCar)"
          >车况查询</van-button
        >
        <van-button type="info" size="small" @click="handleEvaluate()"
          >评估计算</van-button
        >
        <van-button type="info" size="small" @click="goAttachment()"
          >附件</van-button
        >
        <!-- <van-button type="primary" size="small" @click="carReport()"
          >车型上报</van-button
        > -->
      </div>
      <div class="allSection">
        <div class="firstSection customerSection">
          <div class="secTitle">评估申请信息</div>
          <div v-if="Object.keys(allDetails.applyInfo).length > 0">
            <div class="rowDetail">
              <div class="rowTitle">贷款银行</div>
              <div class="rowValue">
                <input v-model="allDetails.applyInfo.bank" readonly disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">评估渠道</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.applyInfo.channelName"
                  readonly
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">车架号</div>
              <div class="rowValue">
                <input v-model="allDetails.applyInfo.vinNo" readonly disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">申请车型</div>
              <div
                class="rowValue"
                @click="showToolTip(allDetails.applyInfo.applyModelName)"
              >
                <input
                  readonly
                  v-model="allDetails.applyInfo.applyModelName"
                  @click="openApplyCar"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
              <!-- <van-cell-group>
              <van-field
                readonly
                is-link
                v-model="allDetails.applyInfo.applyModelName"
                label=""
                @click="openApplyCar"
              />
            </van-cell-group> -->
            </div>
            <div class="rowDetail">
              <div class="rowTitle">使用性质</div>
              <div class="rowValue">
                <input
                  readonly
                  v-model="allDetails.applyInfo.carUseType"
                  @click="openUseType"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">所在省份</div>
              <div class="rowValue">
                <input
                  readonly
                  v-model="allDetails.applyInfo.provinceName"
                  @click="openArea(0)"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">所在城市</div>
              <div class="rowValue">
                <input
                  readonly
                  v-model="allDetails.applyInfo.cityName"
                  @click="openArea(1)"
                  :disabled="
                    isEmpty(allDetails.applyInfo.provinceName) ||
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">初次上牌日期</div>
              <div class="rowValue">
                <input
                  readonly
                  v-model="allDetails.applyInfo.cardDate"
                  @click="openTime()"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">行驶里程</div>
              <div class="rowValue">
                <input
                  type="number"
                  v-model="allDetails.applyInfo.kms"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">原车主</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.applyInfo.oldOwner"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">发动机号</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.applyInfo.engineNo"
                  :disabled="
                    !isEmpty(allDetails.evaluateInfo.evaluateReportTime)
                  "
                />
              </div>
            </div>
          </div>
          <div v-else class="noContain">无</div>
        </div>
        <div class="secondSection customerSection">
          <div class="secTitle">估值信息</div>
          <div v-if="Object.keys(allDetails.evaluateInfo).length > 0">
            <div class="rowDetail">
              <div class="rowTitle">估值报告</div>
              <div
                class="rowValue"
                @click="viewReport(allDetails.evaluateInfo.evaluateReportURL)"
                style="color: #169bd5"
              >
                {{
                  allDetails.evaluateInfo.evaluateReportURL ? "点击查看" : ""
                }}
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">评估结果时间</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.evaluateInfo.evaluateReportTime"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">基准价</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.evaluateInfo.standardPrice"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">品牌</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.evaluateInfo.resultBrandName"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">车系</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.evaluateInfo.resultSeriesName"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">车型</div>
              <div
                class="rowValue"
                @click="showToolTip(allDetails.evaluateInfo.resultModelName)"
              >
                <input
                  v-model="allDetails.evaluateInfo.resultModelName"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">类型</div>
              <div class="rowValue">
                <input v-model="allDetails.evaluateInfo.carNature" disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">新车指导价</div>
              <div class="rowValue">
                <input v-model="allDetails.evaluateInfo.guidePrice" disabled />
              </div>
            </div>

            <!-- <div class="rowDetail">
            <div class="rowTitle">报告时间</div>
            <div
              class="rowValue"
            >
              {{ allDetails.evaluateInfo.report_time }}
            </div>
          </div> -->
          </div>
          <div v-else class="noContain">无</div>
        </div>
        <div class="thirdSection customerSection">
          <div class="secTitle">车况查询</div>
          <div v-if="Object.keys(allDetails.wholestateInfo).length > 0">
            <div class="rowDetail">
              <div class="rowTitle">是否事故车</div>
              <div
                class="rowValue"
                v-if="allDetails.wholestateInfo.isAccidentCar == '1'"
              >
                是
              </div>
              <div
                class="rowValue"
                v-else-if="allDetails.wholestateInfo.isAccidentCar == '0'"
              >
                否
              </div>
              <div class="rowValue" v-else></div>
            </div>

            <!-- <div class="rowDetail">
                  <div class="rowTitle">车况报告</div>
                  <div class="rowValue" @click="viewReport(allDetails.wholestateInfo.report_url)" style="color:#169BD5">{{allDetails.wholestateInfo.report_url?'点击查看':''}}</div>
              </div> -->

            <div class="rowDetail">
              <div class="rowTitle">事故描述</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.wholestateInfo.accidentReason"
                  disabled
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">结果时间</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.wholestateInfo.generalReportTime"
                  disabled
                />
              </div>
            </div>
          </div>
          <div v-else class="noContain">无</div>
        </div>
        <div class="fourthSection customerSection">
          <div class="secTitle">评估计算</div>
          <div v-if="Object.keys(allDetails.calcInfo).length > 0">
            <div class="rowDetail">
              <div class="rowTitle">产品名称</div>
              <div class="rowValue">
                <input
                  v-model="allDetails.calcInfo.productName"
                  readonly
                  @click="openProduct"
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">执行率费</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.execRate" />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">理论最高本金</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.highDebitAmt" disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">车辆分期本金</div>
              <div class="rowValue">
                <input
                  type="numner"
                  v-model="allDetails.calcInfo.carDebitAmt"
                />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">分期金额</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.signDebitAmt" disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">每月还款额</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.payPerMonth" disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">建议开票价</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.guidePrice" disabled />
              </div>
            </div>
            <div class="rowDetail">
              <div class="rowTitle">分期首付款</div>
              <div class="rowValue">
                <input v-model="allDetails.calcInfo.signFirstPay" disabled />
              </div>
            </div>
          </div>
          <div v-else class="noContain">无</div>
        </div>
      </div>
    </div>
    <!-- <div class="bottomBox" v-if="hideShow">
      <van-button class="bottom-btn" type="default" @click="codeSearch()"
        >车架号查询</van-button
      >
      <van-button class="bottom-btn" type="default" @click="historySearch()"
        >查询历史</van-button
      >
    </div> -->
    <div v-if="showReason">
      <van-dialog
        use-slot
        title="车型上报原因"
        v-model="showReason"
        :show-cancel-button="false"
        :show-confirm-button="false"
      >
        <div class="formItemBox1">
          <div class="innerBox">
            <input
              v-model="reportReason"
              placeholder="请填写车型上报原因(必填)"
            />
          </div>
        </div>
        <div class="formItemBox2">
          <div class="innerBox">
            <div class="leftBtn">
              <van-uploader
                :after-read="afterRead"
                accept="vedio/*,.mp4,.mov,.ogg"
                multiple
              >
                <van-button icon="photograph" type="primary" size="small"
                  >上传视频</van-button
                >
              </van-uploader>
              <div style="margin-left: 10px"></div>
              <van-uploader :after-read="afterRead" accept="*" multiple>
                <van-button icon="plus" type="primary" size="small"
                  >上传附件</van-button
                >
              </van-uploader>
            </div>
            <div class="rightContent">
              <div class="item" v-for="(file, index) in filesList" :key="index">
                <span>{{ index + 1 }}.{{ file.file.name }}</span>
                <van-icon name="close" @click="deleteFlie(index)" />
              </div>
            </div>
          </div>
        </div>

        <div class="confirmBox">
          <span @click="onCancel">取消</span>
          <span @click="onConfirm">上报</span>
        </div>
      </van-dialog>
    </div>
    <popSelectList
      :isVisible.sync="isPopVisible"
      :columns="popSelectList"
      @confirm="handleWinConfirm"
      label-width="100"
      :option="popOption"
    ></popSelectList>
    <!-- 时间选择 -->
    <van-popup
      v-model="showTimePop"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @change="changeFn()"
        @confirm="confirmFn()"
        @cancel="cancelFn()"
      />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "../api/index.js";
import popSelectList from "@/components/popSelectList.vue";
import { isEmpty, parseTime } from "@/utils/common.js";
export default {
  components: { popSelectList },
  data() {
    return {
      showTimePop: false,
      currentDate: new Date(),
      allDetails: {
        modelInfo: {},
        evaluateInfo: {},
        wholestateInfo: {},
      },
      loadingLock: false,
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      hideShow: true,
      showReason: false,
      reportReason: "", //车型上报原因
      filesList: [],
      filesData: "",
      isPopVisible: false,
      popSelectList: [],
      popOption: { label: "name", value: "value" },
      openFlag: 0, // 开窗类型 1申请车型  2使用性质  3省份，4城市 5产品开窗 6品牌 7系列 8车型
      // 申请车型开窗品牌，开窗系列，开窗系列选中的值
      currentCarInfo: {
        brand: "",
        series: "",
        model: "",
      },
      billId: "",
    };
  },
  created() {
    this.getDetails();
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
    showReason(n, o) {
      if (!n) {
        this.reportReason = "";
        this.filesList = [];
      }
    },
  },
  methods: {
    isEmpty,
    //获取详情
    getDetails() {
      let query = {
        vinNo: "",
        bank: "", // 贷款银行
        evaluateOrg: "",
        channelName: "", //评估渠道
        // modelId: "", // 车型id
        // modelName: "",
        // seriesId: "",
        // seriesName: "",
        // brandId: "",
        // brandName: "",
        brandDetailName: "",
        oldOwner: "",
        engineNo: "",
        base64String: "",
      };
      if (
        this.$route.params != undefined &&
        Object.keys(this.$route.params).length
      ) {
        query = Object.assign({}, query, this.$route.params);
      } else {
        this.$router.push("/");
        return;
      }
      api
        .getEvaluateDetail(query)
        .then((res) => {
          this.loadingLock = true;
          if (res.status == 1) {
            this.allDetails.applyInfo = res.applyInfo; // 估值申请信息
            // 贷款银行，评估渠道，车架号从首页带过来
            this.allDetails.applyInfo.vinNo = query.vinNo;
            this.allDetails.applyInfo.bank = query.bank;
            this.allDetails.applyInfo.channelName = query.evaluateOrg;

            this.allDetails.evaluateInfo = res.evaluateInfo; // 估值信息
            this.allDetails.wholestateInfo = res.wholestateInfo; // 车况查询
            this.allDetails.calcInfo = res.calcInfo; // 评估计算
            this.billId = res.billId; // 单据id
          } else {
            Toast.fail(res.error_msg || "系统异常！");
          }
        })
        .catch(() => {
          this.loadingLock = true;
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    viewReport(url) {
      if (!url) return;
      window.location.href = url;
    },
    // 估值查询
    evaluationSearch() {
      let query = {
        billId: this.billId,
        applyModelId: this.allDetails.applyInfo.applyModelId || "",
        applyModelName: this.allDetails.applyInfo.applyModelName || "",
        applySeriesId: this.allDetails.applyInfo.applySeriesId || "",
        applySeriesName: this.allDetails.applyInfo.applySeriesName || "",
        applyBrandId: this.allDetails.applyInfo.applyBrandId || "",
        applyBrandName: this.allDetails.applyInfo.applyBrandName || "",
        carUseType: this.allDetails.applyInfo.carUseType || "",
        provinceName: this.allDetails.applyInfo.provinceName || "",
        cityName: this.allDetails.applyInfo.cityName || "",
        cardDate: this.allDetails.applyInfo.cardDate || "",
        kms: this.allDetails.applyInfo.kms || "",
        oldOwner: this.allDetails.applyInfo.oldOwner || "",
        engineNo: this.allDetails.applyInfo.engineNo || "",
      };
      api
        .carEvaluate(query)
        .then((res) => {
          if (res.status == 1) {
            Toast.success("估值查询成功");
            // 估值查询成功之后，重新获取当前详情页面
            this.getDetails();
          }
        })
        .catch((err) => {});
    },
    // 评估计算
    handleEvaluate() {
      // if (isEmpty(this.allDetails.evaluateInfo.standardPrice)) {
      //   return Toast("请先进行估值查询！");
      // }
      // 评估计算按钮，只有基准价字段有了才能点击，否则提示“请先进行估值查询！”
      let query = {
        billId: this.billId || "",
        productName: this.allDetails.calcInfo.productName || "",
        execRate: this.allDetails.calcInfo.execRate || "",
        carDebitAmt: this.allDetails.calcInfo.carDebitAmt || "",
      };
      api
        .evaluateCalc(query)
        .then((res) => {
          if (res.status == 1) {
            Toast.success("评估计算成功");
            // 理论最高本金
            this.allDetails.calcInfo.highDebitAm = res.highDebitAmt;
            // 分期金额
            this.allDetails.calcInfo.signDebitAmt = res.signDebitAmt;
            // 每月还款额
            this.allDetails.calcInfo.payPerMonth = res.payPerMonth;
            // 建议开票价
            this.allDetails.calcInfo.guidePrice = res.suggestPrice;
            // 分期首付款
            this.allDetails.calcInfo.signFirstPay = res.signFirstPay;
            // 红线价格
            this.allDetails.calcInfo.regLinePrice = res.regLinePrice;
            // 如果评估计算出来后，建议开票价>红线价格，计算完毕后，需要弹框提示“建议开票价超限高，需降低分期金额！”
            if (
              +this.allDetails.calcInfo.guidePrice >
              +this.allDetails.calcInfo.regLinePrice
            ) {
              Toast.fail("建议开票价超限高，需降低分期金额！");
              // 建议开票价，清空
              this.allDetails.calcInfo.guidePrice = "";
            }
            console.log(
              "===>>this.allDetails.calcInfo:",
              this.allDetails.calcInfo
            );
          }
        })
        .catch((err) => {});
      // this.$router.replace({
      //   name: "Evaluate",
      //   params: formDatas,
      // });
    },
    // 评估附件
    goAttachment() {
      let postData = { billId: this.billId };
      this.$router.push({
        name: "Attachment",
        params: postData,
      });
      // this.$router.push("./attachment")
    },
    // 车况查询
    carSearch() {
      let query = {
        // vinNo: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
        // brandName: this.allDetails.modelInfo.brand_name,
        // seriesName: this.allDetails.modelInfo.series_name,
        billId: this.billId,
      };
      api.generalInfo(query).then((res) => {
        if (res.status == 1) {
          Toast.success("车况查询成功");
          // 车况查询成功之后，重新获取当前详情页面
          this.getDetails();
        } else {
          Toast.fail(error_msg);
        }
      });
    },
    onCancel() {
      this.showReason = false;
    },
    onConfirm() {
      if (this.reportReason) {
        this.carReports();
      }
    },
    carReports() {
      this.filesData = new FormData();
      let query = {
        vinNo: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
        reason: this.reportReason,
        userId: window.localStorage.getItem("vinUserId") || "",
      };
      this.filesData.append("vinNo", query.vinNo);
      this.filesData.append("reason", query.reason);
      this.filesData.append("userId", query.userId);
      this.filesList.forEach((file) => {
        let randomstr = this.randomNumber();
        this.filesData.append(`${randomstr}${file.file.name}`, file.file);
      });

      api
        .carModelReport(this.filesData)
        .then((res) => {
          if (res.status == 1) {
            Toast.success("上报成功！");
          } else {
            Toast.fail(error_msg);
          }
          this.showReason = false;
        })
        .catch(() => {
          this.showReason = false;
        });
    },
    carReport() {
      this.showReason = true;
      // reportReason
    },
    // codeSearch() {
    //   this.$router.push("/");
    // },
    // historySearch() {
    //   this.$router.replace("/list");
    // },
    showToolTip(val) {
      if (!(val === "" || val === null || val === undefined)) {
        Toast(val);
      }
    },
    afterRead(files) {
      if (files.length && files.length > 1) {
        files.forEach((file) => {
          this.filesList.push(file);
        });
      } else {
        this.filesList.push(files);
      }
    },
    randomNumber(length = 6, chars) {
      let result = "";
      let charsString =
        chars ||
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = length; i > 0; --i) {
        result += charsString[Math.floor(Math.random() * charsString.length)];
      }
      return result;
    },
    deleteFlie(index) {
      this.filesList.splice(index, 1);
    },
    // 获取申请车型：开窗选择、必填、可编辑（选择业务系统车300车型库,精真估走VIN识别接口）
    openApplyCar() {
      let channelName = this.$route.params.evaluateOrg;
      console.log("ffffff---channelName", channelName);
      if (channelName == "预评估01") {
        let query = {
          vin: this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
        };
        api
          .getJZGVinMatch(query)
          .then((res) => {
            if (res.status == 1) {
              this.openFlag = 1;
              this.popSelectList = res.styles || [];
              this.popOption = { label: "name", value: "id" };
              this.isPopVisible = true;
            } else {
              Toast.fail(error_msg);
            }
          })
          .catch(() => {});
      } else {
        this.getCarBrand();
      }
    },
    // 获取使用性质
    openUseType() {
      api
        .getCarUseType()
        .then((res) => {
          if (res.status == 1) {
            this.openFlag = 2;
            this.popSelectList = res.carUseType || [];
            this.popOption = { label: "name", value: "sortNumber" };
            this.isPopVisible = true;
          } else {
            Toast.fail(error_msg);
          }
        })
        .catch(() => {});
    },
    // 获取省份/城市
    openArea(ftype) {
      // 类别，ftype=0，则获取省份；ftype=1则获取城市
      // 查询内容,获取城市的时候，如果传入浙江，则只返回浙江的城市
      if (ftype == 1 && isEmpty(this.allDetails.applyInfo.provinceName)) {
        return Toast("请先选择省份");
      }
      let query = {
        ftype: ftype,
        filter: ftype == 1 ? this.allDetails.applyInfo.provinceName : "",
      };
      api
        .getCity(query)
        .then((res) => {
          if (res.status == 1) {
            // openFlag 3省份，4城市
            this.openFlag = ftype == 1 ? 4 : 3;
            res.record_list.forEach((item, index) => {
              item.temProp = index;
            });
            this.popSelectList = res.record_list || [];
            this.popOption =
              ftype == 1
                ? { label: "cityName", value: "cityCode" }
                : { label: "provinceName", value: "temProp" };

            this.isPopVisible = true;
          } else {
            Toast.fail(error_msg);
          }
        })
        .catch(() => {});
    },
    // 获取车辆品牌
    async getCarBrand() {
      let res = await api.getCarBrand().catch(() => {});
      if (res.status == 1) {
        this.openFlag = 6;
        this.popSelectList = res.brand_list || [];
        this.popOption = { label: "brand_name", value: "brand_id" };
        this.isPopVisible = true;
      } else {
        Toast.fail(error_msg);
      }
    },
    // 获取车辆系列
    async getCarSeries() {
      let query = {
        brandId: this.currentCarInfo.brand.brand_id,
      };
      let res = await api.getCarSeries(query).catch(() => {});
      if (res.status == 1) {
        this.openFlag = 7;
        this.popSelectList = res.series_list || [];
        this.popOption = { label: "series_name", value: "series_id" };
        this.isPopVisible = true;
      } else {
        Toast.fail(error_msg);
      }
    },
    // 获取车辆型号
    async getCarModel() {
      let query = {
        seriesId: this.currentCarInfo.series.series_id,
      };
      let res = await api.getCarModel(query).catch(() => {});
      if (res.status == 1) {
        this.openFlag = 8;
        this.popSelectList = res.model_list || [];
        this.popOption = { label: "model_name", value: "model_id" };
        this.isPopVisible = true;
      } else {
        Toast.fail(error_msg);
      }
    },
    // 获取产品开窗
    openProduct() {
      let query = {
        bank: this.allDetails.applyInfo.bank,
      };
      api
        .getProductInfo(query)
        .then((res) => {
          if (res.status == 1) {
            this.openFlag = 5;
            res.productInfo.forEach((item, index) => {
              item.temProp = index;
            });
            this.popSelectList = res.productInfo || [];
            this.popOption = { label: "name", value: "temProp" };
            this.isPopVisible = true;
          } else {
            Toast.fail(error_msg);
          }
        })
        .catch(() => {});
    },
    // 开窗点击确定
    handleWinConfirm(row) {
      // console.log("开窗点击确定", row);
      // 开窗类型 1申请车型  2使用性质  3省份 4城市 5产品开窗 6品牌 7系列 8车型
      // 1申请车型
      if (this.openFlag == 1) {
        // 品牌+系列+型号 拼接出车型
        // 如果modelName包含makeName，modelName+' '+year+'款 '+name
        // 否则 makeName+' '+modelName+' '+year+'款 '+name
        // 如果车系名称包含品牌名称，车系名称+空格+year+款+空格+车型名称
        // 否则车系名称不包含品牌名称 ，品牌名称+空格+车系名称+空格+year+款+空格+车型名称
        let currentName = "";
        if (row.modelName.indexOf(row.makeName)) {
          console.log("包含");
          currentName = row.modelName + row.year + "款" + row.name;
        } else {
          console.log("没有包含");
          currentName =
            row.makeName + row.modelName + row.year + "款" + row.name;
        }
        this.allDetails.applyInfo.applyModelName = currentName;
        this.allDetails.applyInfo.applyModelId = row.modelId;
      }
      // 2使用性质
      if (this.openFlag == 2) {
        this.allDetails.applyInfo.carUseType = row.name;
      }
      // 3省份
      if (this.openFlag == 3) {
        this.allDetails.applyInfo.provinceName = row.provinceName;
        this.allDetails.applyInfo.cityName = "";
      }
      // 4城市
      if (this.openFlag == 4) {
        this.allDetails.applyInfo.cityName = row.cityName;
      }
      // 5产品开窗
      if (this.openFlag == 5) {
        this.allDetails.calcInfo.productName = row.name;
      }
      // 6品牌
      if (this.openFlag == 6) {
        // 存下选中品牌
        this.currentCarInfo.brand = row;
        this.getCarSeries();
      }
      // 7系列
      if (this.openFlag == 7) {
        // 存下选中系列
        this.currentCarInfo.series = row;
        this.getCarModel();
      }
      // 8车型
      if (this.openFlag == 8) {
        this.currentCarInfo.model = row;
        // 品牌+系列+型号 拼接出车型
        this.allDetails.applyInfo.applyModelName = row.model_name;
        let makeName = this.currentCarInfo.brand.brand_name;
        let modelName = row.model_name;
        let year = row.model_year;
        let currentName = "";
        if (modelName.indexOf(makeName)) {
          console.log("包含");
          currentName = modelName;
        } else {
          console.log("没有包含");
          currentName = makeName + modelName;
        }
        this.allDetails.applyInfo.applyModelName = currentName;

        this.allDetails.applyInfo.applyModelId = row.model_id;
        this.allDetails.applyInfo.applySeriesId =
          this.currentCarInfo.series.series_id;
        this.allDetails.applyInfo.applySeriesName =
          this.currentCarInfo.series.series_name;
        this.allDetails.applyInfo.applyBrandId =
          this.currentCarInfo.brand.brand_id;
        this.allDetails.applyInfo.applyBrandName =
          this.currentCarInfo.brand.brand_name;
      }
    },
    // 初次上牌日期
    openTime() {
      this.showTimePop = true;
    },
    changeFn() {},
    confirmFn() {
      this.allDetails.applyInfo.cardDate = parseTime(
        this.currentDate,
        "{y}-{m}-{d}"
      );
      this.showTimePop = false;
    },
    cancelFn() {
      this.showTimePop = false;
    },
  },
};
</script>
<style scoped lang="scss">
input {
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.2rem;
  box-shadow: none; /*去除阴影*/
  outline: none; /*聚焦input的蓝色边框*/
  resize: none; /*textarea 禁止拖拽*/
  border: 0.013333rem #a9a9a9 solid; /*去除边框*/
  -webkit-appearance: none; /*常用于IOS下移除原生样式*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*点击高亮的颜色*/
  border-radius: 0.053333rem /* 4px -> .053333rem */;
}
.confirmBox {
  height: 1.066667rem /* 80px -> 1.066667rem */;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddeedd;
  span {
    width: 100%;
  }
}
.requiredMark {
  color: rgb(201, 53, 53);
  font-size: 0.026667rem /* 2px -> .026667rem */;
}
.search-btn {
  background-color: #d0c378;
}
.searchBox {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.133rem 0.3rem 0.133rem;
  background-color: white;
  align-items: center;
  position: absolute;
  z-index: 999;
}
.detail-wrap {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.allSection {
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  overflow: scroll;
  height: 100%;
}
.customerSection {
  border-bottom: 0.0133rem solid #5e79a2;
  // border-left: 0.0133rem solid #5e79a2;
  // border-right: 0.0133rem solid #5e79a2;
}

.mainContain {
  // margin-top: 0.3rem;
  flex: 1;
  overflow: hidden;
  // width: 100%;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  // padding-left: 0.2rem;
  // padding-right: 0.2rem;
  // padding-bottom: 1.5rem;
  position: relative;
  .secTitle {
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: left;
    font-size: 0.48rem;
    font-weight: bold;
    background-color: white;
    border-bottom: 0.0133rem solid #5e79a2;
  }
  .noContain {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .rowDetail {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    // border-bottom: 0.0133rem solid #5e79a2;
    text-align: left;
    .rowTitle {
      background-color: #e2eaec;
      width: 30%;
      height: 100%;
      border-right: 0.0133rem solid #5e79a2;
      padding-left: 0.133rem;
      font-weight: bold;
    }
    .rowValue {
      flex: 1;
      padding-left: 0.133rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      input {
        width: 100%;
      }
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
.formItemBox1 {
  display: flex;
  align-items: center;
  margin-top: 0.266667rem;
  margin-bottom: 0.266667rem;
  justify-content: center;
  .innerBox {
    width: 6.666667rem;
  }
}
.formItemBox2 {
  display: flex;
  align-items: center;
  justify-content: center;
  .innerBox {
    width: 6.666667rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .leftBtn {
    // width: 2.266667rem;
    display: flex;
  }
  .rightContent {
    margin-top: 0.266667rem;
    width: 5.333333rem /* 400px -> 5.333333rem */;
    max-height: 3.6rem /* 270px -> 3.6rem */;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+, edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
      // 或者 width: 0;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.666667rem /* 50px -> .666667rem */;
      span {
        width: 4.666667rem /* 350px -> 4.666667rem */;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.266667rem /* 20px -> .266667rem */;
      }
    }
  }
}
</style>
