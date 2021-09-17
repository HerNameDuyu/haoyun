# app-haoyun2333

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm  serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## config 线上配置相关

1. 线上接口修改： `.env.production` 中的 VUE_APP_SERVICE_URL 可修改请求接口地址
2. OCR图片识别图片压缩比例修改： `src/config.js` 中的 compressRadio = 0.2 表示把图片从1压缩至0.2
