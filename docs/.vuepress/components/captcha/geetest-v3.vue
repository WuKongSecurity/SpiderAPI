<template>
    <div style="text-align: center">
        <h1>极验验证 3.0 Demo <Badge text="风控模型：登陆/注册/找回密码" type="tip" vertical="top"/></h1>
        <form id="form">
            <br>
            <div>
                <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont gt-input">
            </div>
            <br>
            <div>
                <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont gt-input">
            </div>
            <br>
            <div>
                <div id="gt-captcha">
                    <p id="gt-wait" class="gt-show">正在加载验证码......</p>
                </div>
            </div>
            <input class="gt-submit" id="submit" type="submit" value="立即登录">
        </form>
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://static.geetest.com/static/js/gt.0.4.9.js';
        script.async = true;
        document.head.appendChild(script);

        setTimeout(function() {
            let handler = function (captchaObj) {
                $('#submit').click(function (e) {
                    let result = captchaObj.getValidate();
                    if (!result) {
                        e.preventDefault();
                        return alert('请先完成验证！');
                    }
                    $.ajax({
                        url: 'https://api.spiderapi.cn/geetest3/validate',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            username: $('#username').val(),
                            password: $('#password').val(),
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        },
                        success: function (data) {
                            if (data.result === 'success') {
                                alert('登录成功！');
                                captchaObj.reset();
                            } else if (data.result === 'fail') {
                                alert('登录失败，请重新验证！');
                                captchaObj.reset();
                            }
                        }
                    });
                });
                // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
                captchaObj.appendTo('#gt-captcha');
                captchaObj.onReady(function () {
                    $('#gt-wait').hide();
                });
            };
            $.ajax({
                url: 'https://api.spiderapi.cn/geetest3/register?t=' + (new Date()).getTime(), // 加随机数防止缓存
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    // 调用 initGeetest 初始化参数
                    // 参数1：配置参数
                    // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                    initGeetest({
                        gt: data.gt,
                        challenge: data.challenge,
                        new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                        offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                        product: 'float', // 产品形式，包括：float，popup
                        width: '100%'
                    }, handler);
                }
            });
        }, 500);
    }
}
</script>

<style>
    h1 span {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-weight: normal;    
    }
    .gt-submit {
        background: #347eff;
        border-radius: 4px;
        margin: 20px 0;
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
    .gt-submit:hover {
        background: #1A73E8;
    }
    .gt-input {
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
    #gt-captcha {
        width: 300px;
        height: 50px;
        display: inline-block;
    }
    .gt-show {
        display: block;
    }
    #gt-wait {
        text-align: left;
        color: #666;
        margin: 0;
        font-size: 14px;
    }
</style>
