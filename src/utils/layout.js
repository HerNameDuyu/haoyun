(function () {
    function resize () {
      let designWidth = 750 // 移动端设计稿标准宽度---》基于iphone6
      let baseFontSize = 100   // 设计稿100px相当于1rem， 750px --> 7.5rem ---> 各种屏幕的100%的宽度
      let width = window.innerWidth // 屏幕宽度
      let currentFontSize = (width / designWidth) * baseFontSize
      document.querySelector('html').style.fontSize = currentFontSize + 'px'
    }
    // 1.当屏幕缩小时会触发该事件
    window.onresize = function () {
      resize()
    }
    // 2.监听DOMContentLoaded事件， 当浏览器解析完文档触发该事件
    document.addEventListener('DOMContentLoaded', resize)
  }())