<template>
  <div style="text-align: center">
    <h1>Cloudflare Turnstile Demo <Badge text="Managed Challenge" type="tip" vertical="top"/></h1>
    <form id="form">
      <br>
      <div>
        <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont cf-input">
      </div>
      <br>
      <div>
        <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont cf-input">
      </div>
      <br>
      <div id="cf-captcha">
        <p id="cf-wait" class="cf-show">正在加载验证码......<br>（若长时间未加载，请刷新网页并科学访问）</p>
      </div>
      <br>
      <input class="cf-submit2" id="submit" type="submit" value="立即登录">
    </form>
  </div>
</template>
<script>
export default {
  mounted() {
    const script1 = document.createElement('script');
    script1.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    // script1.async = true;
    script1.defer = true;
    document.head.appendChild(script1);

    window.onloadTurnstileCallback = function () {
      $('#cf-wait').hide();
      turnstile.render('#cf-captcha', {
        sitekey: '0x4AAAAAAARHeKJh3hsrBCbZ',
        callback: function(token) {
          console.log(`Challenge Success ${token}`);
          window.turnstileManagedToken = token;
        },
      });
    };

    $('#submit').click(function (e) {
      if (!window.turnstileManagedToken) {
        e.preventDefault();
        return alert('请先完成验证！');
      }
      let result = {};
      result['username'] = $('#username').val();
      result['password'] = $('#password').val();
      result['cf-turnstile-response'] = window.turnstileManagedToken;

      $.ajax({
        url: 'https://api.spiderapi.cn/turnstile-managed/login',
        type: 'post',
        dataType: 'json',
        data: result,
        success: function (data) {
          if (data.result === 'success') {
            alert('登录成功！');
            location.reload();
          } else if (data.result === 'fail') {
            alert('登录失败，请重新验证！');
          }
        }
      });
    });
  },
};
</script>

<style>
  h1 span {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
  }
  .cf-submit2 {
    background: #347eff;
    border-radius: 4px;
    margin-bottom: 20px;
    display: inline-block;
    width: 300px;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    line-height: 49px;
  }
  .cf-submit2:hover {
    background: #1A73E8;
  }
  .cf-input {
    display: inline-block;
    width: 300px;
    padding: 12px;
    border: 1px solid #d1d6e0;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
    color: #292f3a;
    font-size: 14px;
    line-height: 20px;
  }
  #cf-captcha {
    width: 300px;
    height: 50px;
    margin-bottom: 30px;
    display: inline-block;
  }
  #cf-captcha p {
    text-align: center;
  }
  .cf-show {
    display: block;
  }
  #cf-wait {
    text-align: left;
    color: #666;
    margin: 0;
    font-size: 14px;
  }
</style>
