$(function() {
  // 隔离的空间
  // 实现登录

  $('#loginBtn').on('click', function() {
    let mobile = $('#mobile').val();
    let password = $('#password').val();
    axios.post('login', {
        username: mobile,
        password: password
      })
      .then(function(data) {
        if(data.meta.status === 200){
          // 登录成功
          // 保存token和用户相关信息
          let info = JSON.stringify(data.data);
          localStorage.setItem('userInfo',info);
          // 跳转页面
          location.href = '/index.html';
        } else {
          // 登录失败
          $.toast(data.meta.msg);
        }
      })
  })
});
