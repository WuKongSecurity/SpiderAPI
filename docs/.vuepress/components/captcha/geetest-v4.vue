<template>
    <div style="text-align: center">
        <h1>极验验证 4.0 Demo <Badge text="智能模式丨风控模型：反爬虫" type="tip" vertical="top"/></h1>
        <form id="form">
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
        script.src = 'https://static.geetest.com/v4/gt4.js';
        script.async = true;
        document.head.appendChild(script);
        
        setTimeout(function() {
            initGeetest4({
                captchaId: '4f6147ccd6e9a39ab33608b16e248abc',
                product: 'float',
                nativeButton: {width:'300px',height:'50px'}
            }, function (captchaObj) {
                captchaObj.appendTo('#gt-captcha');
                captchaObj.onReady(function () {
                    $('#gt-wait').hide();
                });
                $('#submit').click(function (e) {
                    let result = captchaObj.getValidate();
                    if (!result) {
                        e.preventDefault();
                        return alert('请先完成验证！');
                    }
                    result.captcha_id = '4f6147ccd6e9a39ab33608b16e248abc';
                    $.ajax({
                        url: 'https://captcha.api.spiderapi.cn/geetest4/login',
                        type: 'post',
                        dataType: 'json',
                        data: result,
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

