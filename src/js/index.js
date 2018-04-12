$(function(){


  // 处理轮播
  function handleSwiper(){
    new Swiper ('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })    
  }
  // 页面初始化完成之后，触发该事件
  $(document).on("pageInit", function(e, pageId, $page) {
    // 处理轮播效果
    handleSwiper();
  });
  $.init();
});