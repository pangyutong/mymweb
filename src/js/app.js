/*
  axios常用功能
  1、get/post/put/delete 常用api用法（get参数的传递方式）
  2、参数传递方式：普通的表单数据；json格式数据
  3、两种拦截器的原理
  4、基础配置信息baseURL
*/
// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
