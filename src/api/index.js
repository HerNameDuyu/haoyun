import request from "../utils/Axios.js";
const headers = { "Content-Type": "multipart/form-data" };
// 数据格式
export default {
  // 行驶证ocr识别
  // ocrDiscern(query) {
  //   return  request({
  //     url: `API_Evaluate_OcrDiscern`,
  //     method: "get",
  //     params: {...query}
  //   });
  // },
  ocrDiscern(query) {
    let data = "";
    for (let i in query) {
      data += `&${i}=${query[i]}`;
    }
    data = data.slice(1);
    return request({
      url: "API_Evaluate_OcrDiscern",
      method: "post",
      data: data,
    });
  },
  //根据车架号搜索查询
  matchCar(query) {
    return request({
      url: `API_Evaluate_VinMatch`,
      method: "get",
      params: { ...query },
    });
  },
  // matchCar(query){
  //   return request({
  //     url: 'API_Evaluate_VinMatch',
  //     method: "post",
  //     data:{...query}
  //   })
  // },
  // 首页【查询按钮】跳转车辆评估详情
  getEvaluateDetail(query) {
    let data = "";
    for (let i in query) {
      data += `&${i}=${query[i]}`;
    }
    data = data.slice(1);
    return request({
      url: `API_Evaluate_VinQuery`,
      method: "post",
      data: data,
    });
  },
  // 根据vin匹配车型信息
  getJZGVinMatch(query) {
    return request({
      url: `API_Evaluate_JZGVinMatch`,
      method: "get",
      params: { ...query },
    });
  },
  // 获取车辆品牌接口
  getCarBrand(query) {
    return request({
      url: `API_Evaluate_GetCarBrandList `,
      method: "get",
      params: { ...query },
    });
  },
  // 获取车辆系列接口
  getCarSeries(query) {
    return request({
      url: `API_Evaluate_GetCarSeriesList`,
      method: "get",
      params: { ...query },
    });
  },
  // 获取车辆型号接口
  getCarModel(query) {
    return request({
      url: `API_Evaluate_GetCarModelList`,
      method: "get",
      params: { ...query },
    });
  },
  // 获取车辆使用性质
  getCarUseType(query) {
    return request({
      url: `API_Evaluate_GetCarUseType`,
      method: "get",
      params: { ...query },
    });
  },
  // 查看评估附件
  getFileInfo(query) {
    return request({
      url: `API_Evaluate_GetFileInfo `,
      method: "get",
      params: { ...query },
    });
  },

  //获取查询历史
  getHistorySerch(query) {
    return request({
      url: "API_Evaluate_QueryHistory",
      method: "get",
      params: { ...query },
    });
  },
  // getHistorySerch(query){
  //   return request({
  //     url: 'API_Evaluate_QueryHistory',
  //     method: "post",
  //     data:{...query}
  //   })
  // },
  // 获取贷款银行+评估渠道
  getBankOrg(query) {
    return request({
      url: `API_Evaluate_GetBankOrg`,
      method: "get",
      params: { ...query },
    });
  },
  // 获取产品
  getProductInfo(query) {
    return request({
      url: `API_Evaluate_GetProductInfo`,
      method: "get",
      params: { ...query },
    });
  },
  // 评估计算接口
  evaluateCalc(query) {
    return request({
      url: `API_Evaluate_EvaluateCalc`,
      method: "get",
      params: { ...query },
    });
  },
  // 上传评估附件
  uploadFileInfo(query) {
    // let data = "";
    // for (let i in query) {
    //   data += `&${i}=${query[i]}`;
    // }
    // data = data.slice(1);
    // return request({
    //   url: `API_Evaluate_UploadFileInfo`,
    //   method: "post",
    //   data: data,
    // });

    return request({
      url: `API_Evaluate_UploadFileInfo`,
      type: 1,
      headers,
      method: "post",
      data: query,
    });
  },
  // 查看附件多图详情接口
  getMoreFileInfo(query) {
    return request({
      url: `API_Evaluate_GetMoreFileInfo`,
      method: "get",
      params: { ...query },
    });
  },
  // 附件删除
  deleteFileInfo(query) {
    return request({
      url: `API_Evaluate_DeleteFileInfo`,
      method: "get",
      params: { ...query },
    });
  },

  // 估值查询【按钮】
  carEvaluate(query) {
    return request({
      url: `API_Evaluate_CarEvaluate`,
      method: "get",
      params: { ...query },
    });
  },
  



  //车型上报
  carModelReport(query) {
    return request({
      type: 1,
      headers,
      url: `API_Evaluate_CarModelReportNew`,
      method: "post",
      data: query,
    });
  },
  //车况查询
  generalInfo(query) {
    return request({
      url: `API_Evaluate_CarGeneralInfo`,
      method: "get",
      params: { ...query },
    });
  },
  // generalInfo(query){
  //   return request({
  //     url: 'API_Evaluate_CarGeneralInfo',
  //     method: "post",
  //     data:{...query}
  //   })
  // },
  //车辆评估接口
  evaluate(query) {
    return request({
      url: "API_Evaluate_CarEvaluate",
      method: "get",
      params: { ...query },
    });
  },
  // evaluate(query){
  //   return request({
  //     url: 'API_Evaluate_CarEvaluate',
  //     method: "post",
  //     data:{...query}
  //   })
  // },
  //获取省份和城市
  getCity(query) {
    return request({
      url: "API_Evaluate_GetCityInfo",
      method: "get",
      params: { ...query },
    });
  },
  // getCity(query){
  //   return request({
  //     url: 'API_Evaluate_GetCityInfo',
  //     method: "post",
  //     data:{...query}
  //   })
  // }
};
