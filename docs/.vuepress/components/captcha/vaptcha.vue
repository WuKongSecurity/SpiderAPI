<template>
    <div style="text-align: center !important;">
        <h1>Vaptcha Demo <Badge text="校验严格度：中等" type="tip" vertical="top"/></h1>
        <br>
        <div>
            <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont VAPTCHA-input">
        </div>
        <br>
        <div>
            <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont VAPTCHA-input">
        </div>
        <br>
        <div id="VAPTCHAContainer" style="width: 300px;height: 36px; margin: 0 auto;">
            <div class="VAPTCHA-init-main">
                <div class="VAPTCHA-init-loading">
                    <a href="/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="60px" viewBox="0 0 24 30" style="enable-background: new 0 0 50 50; width: 14px; height: 14px; vertical-align: middle" xml:space="preserve">
                            <rect x="0" y="9.22656" width="4" height="12.5469" fill="#CCCCCC">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                            </rect>
                            <rect x="10" y="5.22656" width="4" height="20.5469" fill="#CCCCCC">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                            </rect>
                            <rect x="20" y="8.77344" width="4" height="13.4531" fill="#CCCCCC">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                            </rect>
                        </svg>
                    </a>
                    <span class="VAPTCHA-text">Vaptcha Initializing...</span>
                </div>
            </div>
        </div>
        <input class="VAPTCHA-submit" id="submit" type="submit" value="立即登录">
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://v-cn.vaptcha.com/v3.js';
        script.async = true;
        document.head.appendChild(script);
        
        let serverToken = '';
        let VAPTCHAObj = '';
        setTimeout(function() {
            vaptcha({
                vid: '655ebd8dd480772c07231a4f',
                mode: 'click',
                scene: 0,
                container: '#VAPTCHAContainer',
                area: 'auto',
            }).then(function (captchaObj) {
                VAPTCHAObj = captchaObj;
                VAPTCHAObj.render();
                VAPTCHAObj.listen('pass', function () {
                    serverToken = VAPTCHAObj.getServerToken();
                })
            });
            $('#submit').click(function () {
                if (!serverToken) {
                return alert('请先完成验证！');
                } else {
                    const data = {
                        username: $('#username').val(),
                        password: $('#password').val(),
                        server: serverToken.server,
                        token: serverToken.token,
                    };
                    $.post('https://api.spiderapi.cn/vaptcha/login', data, function (r) {
                        if (r.success) {
                            alert('登录成功！');
                            setTimeout(function() {
                                VAPTCHAObj.reset();
                            }, 1000)
                        } else {
                            alert('登录失败，请重新验证！');
                            VAPTCHAObj.reset();
                        }
                    })
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
    .VAPTCHA-init-main {
        display: table;
        width: 100%;
        height: 100%;
        background-color: #eeeeee;
    }
    .VAPTCHA-init-loading {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .VAPTCHA-init-loading>a {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: none;
    }
    .VAPTCHA-init-loading .VAPTCHA-text {
        font-family: sans-serif;
        font-size: 12px;
        color: #cccccc;
        vertical-align: middle;
    }
    .VAPTCHA-submit {
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
    .VAPTCHA-submit:hover {
        background: #1A73E8;
    }
    .VAPTCHA-input {
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
</style>
