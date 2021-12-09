import request from "../utils/Axios.js"
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
      let data = ''
      for(let i in query){
        data += `&${i}=${query[i]}`
      }
      data = data.slice(1);
      return  request({
        url: 'API_Evaluate_OcrDiscern',
        method: "post",
        data:data
      });
    },
    //根据车架号搜索查询
    matchCar(query){
      return request({
        url: `API_Evaluate_VinMatch`,
        method: "get",
        params:{...query}
      })
    },
    // matchCar(query){
    //   return request({
    //     url: 'API_Evaluate_VinMatch',
    //     method: "post",
    //     data:{...query}
    //   })
    // },
    //获取查询历史
    getHistorySerch(query){
      return request({
        url: 'API_Evaluate_QueryHistory',
        method: "get",
        params: {...query}
      })
    },
    // getHistorySerch(query){
    //   return request({
    //     url: 'API_Evaluate_QueryHistory',
    //     method: "post",
    //     data:{...query}
    //   })
    // },
    //获取详情接口
    getDetais(query){
      return request({
        url: `API_Evaluate_VinQuery`,
        method: "get",
        params: {...query}
      })
    },
    // getDetais(query){
    //   return request({
    //     url: 'API_Evaluate_VinQuery',
    //     method: "post",
    //     data:{...query}
    //   })
    // },
    //车型上报
    carModelReport(query){
      return request({
        type:1,
        headers,
        url: `API_Evaluate_CarModelReportNew`,
        method: "post",
        data:query
      })
    },
    // carModelReport(files){
    //   return request({
    //     type:1,
    //     headers,
    //     url: `API_Evaluate_CarModelReportNew?userId=4827&vinNo=LVHRW1867K7079822`,
    //     method: "post",
    //     data: files
    //   })
    // },
    //车况查询
    generalInfo(query){
      return request({
        url: `API_Evaluate_CarGeneralInfo`,
        method: "get",
        params:{...query}
      })
    },
    // generalInfo(query){
    //   return request({
    //     url: 'API_Evaluate_CarGeneralInfo',
    //     method: "post",
    //     data:{...query}
    //   })
    // },
    //车辆评估接口
    evaluate(query){
      return request({
        url: 'API_Evaluate_CarEvaluate',
        method: "get",
        params:{...query}
      })
    },
    // evaluate(query){
    //   return request({
    //     url: 'API_Evaluate_CarEvaluate',
    //     method: "post",
    //     data:{...query}
    //   })
    // },
    //获取省份和城市
    getCity(query){
      return request({
        url: 'API_Evaluate_GetCityInfo',
        method: "get",
        params:{...query}
      })
    },
    // getCity(query){
    //   return request({
    //     url: 'API_Evaluate_GetCityInfo',
    //     method: "post",
    //     data:{...query}
    //   })
    // }

}