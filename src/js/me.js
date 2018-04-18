$(function(){
  // 获取用户登录信息
  let userInfo = localStorage.getItem('userInfo');
  let userObj = userInfo && JSON.parse(userInfo);
  // 显示用户信息
  if(userObj) {
    $('#user_name').html(userObj.mobile);
    $('#user_email').html(userObj.user_email);
  }
  // 实现退出功能
  function logout(){
    localStorage.removeItem('userInfo');
    // 跳转到登录页
    location.href = '/login.html';
  }



  $(document).on("pageInit", function(e, pageId, $page) {
    // 绑定退出事件
    $('#logoutBtn').on('click',function(){
      logout();
    })
  })
  $.init();

});