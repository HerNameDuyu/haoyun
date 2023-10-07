module.exports = {
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: {
    '^/api': {
      // 测试环境
      target: 'http://121.199.47.188:8000/FaceView.asmx', 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/api': '' // 需要rewrite重写的,  // /mock
      }
    }
  }
}