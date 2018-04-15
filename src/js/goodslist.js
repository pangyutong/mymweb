$(function(){

  // 加载列表数据
  function loadListData(){
    return axios.get('goods/search');
  }
  // 渲染商品列表
  function renderList(data){
    console.log(data)
    return new Promise(function(resolve,reject){
      let html = template('listTpl',data.data);
      $('#listInfo').html(html);
      resolve();
    })
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    loadListData()
      .then(renderList)
      .then(function(){
        $.toast('加载成功');
      })
      .catch(function(){
        $.toast('服务器错误');
      })
  })
  $.init();
});