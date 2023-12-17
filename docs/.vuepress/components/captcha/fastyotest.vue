<template>
    <div style="text-align: center">
        <h1>友验 FastYotest Demo</h1>
        <br>
        <div>
            <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont fastyotest-input">
        </div>
        <br>
        <div>
            <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont fastyotest-input">
        </div>
        <br>
        <div>
            <div id="fastyotest-captcha">
                <p id="fastyotest-wait" class="fastyotest-show">正在加载验证码......</p>
            </div>
        </div>
        <input class="fastyotest-submit" id="fastyotest-submit" type="submit" value="立即登录">
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://static.fastyotest.com/assets/yotest.3b35648f.js';
        script.async = true;
        document.head.appendChild(script);
        
        let yoToken = '';
        setTimeout(function() {
            initYoTest.default({
                accessId: '8a81edbda36d5acccc2510fc19886cb9',
            }, function(captcha){
                captcha.appendTo('#fastyotest-captcha');
                // captcha.onSuccess(function(result) {
                //     yoToken = result.token;
                //     console.log(result.token, result.verified);
                // });
                captcha.onReady(function() {
                    console.log('FastYotest captcha is ready.');
                    $('#fastyotest-wait').hide();
                }).onShow(function(){
                    console.log('FastYotest captcha showed.');
                }).onSuccess(function(result) {
                    yoToken = result.token;
                }).onError(function(error) {
                    console.log(error.code, error.message);
                }).onClose(function() {
                    console.log('FastYotest captcha closed.');
                });
            });
        }, 500);
        $('#fastyotest-submit').click(function (e) {
            if (!yoToken) {
            e.preventDefault();
            return alert('请先完成验证！');
            }
            $.ajax({
                url: 'https://api.spiderapi.cn/fastyotest/login',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    token: yoToken
                },
                success: function (data) {
                    if (data.success) {
                        if (data.code === 200) {
                            alert('登录成功！');
                            location.reload();
                        } else {
                            alert('登录失败，请重新验证！');
                            location.reload();
                        }
                    } else {
                        alert('登录失败，请重新验证！');
                        location.reload();
                    }
                }
            });
        });
    },
};
</script>

<style>
    .fastyotest-submit {
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
    .fastyotest-submit:hover {
        background: #1A73E8;
    }
    .fastyotest-input {
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
    #fastyotest-captcha {
        width: 300px;
        height: 50px;
        display: inline-block;
    }
    .fastyotest-show {
        display: block;
    }
    #fastyotest-wait {
        text-align: left;
        color: #666;
        margin: 0;
        font-size: 14px;
    }
</style>
