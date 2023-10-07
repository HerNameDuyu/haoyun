export const Throttle = (fn, interval) => {
  // last为上一次触发回调的时间
  let last = 0
  
  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
    // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
        last = now;
        fn.apply(context, args);
    }
  }
}

import Vue from "vue";
// vue自定义指令防抖
Vue.directive("throttle", {
  bind: function(el, binding, vnode) {
    let executeFunction;
    if (binding.value instanceof Array) {
      const [func, time = 1000] = binding.value
      executeFunction = Throttle(func, time)
    } else {
      executeFunction = Throttle(binding.value, 1500)
    }

    el.addEventListener('click', executeFunction);
  }
});
