import axios from 'axios'
import { Toast } from 'vant';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求是不存在的，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
let query = window.location.search;
query = query.slice(1);
let arr = query.split('&');
let vinUserId = '';
arr.forEach((item) => {
  if(item.includes('FUserID')){
    vinUserId = item.split('=')[1];
    window.localStorage.setItem('vinUserId',vinUserId);
  }
})
if(!vinUserId){
  console.log('用户内码为空')
}
const baseURL = process.env.NODE_ENV == 'development' ? '/api' : process.env.VUE_APP_SERVICE_URL;
const userId = window.localStorage.getItem('vinUserId') || '';
const service = axios.create({
  baseURL :baseURL
})
// 请求拦截器
service.interceptors.request.use(
    config => {
      let contentType = ''
      if (config.method == 'post') {
        // contentType = 'application/json'
        // contentType = 'text/json; charset=UTF-8'
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
      } else {
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
      }  
      const header = {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType,
      }
      const head = Object.assign(config.headers,header);
      config.headers = head
      // do something before request is sent
      if(config.method == ('post' || 'POST')){
      //  config.data = Object.assign(config.data,{userId:userId});
      //  config.data = JSON.stringify(Object.assign(config.data,{userId:userId}));
      config.data += `&userId=${userId}`
      }
      if(config.method == ('get' || 'GET')){
        config.params = Object.assign(config.params,{userId:userId});
        // config.headers['Content-Type'] = 'application/json'
      }
      return config;
    },
    error => {
      // do something with request error
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  service.interceptors.response.use(
    response => {
      // 正常响应
      const res = response.data;
      // 消息模板配置-云片平台返回有 10000、400 的状态
      if (Number(res.status) != 1 ) {
        console.log('reject:', res.error_msg) // for debug
        Toast.fail(res.error_msg)
        return Promise.reject(res.error_msg || 'Error');
      } else {
        return res;
      }
    },
    error => {
      // 响应异常
      console.log('error:' + error) // for debug
      Toast.fail("系统异常")
      // return Promise.reject(error);
    }
  );


//第二种方法
const instance = axios.create({
    baseURL : baseURL
  })
class Request {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.queue = {}
    this.timeout = 5000
  }
  // 检查返回状态
  checkStatus (response) {
    const responseData = response.data
    // 服务器返回默认结果
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      // 后台自定义错误
      // 正常
      if (responseData.status == 0) {
        return responseData
      }
      // 登录过期
      if (responseData.errorCode === 402 || responseData.status === 401) {
        return Promise.reject(errorText)
      }
      return Promise.reject(responseData)
    }
    // 服务器错误
    const errorText = response && (codeMessage[response.status] || response.statusText)
    Promise.reject(response)
  }
  // 拦截器
  interceptors (instance, scope) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      config.baseURL = baseURL;
      config.scope = scope
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      return res
    }, error => {
      let errorInfo = error.response
      if (!errorInfo) {
        try {
          const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          }
        } catch (e) {
          errorInfo = error
        }
      }
      return Promise.reject(errorInfo)
    })
  }
  // 失败
  error (e) {
    return Promise.reject(e)
  }

  setRequest (method, url, data, scope, file = false) {
    this.interceptors(instance, scope)
    const options = { method, url }
    data.userId = userId;
    let contentType = ''
    if (file) {
      contentType = 'multipart/form-data'
    } else if (method == 'post') {
      contentType = 'application/json'
    } else {
      contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
      // token: store.state.user.token || 1
    }
    Object.assign(options, {
      headers,
      [method == 'post' ? 'data' : 'params']: data
    })

    return instance(options).then(this.checkStatus).catch(this.error)
  }
  // post 请求封装
  post (url, data, scope) {
    return this.setRequest('post', url, data, scope)
  }
  // get  请求封装
  get (url, data, scope) {
    return this.setRequest('get', url, data, scope)
  }
  // post 请求封装
  POST (url, data, scope) {
    return this.setRequest('post', url, data, scope).then(this.success)
  }
  // get  请求封装
  GET (url, data, scope) {
    return this.setRequest('get', url, data, scope).then(this.success)
  }
  // 文件
  File (url, data, scope) {
    return this.setRequest('post', url, data, scope, true).then(this.fileSuccess)
  }

  success (da) {
    return da.data
  }
  
  fileSuccess (da) {
    return da
  }
}
const request = new Request(baseURL)


export default service