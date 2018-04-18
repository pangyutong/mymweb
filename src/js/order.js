$(function(){
  // 获取订单类型参数
  let type = APP.qs('type');
  // 加载订单数据
  function loadOrderData(){
    return axios.get('/my/orders/all', {
      params: {
        type: type
      }
    });
  }
  // 渲染页面
  function renderOrder(data){
    return new Promise(function(resolve,reject){
      let html = template('orderTpl',data.data);
      console.log(html)
      $('#orderInfo' + type).html(html);
      resolve();
    })
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    loadOrderData()
      .then(renderOrder)
      .then(function(){
        $.toast('success')
      })
      .catch(function(){
        $.toast('服务器错误')
      })

  })
  $.init();
});