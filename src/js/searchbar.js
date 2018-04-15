$(function(){
  // 搜索条业务功能
  // 初始化遮罩层
  let layer = $('<div class="search"><div id="searchInfo"></div></div>');
  // 设置遮罩层到顶部的距离
  layer.css('top',$('.mysearch').height());
  // 隐藏遮罩层
  layer.hide();
  // 追加到页面
  layer.appendTo('body');

  // 实现搜索跳转功能
  window.showDetail = function(id,name){
    let flag = false;
    let history = localStorage.getItem('searchHistory');
    if(history) {
      // 从第二次开始执行该分支
      // 将字符串信息转换为json对象
      let historyInfo = JSON.parse(history);
      // 判断数组中是否包含指定的id对象
      historyInfo.some(function(item){
        if(id == item.goods_id){
          // 如果当前传递过来的id和已经存在的相等，就证明已经存在
          flag = true;
          // 找到之后终止遍历
          return true;
        }
      })
      if(!flag) {
        // 如果不存在，就添加进去
        let info = {
          goods_id: id,
          goods_name: name
        }
        historyInfo.push(info);
        // 重新存储到localStorage
        localStorage.setItem('searchHistory',JSON.stringify(historyInfo));
      }
    } else {
      // 第一次存储历史信息
      let info = {
        goods_id: id,
        goods_name: name
      }
      let arr = [];
      arr.push(info);
      // 第一次存储到localStorage
      localStorage.setItem('searchHistory',JSON.stringify(arr));
    }
    // 实现跳转
    location.href = '/goods-detail.html?goods_id=' + id;
  }

  // 根据输入的关键字加载列表数据
  function loadKeyWordData(keyword){
    return axios.get('goods/qsearch', {
      params: {
        query: keyword
      }
    });
  }
  // 渲染数据到提示列表
  function renderList(param){
    return new Promise(function(resolve,reject){
      let html = template('searchTpl',param.data);
      $('#searchInfo').html(html);
      resolve();
    });
  }
  // 处理所有的事件
  $('#search').on('focus',function(){
    layer.show();
    // 获取搜索历史数据
    let historyInfo = localStorage.getItem('searchHistory');
    if(historyInfo){
      // 表示有历史信息
      historyInfo = JSON.parse(historyInfo);
      // 渲染历史信息
      let html = template('searchTpl',historyInfo);
      $('#searchInfo').html(html);
    }
  })
  $('#search').on('blur',function(){
    // 保证点击a标签之后再触发隐藏操作
    setTimeout(function(){
      layer.hide();
    },0);
  })
  $('#search').on('input',function(){
    // 输入关键字的时候，动态调用后台接口，从而获取该关键字所有对应的数据列表
    let kw = $('#search').val();
    loadKeyWordData(kw).then(renderList);
  })
});
