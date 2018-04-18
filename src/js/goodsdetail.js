$(function(){
  // 获取参数中的商品id
  let gId = APP.qs('goods_id');
  // 商品详情数据
  let currentProduct = null;
  // 加载商品详情数据
  function loadDetailData(){
    return axios.get('goods/detail', {
      params: {
        goods_id: gId
      }
    });
  }
  // 渲染页面
  function renderDetailPage(data){
    return new Promise(function(resolve,reject){
      currentProduct = data.data;
      // 处理轮播图模板
      let swiperHtml = template('swiperTpl',data.data.pics)
      $('#swiperInfo').html(swiperHtml);
      new Swiper ('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })
      // 处理基本信息
      let baseHtml = template('baseTpl',data.data)
      $('#baseInfo').html(baseHtml);
      // 处理商品详情
      $('#good_introduce').html(data.data.goods_introduce);
      // 处理商品的规格参数
      let paramHtml = template('paramTpl',data.data.attrs)
      $('#good_attrs').html(paramHtml);
      resolve();
    })
  }
  // 添加购物车
  function addCart(){
    return new Promise(function(resolve,reject){
      $('#addCartBtn').on('click',function(){
        axios.post('my/cart/add',{
          info: JSON.stringify(currentProduct)
        }).then(function(data){
          if(data.meta.status === 200) {
            $.toast(data.meta.msg)
          }
        }).catch(function(){
          $.toast('服务器错误')
        });
      });
      resolve();
    })
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    loadDetailData()
    .then(renderDetailPage)
    .then(addCart)
    .then(function(){
      $.toast('success')
    })
    .catch(function(){
      $.toast('服务器错误');
    })
  })
  $.init();
});