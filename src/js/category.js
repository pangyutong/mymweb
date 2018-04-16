$(function(){

  // 加载分类数据
  function loadCateData(){
    return axios.get('categories');
  }
  // 渲染左侧菜单
  function renderLeftMenu(data){
    return new Promise(function(resolve,reject){
      // 渲染左侧菜单
      let html = template('leftMenuTpl',data.data);
      $('#leftMenuInfo').html(html);
      // 绑定菜单事件
      $('#leftMenuInfo').find('.items').on('click',function(){
        // 点击控制菜单选中
        $('#leftMenuInfo .cur').removeClass('cur');
        $(this).addClass('cur');
        // 渲染右侧
        // renderRightCate(data.data);
        // renderRightCate(data.data,this);
        renderRightCate.call(this,data.data);
      })
      // 添加菜单选中效果
      $('#leftMenuInfo').find('.items').eq(0).addClass('cur');
      resolve(data.data);
    })
  }
  // 渲染右侧分类信息
  function renderRightCate(data){
    // 如何从这里获取左侧菜单的索引
    let currentIndex = $(this).index();
    currentIndex = currentIndex === -1 ? 0 : currentIndex;
    let currentData = data[currentIndex] && data[currentIndex].children;
    return new Promise(function(resolve,reject){
      // 渲染右侧内容
      let html = template('rightCateTpl',{
        baseUrl : APP.imgBaseUrl,
        data: currentData
      });
      $('#rightCateInfo').html(html);
      // 给三级分类绑定事件
      $('#rightCateInfo .good').on('click',function(){
        // 点击分类跳转
        let catId = $(this).attr('data-cid');
        location.href = '/goodslist.html?cid=' + catId;
      });
      resolve();
    })
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    // 先显示提示效果
    $.showPreloader('正在加载分类数据');
    // 调用接口
    loadCateData()
      .then(renderLeftMenu)
      .then(renderRightCate)
      .then(function(){
        $.toast('加载成功')
      })
      .catch(function(){
        $.toast('服务器错误')
      })
      .finally(function(){
        // 无论成功还是失败都会调用该方法（finally有浏览器版本兼容问题--可以借助第三方库bluebird解决）
        $.hidePreloader('已经完成');
      })
  });
  $.init();
});