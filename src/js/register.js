$(function(){
  // 设置验证码延时时间
  let delayTime = 60;
  // 控制验证码按钮状态
  let codeFlag = false;

  // 表单验证
  function checkForm(){
    return new Promise(function(resolve,reject){
      let mobile = $('#mobile').val();
      if(!/^\d{11}$/.test(mobile)){
        reject('手机号格式错误');
      }
      let code = $('#code').val();
      if(!code || code.length != 4){
        reject('验证码错误');
      }
      let email = $('#email').val();
      if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(email)){
        reject('邮箱格式错误');
      }
      let pwd = $('#pwd').val();
      if(!/^\d{6}$/.test(pwd)){
        reject('密码必须是6位数字');
      }
      let cpwd = $('#confirmPwd').val();
      if(pwd != cpwd){
        reject('两次密码不相同');
      }
      let gender = $('#gender').val();
      // 验证通过
      resolve({
        mobile:mobile,
        code:code,
        email:email,
        pwd:pwd,
        gender:gender
      });
    })
  }

  // 验证码处理
  function handleCode(mobile){
    return axios.post('users/get_reg_code',{
      mobile: mobile
    })
  }
  
  // 处理验证码按钮的状态
  function handleCodeState(){
    delayTime--;
    if(delayTime > 0) {
      // 禁用按钮的状态并动态更新按钮的文字信息
      $('#codeButton').addClass('button-fill').addClass('disabled').attr('disabled','disabled').text(delayTime+'秒后重试').removeAttr("href");
      setTimeout(handleCodeState,1000);
    }else{
      $('#codeButton').removeClass('button-fill').removeClass('disabled').removeAttr('disabled').text('重新发送验证码');
      // 状态位要重置
      codeFlag = false;
      // 时间也要重置
      delayTime = 60;
    }
  }

  // 提交表单
  function submitForm(formData){
    return axios.post('users/reg',formData);
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    // 绑定验证码单击事件
    $('#codeButton').on('click',function(){
      if(codeFlag) {
        return;
      }
      let mobile = $('#mobile').val();
      let reg = /^\d{11}$/;
      if(!reg.test(mobile)){
        $.toast('手机号格式错误');
        return;
      }
      codeFlag = true;
      // 处理验证码按钮记时效果
      handleCodeState();
      // 调用验证码生成接口
      handleCode(mobile)
        .then(function(data){
          $.toast(data.data);
        })
    })

    // 绑定单击注册按钮事件
    $('#registerBtn').on('click',function(){
      checkForm()
        .then(submitForm)
        .then(function(data){
          if(data.meta.status == 200){
            $.toast(data.meta.msg);
            // 跳转到登录页
            location.href = '/login.html';
          }
        })
        .catch(function(errInfo){
          $.toast(errInfo);
        })
    })
  })
  $.init();
});