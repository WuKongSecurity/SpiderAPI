<template>
    <div id="space-semantic" style="text-align: center">
        <div id="embed-wrapper">
            <h1>阿里云云盾验证码 2.0 Demo</h1>
            <div class="aliyun-buttons">
                <button class='mode-button' onclick="showCaptcha('1f1ztfwx', this)">无痕验证</button>
                <button class='mode-button' onclick="showCaptcha('qyhgfnsy', this)">滑块验证</button>
                <button class='mode-button' onclick="showCaptcha('1czd8gee', this)">拼图验证</button>
                <button class='mode-button' onclick="showCaptcha('dabz0x79', this)">空间推理</button>
            </div>
            <div>
                <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont aliyun-input">
            </div>
            <br>
            <div>
                <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont aliyun-input">
            </div>
            <br>
            <div>
                <div id="aliyun-captcha">
                    <p id="aliyun-wait" class="aliyun-show">点击上方橙色按钮，选择模式后加载验证码！</p>
                </div>
            </div>
            <input class="aliyun-submit" id="submit" type="submit" value="立即登录">
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js';
        script.async = true;
        document.head.appendChild(script);
        
        let alCaptcha;
        function showCaptcha(sceneId, button) {
            let modeButtons = document.querySelectorAll('.mode-button');
            modeButtons.forEach(function(btn) {
                btn.classList.remove('clicked');
            });
            button.classList.add('clicked');
            if (sceneId === '1f1ztfwx') {
                let captchaContainer = document.getElementById('aliyun-captcha');
                let oldCaptchaDiv = captchaContainer.querySelector('.aliyunCaptcha-show');
                if (oldCaptchaDiv) {
                    captchaContainer.removeChild(oldCaptchaDiv);
                }
            };
            $('#aliyun-wait').hide();
            initAliyunCaptcha({
                SceneId: sceneId, // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
                prefix: '2ulmwi', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
                mode: 'embed', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
                element: '#aliyun-captcha', //页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
                button: '#submit', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
                captchaVerifyCallback: captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
                onBizResultCallback: onBizResultCallback, // 业务请求结果回调函数，无需修改
                getInstance: getInstance, // 绑定验证码实例函数，无需修改
                slideStyle: {
                    width: 360,
                    height: 40,
                }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width 最小值为 320 px
                language: 'cn', // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
            });
        }
        function getInstance(instance) {
            alCaptcha = instance;
        }
        function fetchData(captchaVerifyParam) {
            return $.ajax({
                url: 'https://api.spiderapi.cn/aliyun2/login',
                type: 'post',
                dataType: 'json',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    captchaVerifyParam: captchaVerifyParam
                }
            });
        }
        async function captchaVerifyCallback(captchaVerifyParam) {
            const response = await fetchData(captchaVerifyParam);
            const result = response.result.verify_result;
            const verifyResult = {
                captchaResult: result
            };
            return verifyResult;
        }
        function onBizResultCallback(bizResult) {
            if (bizResult === true) {
                alert('登录成功！')
            } else {
                alert('登录失败，请重新验证！');
            }
        }
    },
};
</script>

<style>
    .aliyun-submit {
        background: #347eff;
        border-radius: 4px;
        margin: 20px 0;
        display: inline-block;
        width: 360px;
        height: 50px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        line-height: 49px;
    }
    .aliyun-submit:hover {
        background: #1A73E8;
    }
    .aliyun-input {
        display: inline-block;
        width: 360px;
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
    #aliyun-captcha {
        width: 300px;
        height: 50px;
        display: inline-block;
    }
    .aliyun-show {
        display: block;
    }
    #aliyun-wait {
        text-align: center;
        color: #f04405;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }
    .aliyun-buttons {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .aliyun-buttons button {
        border: none;
        background: #f04405;
        color: #fff;
        font: inherit;
        font-size: 80%;
        font-weight: 600;
        /*line-height: 1.2;*/
        border-radius: 0.57em;
        cursor: pointer;
        padding: 0.85em 1.7em;
        text-align: center;
        outline: none;
        transition: all 0.25s ease-out;
        margin: 0.8em;
        /* margin-right: 0.5em; */

    }
    .aliyun-buttons button:hover {
        background: #1A73E8;
    }
    .aliyun-buttons button:active {
        background-color: #1A73E8;
    }
    .aliyun-buttons button:disabled {
        cursor: not-allowed;
        background: #e9987c;
    }
    .mode-button.clicked {
        background-color: #1A73E8;
    }
</style>
