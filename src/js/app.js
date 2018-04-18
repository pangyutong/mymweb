/*
  axios常用功能
  1、get/post/put/delete 常用api用法（get参数的传递方式）
  2、参数传递方式：普通的表单数据；json格式数据
  3、两种拦截器的原理
  4、基础配置信息baseURL
*/
// 获取URL中指定的参数参数
let getURLParamByName = function(paramName){
  let str = location.search.substring(1);// cid=12&abc=hello
  let arr = str.split('&');
  let allParams = {};
  arr.forEach(function(item){
    let kv = item.split('=');
    // 把所有的参数以键值对的方式存入对象中
    allParams[kv[0]] = kv[1];
    // if(paramName == kv[0]){
    //   // 对比传递的参数名和url中的参数名是否一致，如果一致就找到了对应的值
    // }
  })
  return allParams[paramName];
}
const APP = {
  imgBaseUrl : 'http://47.96.21.88:8888/', // 设置图片基准路径
  qs: getURLParamByName
}

// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';
// axios.defaults.baseURL = 'http://localhost:8888/api/public/v1';
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


// axios.get(url,{
//   params: {
//     info: 'nihao'
//   }
// })

// 发送请求之前设置一些信息
axios.interceptors.request.use(function (config) {
    // 设置请求头，可以用于携带token
    let info = localStorage.getItem('userInfo');
    let token = info && JSON.parse(info).token;
    config.headers.Authorization = token;
    // console.log(config)
    // url地址添加时间戳，防止缓存
    if(config.params){
      // 已经存在get参数
      config.params.t = new Date().getTime();
    }else{
      // 不存在get参数
      config.params = {
        t: new Date().getTime()
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 没有登录的情况下直接跳转到登录页
$(document).on("pageInit", function(e, pageId, $page) {
  
  $('.bar-tab').on('click','.tab-item',function(e){
    let userInfo = localStorage.getItem('userInfo');
    if(!userInfo && (this.href.indexOf('me') != -1 || this.href.indexOf('cart') != -1)){
      // 没有登录,并且跳转地址是 me.html 或者 cart.html才做验证
      location.href = '/login.html';
      e.preventDefault();
    }
    // jQuery的事件函数中的return false既可以阻止默认行为，也可以阻止冒泡
    // 原生js中的事件函数return false只能阻止默认行为，不能阻止冒泡
    // return false;
    // e.preventDefault();// 阻止默认行为
    // e.stopPropagation();// 阻止冒泡
  })
});
// 必须显示的调用该方法，从而触发pageInit事件
$.init();