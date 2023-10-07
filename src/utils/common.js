/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
import config from "../config.js";
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}
// 判空
export function isEmpty(value) {
  // if (val === "" || val === undefined || val === null) {
  //   return true;
  // } else {
  //   return false;
  // }
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === "string" && !value) {
    return true;
  }
  if (Array.isArray(value) && !value.length) {
    return true;
  }
  if (typeof value === "object" && !Object.keys(value).length) {
    return true;
  }
  return false;
}

//接口图片上限是1.5MB,对大于1MB的图片进行压缩
export function compressFile(imgUrlBase) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imgUrlBase;
    // console.log("*******未压缩前的图片大小XX KB********",imgUrlBase.length/1024)
    // console.log("*******未压缩前的图片大小XX M********",imgUrlBase.length/1024/1024)
    let that = this;
    image.onload = function () {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // let width = Math.min(config.imgMaxWidth, image.width);
      // let height = image.height * (width / image.width);
      let width = image.width;
      let height = image.height;
      canvas.height = height;
      canvas.width = width;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, width, height);
      let nData = canvas.toDataURL("image/jpeg", config.compressRadio);
      // if (nData.length / 1024 / 1024 > 1.4) {
      //   //压缩后仍然大于1.5MB，提醒换小点图片吧
      //   Toast("图片体积过大，换小一点的图片吧！");
      //   nData = "";
      //   resolve(nData);
      // }
      // console.log("*******压缩后的图片大小********",nData.length/1024);
      resolve(nData);
      // document.body.appendChild(image)
    };
  });
}
