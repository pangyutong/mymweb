$(function(){

  // 加载列表数据
  function loadListData(){
    return axios.get('goods/search');
  }
  // 渲染商品列表
  function renderList(data){
    return new Promise(function(resolve,reject){
      let html = template('listTpl',data.data);
      $('#listInfo').html(html);
      resolve();
    })
  }
  // 刷新页面
  function refreshPage(){
    loadListData()
      .then(renderList)
      .then(function(){
        $.toast('加载成功');
        // 重置下拉提示信息
        $.pullToRefreshDone('.pull-to-refresh-content');
      })
      .catch(function(){
        $.toast('服务器错误');
      })
  }

  // 下拉刷新
  $(document).on('refresh', '.pull-to-refresh-content', function(e) {
    // 下拉后应该重新调用接口获取数据渲染模板
    refreshPage();
  });
  // 滚到底部加载更多内容


  $(document).on("pageInit", function(e, pageId, $page) {
    refreshPage();
  })
  $.init();
});