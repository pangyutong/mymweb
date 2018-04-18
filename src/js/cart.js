$(function(){

  // 加载购物车数据
  function loadCartData(){
    return axios.get('my/cart/all');
  }
  // 渲染模板
  function renderCartInfo(data){
    return new Promise(function(resolve,reject){
      let info = data.data.cart_info;
      info = JSON.parse(info);
      // 对后台数据进行二次加工
      let goods = [];
      for(let key in info){
        goods.push(info[key]);
      }
      let html = template('cartTpl',goods);
      $('#cartInfo').html(html);
      // 把数据传递到下一步，用于计算总价
      resolve(goods);
    })
  }
  // 计算商品总价
  function calcMoney(data){
    return new Promise(function(resolve,reject){
      let total = 0;
      data.forEach(function(item){
        total += item.goods_price * item.amount;
      })
      $('#totalPrice').html('总价：￥' + total);
    })
  }
  $(document).on("pageInit", function(e, pageId, $page) {
    loadCartData()
      .then(renderCartInfo)
      .then(calcMoney)
      .catch(function(){
        $.toast('服务器错误')
      })
  })
  $.init();
});