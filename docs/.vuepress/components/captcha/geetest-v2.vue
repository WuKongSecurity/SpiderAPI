<template>
    <div style="text-align: center">
        <h1>极验验证 2.0 Demo <Badge text="离线验证" type="tip" vertical="top"/></h1>
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
            <input class="gt-submit2" id="submit" type="submit" value="立即登录">
        </form>
    </div>
</template>
<script>
export default {
    mounted() {
        const script1 = document.createElement('script');
        script1.src = 'https://static.geetest.com/static/tools/gt.js';
        script1.async = true;
        document.head.appendChild(script1);

        // const script2 = document.createElement('script');
        // script2.src = 'https://static.geetest.com/static/js/geetest.0.0.0.js';
        // script2.async = true;
        // document.head.appendChild(script2);
        
        const script3 = document.createElement('script');
        script3.src = 'https://static.geetest.com/static/js/offline.6.0.0.js';
        script3.defer = 'defer';
        document.head.appendChild(script3);

        setTimeout(function() {
            let handler = function (captchaObj) {
                captchaObj.appendTo('#gt-captcha');
                $('#gt-wait').hide();
                // captchaObj.onReady(function () {
                //     $('#gt-wait').hide();
                // });
                $('#submit').click(function (e) {
                    let result = captchaObj.getValidate();
                    if (!result) {
                        e.preventDefault();
                        return alert('请先完成验证！');
                    }
                    result['username'] = $('#username').val();
                    result['password'] = $('#password').val();
                    $.ajax({
                        url: 'https://api.spiderapi.cn/geetest2/login',
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
            };
            $.ajax({
                url: 'https://api.spiderapi.cn/geetest2/register',
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    initGeetest({
                        gt: data.gt,
                        challenge: data.challenge,
                        product: 'float', // 产品形式，包括：float，popup
                        offline: 1
                    }, handler);
                }
            });
        }, 500);
    },
};
</script>

<style>
    h1 span {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-weight: normal;    
    }
    .gt-submit2 {
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
    .gt-submit2:hover {
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
        margin-bottom: 10px;
        margin-top: 10px;
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
