$(function(){
  // 分页相关参数
  let pagenum = 1;// 表示第几条数据
  let pagesize = 10;// 表示每次加载多少条数据
  // 加载次数标记为（flag标志位保证加载完一次才能进行下一次加载）
  let flag = false;
  
  // 如何获取url地址的参数
  let cid = APP.qs('cid');

  // 加载列表数据
  function loadListData(){
    return axios.get('goods/search', {
      params: {
        pagenum: pagenum,
        pagesize: pagesize,
        cid: cid
      }
    });
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
  $(document).on('infinite', '.infinite-scroll-bottom', function() {
    if(flag) {
      return;
    }
    flag = true;
    // 上一次加载完成数据并且渲染完页面之后才可以继续滚动
    loadListData()
      .then(function(data){
        // 每次加载记录号要更新
        pagenum++;
        let html = template('listTpl',data.data);
        // 这里是追加操作
        $('#listInfo').append(html);
        // 总条数，用于判断结束位置
        let total = data.data.total;
        return total;
      })
      .then(function(total){
        if(pagenum*pagesize*80 >= total){
          // 加载到最后了，终止加载
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').html('没有更多数据');
        }
      })
      .then(function(){
        $.toast('此次加载成功');
        // 重置加载提示
        $.refreshScroller();
        // 加载成功之后要重置标志位，以保证下一次可以正常加载
        flag = false;
      })
  });

  $(document).on("pageInit", function(e, pageId, $page) {
    // 页面第一次加载，初始化列表
    refreshPage();
  })
  $.init();
});