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
    });
    return allParams[paramName];
};
const APP = {
  imgBaseUrl : 'http://47.96.21.88:8888/', // 设置图片基准路径
  qs: getURLParamByName
};

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
