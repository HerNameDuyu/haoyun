// import request from "../utils/Axios.js"
// 数据格式
export default {
    // 接口测试
    testapi(data=1,userId=1012) {
      return this.$http({
        url: `API_Evaluate_OcrDiscern?driveData=${data}&userId=${{userId}}`,
        method: "get"
      });
    },
}