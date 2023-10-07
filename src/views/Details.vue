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
          v-throttle="
            () => {
              evaluationSearch(), 1000;
            }
          "
          :disabled="allDetails.evaluateInfo.buttonEnable == 1"
          >估值查询</van-button
        >
        <van-button
          type="info"
          size="small"
          v-throttle="
            () => {
              carSearch(), 1000;
            }
          "
          :disabled="allDetails.wholestateInfo.buttonEnable == 1"
          >正式评估</van-button
        >
        <van-button
          type="info"
          size="small"
          v-throttle="
            () => {
              handleEvaluate(), 1000;
            }
          "
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
            <van-form ref="formRef1">
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.bank"
                  label="贷款银行："
                  readonly
                  disabled
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.channelName"
                  label="评估渠道："
                  readonly
                  disabled
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.vinNo"
                  label="车架号："
                  readonly
                  disabled
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.applyModelName"
                  label="申请车型："
                  required
                  readonly
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                  @focus="showToolTip(allDetails.applyInfo.applyModelName)"
                  @click="openApplyCar"
                  :rules="[{ required: true, message: '请输入申请车型' }]"
                />
                <!-- <div class="triangle"></div> -->
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.carUseType"
                  label="使用性质："
                  readonly
                  required
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                  @click="openUseType"
                  :rules="[{ required: true, message: '请输入使用性质' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.provinceName"
                  label="所在省份："
                  readonly
                  required
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                  @click="openArea(0)"
                  :rules="[{ required: true, message: '请输入所在省份' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.cityName"
                  label="所在城市："
                  required
                  readonly
                  :disabled="
                    isEmpty(allDetails.applyInfo.provinceName) ||
                    allDetails.evaluateInfo.frameEnable == 1
                  "
                  :label-width="100"
                  @click="openArea(1)"
                  :rules="[{ required: true, message: '请输入所在城市' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.cardDate"
                  label="初次上牌日期："
                  required
                  readonly
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                  @click="openTime()"
                  :rules="[{ required: true, message: '请输入初次上牌日期' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  name="kms"
                  v-model="allDetails.applyInfo.kms"
                  label="行驶里程："
                  required
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                  :rules="[{ required: true, message: '请输入行驶里程' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.oldOwner"
                  label="原车主："
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.applyInfo.engineNo"
                  label="发动机号："
                  :disabled="allDetails.evaluateInfo.frameEnable == 1"
                  :label-width="100"
                />
              </div>
            </van-form>
          </div>
          <div v-else class="noContain">无</div>
        </div>
        <div class="secondSection customerSection">
          <div class="secTitle">估值信息</div>
          <div v-if="Object.keys(allDetails.evaluateInfo).length > 0">
            <div class="rowDetail">
              <!-- <div class="rowTitle">估值报告</div>
                <div
                  class="rowValue"
                  @click="viewReport(allDetails.evaluateInfo.evaluateReportURL)"
                  style="color: #169bd5"
                >
                  {{
                    allDetails.evaluateInfo.evaluateReportURL ? "点击查看" : ""
                  }}
                </div> -->

              <!-- <van-field
                v-model="allDetails.evaluateInfo.evaluateReportURLText"
                label="估值报告："
                readonly
                @click="viewReport(allDetails.evaluateInfo.evaluateReportURL)"
                :label-width="100"
              /> -->
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.standardPrice"
                label="基准价："
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.resultBrandName"
                label="品牌："
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.resultSeriesName"
                label="车系："
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.resultModelName"
                label="车型："
                disabled
                :label-width="100"
                @focus="showToolTip(allDetails.evaluateInfo.resultModelName)"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.carNature"
                label="类型："
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.guidePrice"
                label="新车指导价："
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.evaluateInfo.evaluateReportTime"
                label="查询结果时间："
                disabled
                :label-width="100"
              />
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
              <!-- <div class="rowTitle">是否事故车</div>
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
              <div class="rowValue" v-else></div> -->
              <van-field
                v-model="allDetails.wholestateInfo.isAccidentCarText"
                label="是否事故车："
                readonly
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.wholestateInfo.accidentReason"
                label="事故描述："
                readonly
                disabled
                :label-width="100"
              />
            </div>
            <div class="rowDetail">
              <van-field
                v-model="allDetails.wholestateInfo.generalReportTime"
                label="查询结果时间："
                readonly
                disabled
                :label-width="100"
              />
            </div>
          </div>
          <div v-else class="noContain">无</div>
        </div>
        <div class="fourthSection customerSection">
          <div class="secTitle">评估计算</div>
          <div v-if="Object.keys(allDetails.calcInfo).length > 0">
            <van-form ref="formRef4">
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.calcInfo.productName"
                  label="产品名称："
                  required
                  readonly
                  @click="openProduct"
                  :label-width="100"
                  :rules="[{ required: true, message: '请输入产品名称' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  required
                  v-model="allDetails.calcInfo.execRate"
                  label="执行费率："
                  :label-width="100"
                  :rules="[{ required: true, message: '请输入执行费率' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  required
                  v-model="allDetails.calcInfo.carDebitAmt"
                  label="车辆分期本金："
                  :label-width="100"
                  :rules="[{ required: true, message: '请输入车辆分期本金' }]"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  v-model="allDetails.calcInfo.highDebitAmt"
                  label="理论最高本金："
                  :label-width="100"
                  disabled
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  v-model="allDetails.calcInfo.period"
                  label="分期期数："
                  :label-width="100"
                  disabled
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  v-model="allDetails.calcInfo.signDebitAmt"
                  disabled
                  label="分期金额："
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  v-model="allDetails.calcInfo.payPerMonth"
                  disabled
                  label="每月还款额："
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  v-model="allDetails.calcInfo.suggestPrice"
                  disabled
                  label="建议开票价："
                  :label-width="100"
                />
              </div>
              <div class="rowDetail">
                <van-field
                  type="number"
                  v-model="allDetails.calcInfo.signFirstPay"
                  disabled
                  label="分期首付款："
                  :label-width="100"
                />
              </div>
            </van-form>
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
      :showSearch.sync="showSearch"
      :customized="customized"
      @fetchList="handleSerch"
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
        :min-date="minDate"
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
import "@/utils/throttle.js";
export default {
  components: { popSelectList },
  data() {
    return {
      showTimePop: false,
      currentDate: new Date(),
      allDetails: {
        applyInfo: {
          kms: "",
        },
        calcInfo: {},
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
      customized: false, // 是否自定义开窗选择器类型，目前只有申请车型时自定义
      // 申请车型开窗品牌，开窗系列，开窗系列选中的值
      currentCarInfo: {
        brand: "",
        series: "",
        model: "",
      },
      billId: "",
      showSearch: false, // 开窗是否显示搜索
      minDate: new Date(2000, 0, 1),
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
    showReason(n, o) {
      if (!n) {
        this.reportReason = "";
        this.filesList = [];
      }
    },
    $route: {
      immediate: true,
      handler(to, from) {
        let query = {
          vinNo:
            this.$route.params.vinNo || window.localStorage.getItem("vinNo"),
          bank: "", // 贷款银行
          evaluateOrg: "", //评估渠道
          brandDetailName: "",
          oldOwner: "",
          engineNo: "",
          base64String: "",
          cardDate: "",
        };
        let lastName = from?.name || "Entry";
        // 如果是从首页进入该页面,重新获取页面数据
        if (Object.keys(to.params).length !== 0 && lastName === "Entry") {
          let params = this.$route.params;
          if (params != undefined && Object.keys(params).length) {
            query = Object.assign({}, query, params);
          }
          this.getDetails(query);
        }
      },
    },
  },
  methods: {
    isEmpty,
    //获取详情
    getDetails(query) {
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
            // 初次上牌日期（日期转换 cardDate）

            this.allDetails.evaluateInfo = res.evaluateInfo; // 估值信息
            this.allDetails.evaluateInfo.evaluateReportURLText = isEmpty(
              this.allDetails.evaluateInfo.evaluateReportURL
            )
              ? ""
              : "点击查看";
            this.allDetails.wholestateInfo = res.wholestateInfo; // 车况查询
            // 是否车况查询
            if (this.allDetails.wholestateInfo.isAccidentCar == "1") {
              this.allDetails.wholestateInfo.isAccidentCarText = "是";
            } else if (this.allDetails.wholestateInfo.isAccidentCar == "0") {
              this.allDetails.wholestateInfo.isAccidentCarText = "否";
            } else {
              this.allDetails.wholestateInfo.isAccidentCarText = "";
            }

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
      this.$refs.formRef1
        .validate()
        .then((valid) => {
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
          if (+this.allDetails.applyInfo.kms < 50) {
            return Toast.fail("公里数必须大于等于50公里！");
          }
          api
            .carEvaluate(query)
            .then((res) => {
              if (res.status == 1) {
                Toast.success("估值查询成功");
                // 估值查询成功之后，重新获取当前详情页面
                let query = {
                  vinNo:
                    this.allDetails.applyInfo.vinNo ||
                    this.$route.params.vinNo ||
                    window.localStorage.getItem("vinNo"),
                  bank: this.allDetails.applyInfo.bank || "", // 贷款银行
                  evaluateOrg: this.allDetails.applyInfo.channelName || "", //评估渠道
                  brandDetailName: this.$route.params.brandDetailName || "",
                  oldOwner: this.allDetails.applyInfo.oldOwner || "",
                  engineNo: this.allDetails.applyInfo.engineNo || "",
                  base64String: this.$route.params.base64String || "",
                  cardDate: this.allDetails.applyInfo.cardDate || "",
                  applyModelId: this.allDetails.applyInfo.applyModelId || "",
                };
                this.getDetails(query);
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log("校验错误结果", err);
          Toast.fail(err[0].message || "请输入评估申请信息中的必填项");
        });
    },
    // 评估计算
    handleEvaluate() {
      this.$refs.formRef4
        .validate()
        .then((valid) => {
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
                this.allDetails.calcInfo.suggestPrice = res.suggestPrice;
                // 分期首付款
                this.allDetails.calcInfo.signFirstPay = res.signFirstPay;
                // 红线价格
                this.allDetails.calcInfo.regLinePrice = res.regLinePrice;
                // 如果评估计算出来后，建议开票价>红线价格，计算完毕后，需要弹框提示“建议开票价超限高，需降低分期金额！”
                if (
                  +this.allDetails.calcInfo.suggestPrice >
                  +this.allDetails.calcInfo.regLinePrice
                ) {
                  Toast.fail("建议开票价超限高，需降低分期金额！");
                  // 建议开票价，清空
                  // this.allDetails.calcInfo.suggestPrice = "";
                }
                // 评估计算之后，重新获取当前详情页面
                let query = {
                  vinNo:
                    this.allDetails.applyInfo.vinNo ||
                    this.$route.params.vinNo ||
                    window.localStorage.getItem("vinNo"),
                  bank: this.allDetails.applyInfo.bank || "", // 贷款银行
                  evaluateOrg: this.allDetails.applyInfo.channelName || "", //评估渠道
                  brandDetailName: this.$route.params.brandDetailName || "",
                  oldOwner: this.allDetails.applyInfo.oldOwner || "",
                  engineNo: this.allDetails.applyInfo.engineNo || "",
                  base64String: this.$route.params.base64String || "",
                  cardDate: this.allDetails.applyInfo.cardDate || "",
                  applyModelId: this.allDetails.applyInfo.applyModelId || "",
                };
                this.getDetails(query);
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log("校验错误结果", err);
          Toast.fail(err[0].message || "请输入评估计算中的必填项");
        });
      // if (isEmpty(this.allDetails.evaluateInfo.standardPrice)) {
      //   return Toast("请先进行估值查询！");
      // }

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
      if (isEmpty(this.allDetails.calcInfo.suggestPrice)) {
        return Toast.fail("建议开票价不能为空");
      }
      let query = {
        billId: this.billId,
      };
      api.generalInfo(query).then((res) => {
        if (res.status == 1) {
          Toast.success(res.note || "正式评估成功");
          // 车况查询成功之后，重新获取当前详情页面
          let query = {
            vinNo:
              this.allDetails.applyInfo.vinNo ||
              this.$route.params.vinNo ||
              window.localStorage.getItem("vinNo"),
            bank: this.allDetails.applyInfo.bank || "", // 贷款银行
            evaluateOrg: this.allDetails.applyInfo.channelName || "", //评估渠道
            brandDetailName: this.$route.params.brandDetailName || "",
            oldOwner: this.allDetails.applyInfo.oldOwner || "",
            engineNo: this.allDetails.applyInfo.engineNo || "",
            base64String: this.$route.params.base64String || "",
            cardDate: this.allDetails.applyInfo.cardDate || "",
            applyModelId: this.allDetails.applyInfo.applyModelId || "",
          };
          this.getDetails(query);
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
        vinNo:
          this.allDetails.applyInfo.vinNo ||
          this.$route.params.vinNo ||
          window.localStorage.getItem("vinNo"),
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
      if (this.allDetails.evaluateInfo.frameEnable == 1) {
        return;
      }
      let channelName = this.$route.params.evaluateOrg;
      if (channelName == "预评估01") {
        let query = {
          vin:
            this.allDetails.applyInfo.vinNo ||
            this.$route.params.vinNo ||
            window.localStorage.getItem("vinNo"),
        };
        api
          .getJZGVinMatch(query)
          .then((res) => {
            if (res.status == 1) {
              this.openFlag = 1;
              this.customized = true;
              this.popSelectList = res.styles || [];
              // 拼接长名字 fullName
              this.popSelectList.forEach((row) => {
                if (row.modelName.indexOf(row.makeName)) {
                  row.fullName = `${row.modelName} ${row.year}款 ${row.name}`;
                } else {
                  row.fullName = `${row.makeName} ${row.modelName} ${row.year}款 ${row.name}`;
                }
              });
              this.popOption = { label: "fullName", value: "id" };
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
      if (this.allDetails.evaluateInfo.frameEnable == 1) {
        return;
      }
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
      if (this.allDetails.evaluateInfo.frameEnable == 1) {
        return;
      }
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
    async getCarBrand(filter = "") {
      let query = {
        filter: filter,
      };
      let res = await api.getCarBrand(query).catch((err) => {
        Toast.fail(err || "系统异常");
      });
      if (res.status == 1) {
        this.openFlag = 6;
        this.showSearch = true;
        this.popSelectList = res.brand_list || [];
        this.popOption = { label: "brand_name", value: "brand_id" };
        this.isPopVisible = true;
      } else {
        Toast.fail("系统异常");
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
    // 开窗搜索
    handleSerch(searchValue) {
      // 品牌开窗
      if (this.openFlag == 6) {
        this.getCarBrand(searchValue);
      }
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
          currentName = `${row.modelName} ${row.year}款 ${row.name}`;
        } else {
          console.log("没有包含");
          currentName = `${row.makeName} ${row.modelName} ${row.year}款 ${row.name}`;
        }
        this.allDetails.applyInfo.applyModelName = currentName;
        this.allDetails.applyInfo.applyModelId = row.id;
        this.allDetails.applyInfo.applyBrandId = row.makeId;
        this.allDetails.applyInfo.applyBrandName = row.makeName;
        this.allDetails.applyInfo.applySeriesId = row.modelId;
        this.allDetails.applyInfo.applySeriesName = row.modelName;
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
        this.allDetails.calcInfo.period = row.period;
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
      if (this.allDetails.evaluateInfo.frameEnable == 1) {
        return;
      }
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
.rowDetail::v-deep .van-field__value {
  // border: 1px solid #ccc;
  font-size: small;
  height: 0.8rem;
  line-height: 0.8rem;
  // border: 1px #a9a9a9 solid; /*去除边框*/
  margin-bottom: 4px;
  input {
    // height: 0.8rem;
    // line-height: 0.8rem;
    // margin: 0.05rem;
    padding-left: 0.2rem;
    box-shadow: none; /*去除阴影*/
    outline: none; /*聚焦input的蓝色边框*/
    resize: none; /*textarea 禁止拖拽*/
    border: 1.5px #a9a9a9 solid; /*去除边框*/
    -webkit-appearance: none; /*常用于IOS下移除原生样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*点击高亮的颜色*/
    border-radius: 0;
  }
}
.rowDetail::v-deep .van-cell {
  padding: 0rem 0.42667rem;
  // display: flow-root;
}
.rowDetail::v-deep .van-field__label {
  // background-color: #e2eaec;
  // width: 30%;
  // height: 100%;
  // border-right: 0.0133rem solid #5e79a2;
  padding-left: 0.133rem;
  font-weight: bold;
  font-size: smaller;
  background-color: #e2eaec;
  border-right: 0.0133rem solid #5e79a2;
  // height: 0.8rem;
  line-height: 0.8rem;
}
.rowDetail::v-deep .van-field--disabled .van-field__label {
  color: #646566;
}
.rowDetail::v-deep .van-field__control:disabled {
  background-color: rgba(0, 0, 0, 0.04);
  color: #000;
  opacity: 1;
  -webkit-text-fill-color: #000; // ios 和 安卓9.0 必须添加此属性，才会生效
  -webkit-opacity: 1;
  // input{
  //   border: 1px solid #DDD;
  //   background-color: #F5F5F5;
  //   color:#ACA899;
  // }
}
// /deep/.van-field__control:disabled,
//   /deep/.van-field__control[disabled] {
//     color: #000;
//     opacity: 1;
//     -webkit-text-fill-color: #000; // ios 和 安卓9.0 必须添加此属性，才会生效
//     -webkit-opacity: 1;
//   }
// 必填校验的*号
::v-deep .van-cell--required {
  &:before {
    // content: "*";
    top: 0.15rem;
  }
  // .van-cell__title.van-field__label {
  //   span {
  //     position: relative;
  //     &:before {
  //       position: absolute;
  //       right: -8px;
  //       color: red;
  //       font-size: 14px;
  //       content: "*";
  //     }
  //   }
  // }
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
  height: 100%;
  // overflow: scroll;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+, edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.customerSection {
  // border-bottom: 0.0133rem solid #5e79a2;
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
    // border-bottom: 0.0133rem solid #5e79a2;
  }
  .noContain {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  // .rowDetail {
  //   width: 100%;
  //   height: 0.8rem;
  //   line-height: 0.8rem;
  //   display: flex;
  //   // border-bottom: 0.0133rem solid #5e79a2;
  //   text-align: left;
  //   .rowTitle {
  //     background-color: #e2eaec;
  //     width: 30%;
  //     height: 100%;
  //     border-right: 0.0133rem solid #5e79a2;
  //     padding-left: 0.133rem;
  //     font-weight: bold;
  //   }
  //   .rowValue {
  //     flex: 1;
  //     padding-left: 0.133rem;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;

  //     border: 1px solid #ededed;
  //     display: flex;
  //     justify-content: center;
  //     input {
  //       width: 100%;
  //     }
  //   }
  // }
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
.triangle {
  width: 0;
  height: 0;
  border: 0.1rem /* 3px -> .04rem */ solid;
  border-color: #000 transparent transparent;
  position: absolute;
  right: 0.16rem /* 5px -> .066667rem */;
  top: 50%;
  transform: translateY (-50%);
}
</style>
