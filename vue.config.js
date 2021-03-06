
const path = require('path')
// const SpritesmithPlugin = require('webpack-spritesmith')// 雪碧图
const TerserPlugin = require('terser-webpack-plugin')
const devServer = require('./server')
// const CompressionPlugin = require('compression-webpack-plugin')

const cdn = {
  // 开发环境
  dev: {
    css: [
    ],
    js: [
    ]
  },
  // 生产环境
  build: {
    css: [
    ],
    js: [
      'https://lib.baomitu.com/vue/2.6.11/vue.min.js',
      'https://lib.baomitu.com/vue-router/3.2.0/vue-router.min.js',
      'https://lib.baomitu.com/vuex/3.4.0/vuex.min.js',
      'https://lib.baomitu.com/axios/0.21.4/axios.min.js',
      'https://lib.baomitu.com/hls.js/0.14.3/hls.min.js'
    ]
  }
}
// 打包排除包，通过cdn加载
const externals = {
  'vue': 'Vue',
  'vuex': 'Vuex',
  'axios': 'axios',
  'hls.js': 'hls.js',
  'vue-router': 'VueRouter'
}
// 雪碧图的自定义模板
const templateFunction = function (data) {
  var shared = '.icon-sprite { display: inline-block; background-image: url(I); background-size: Dpx Hpx; }'
    .replace('I', data.sprites[0].image)
    .replace('D', data.sprites[0].total_width / 2)
    .replace('H', data.sprites[0].total_height / 2)


  var perSprite = data.sprites.map(function (sprite) {
    return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name.replace(/_/g, '-'))
      .replace('W', sprite.width / 2)
      .replace('H', sprite.height / 2)
      .replace('X', sprite.offset_x / 2)
      .replace('Y', sprite.offset_y / 2)
  }).join('\n')
  return shared + '\n' + perSprite
}
const configureWebpackData = {
  resolve: {
    alias: {
      // 别名
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@api': resolve('src/api'),
      '@utils': resolve('src/utils'),
      '@style': resolve('src/assets/css'),
      '@images': resolve('src/assets/images'),
      '@views': resolve('src/views')
    }
  },
  plugins: [
    // new SpritesmithPlugin({
    //   src: {
    //     cwd: path.resolve(__dirname, './src/assets/icon'),
    //     glob: '*.png'
    //   },
    //   target: { // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式
    //     image: path.resolve(__dirname, './src/assets/images/sprite.png'),
    //     css: [
    //       [path.resolve(__dirname, './src/assets/css/sprite.less'), {
    //         // 引用自己的模板
    //         format: 'function_based_template'
    //       }]
    //     ]
    //   },
    //   customTemplates: { // 自定义模板入口
    //     function_based_template: templateFunction
    //   },
    //   apiOptions: { // 样式文件中调用雪碧图地址写法
    //     cssImageRef: '../images/sprite.png'
    //   },
    //   spritesmithOptions: { // 让合成的每个图片有一定的距离
    //     padding: 20
    //   }
    // })
  ]
}
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  outputDir: "dist",
  assetsDir: 'assets',
  publicPath: './',
  pages: {
    index: {
      entry: './src/main.js',
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      cdn: process.env.VUE_APP_NODE_ENV === 'production' && cdn.build || cdn.dev,
      title: '  '
    },
  },
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '^/api': {
        // 测试环境
        target: 'http://47.111.174.239:8000/FaceView.asmx', 
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 需要rewrite重写的,  // /mock
        }
      }
    }
  },
  configureWebpack: config => {
    configureWebpackData.externals = process.env.VUE_APP_NODE_ENV === 'production' && externals || {};
    // if (process.env.VUE_APP_NODE_ENV === 'production' || process.env.VUE_APP_NODE_ENV === 'devproduction') {
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    // }

    return configureWebpackData
  },
  chainWebpack: config => {
    config.output.filename('assets/js/[name].[hash].js').end()
    config.output.chunkFilename('assets/js/[name].[hash].js').end()
  },
  productionSourceMap: false,
  css: {
    // extract: true,
    sourceMap: false,
    // modules: false,
    requireModuleExtension: true,
    loaderOptions: {
    }
  }
}

