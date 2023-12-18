<template>
    <div id="space-semantic" style="text-align: center">
        <div id="embed-wrapper">
            <h1>阿里云云盾验证码 1.0 Demo <Badge text="227" type="tip" vertical="top"/></h1>
            <div>
                <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont aliyun-input">
            </div>
            <br>
            <div>
                <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont aliyun-input">
            </div>
            <br>
            <div>
                <div id="aliyun-captcha-v1"></div>
            </div>
            <input class="aliyun-submit" id="submit" type="submit" value="立即登录">
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://g.alicdn.com/AWSC/AWSC/awsc.js';
        script.async = true;
        document.head.appendChild(script);
        
        var requestInfo = {
            type: 'GET',
            // url: '', // 'https://www.taobao.com/detail'
            args: '',
            data: '', //a=1&b=2&c=3...
            token: '87e16a46-62ed-45bc-b6ad-306c674bab56',
            refer: 'K05ULVa8RRMjHXIPNhdVCrmQ4/I=',
            headers: {},
        };

        setTimeout(function() {
            AWSC.use('nc', function (state, module) {
                window.nc = module.init({
                    renderTo: 'aliyun-captcha-v1',//渲染到DOM ID
                    appkey: 'CF_APP_WAF', // 应用标识
                    scene: 'register',
                    trans: {'key1': 'code100', 'user': 'default'},
                    token: requestInfo.token,//umid token
                    language: 'cn',//语言包，默认中文
                    isEnabled: true,
                    times: 3,
                    success: function (data) {
                        const resultEle = document.getElementById('nc_1_n1z');
                        if (resultEle) {
                            resultEle.innerHTML = '✔';
                        };
                        document.getElementsByClassName('nc-lang-cnt')[0].innerHTML = '<b style="margin-left:60px;-webkit-text-fill-color:#FF6A00 !important">验证成功！</b>';
                        window.aliSessionId = data.sessionId;
                        window.aliSig = data.sig;
                        window.aliToken = data.token;
                        console.log('success, data.sessionId: ', data.sessionId);
                        console.log('success, data.sig: ', data.sig);
                        console.log('success, data.token: ', data.token);
                    },
                    // 滑动验证失败时触发该回调参数。
                    fail: function (failCode) {
                        const resultEle = document.getElementById('nc_1_n1z');
                        if (resultEle) {
                            resultEle.innerHTML = '✘';
                        };
                        document.getElementsByClassName('nc-lang-cnt')[0].innerHTML = '<b style="margin-left:60px;-webkit-text-fill-color:#FF6A00 !important">验证失败！</b>';
                        console.log('fail, fail code:', failCode);
                        location.reload();
                    },
                    // 验证码加载出现异常时触发该回调参数。
                    error: function (errorCode) {
                        console.log('error, error code:', errorCode);
                        location.reload();
                    }
                });
            });
        }, 500);

        $('#submit').click(function (e) {
            if (window.aliSessionId && window.aliSig && window.aliToken) {
                alert('登录成功！');
                location.reload();
            }
            else {
                e.preventDefault();
                alert('请先完成验证！');
            }
        })
    }
}
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
    /* #aliyun-captcha-v1 {
        width: 300px;
        height: 50px;
        display: inline-block;
    } */
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
        /*margin-left: 0.8em;*/
        margin-right: 0.5em;
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
    .sm-pop-inner {
        position: inherit !important;
        width: 100%;
    }
    #waf_nc_h5_block{position:fixed;_position:absolute;width:100%;height:100%;top:0;bottom:0;left:0;z-index:9999}
    .waf-nc-h5-mask{background:#777;opacity:.5;filter:alpha(opacity=50);width:100%;height:100%}
    .waf-nc-h5-wrapper{width:100%;position:absolute;top:20%;left:50%;margin-top:-20%;margin-left:-47%;padding:5% 1%;background:#fff;border-radius:3px;box-sizing:border-box}
    .waf-nc-h5-panel{width:100%;text-align:center}
    .waf-nc-h5-icon{margin:0 auto}
    .waf-nc-h5-description{margin-top:40px;font-size:14px;color:#595959}
    #traceid{text-align:center;margin-top:500px!important;font-size:12px;color:#999}
    /* .nc-container #nc_1_wrapper{width:360px!important} #nc_2_wrapper{width:360px!important} #nc_3_wrapper{width:360px!important} */
    .nc-container [id*="_wrapper"]{width:360px!important}
    .nc_bg{background:#fff3ea!important}
    .btn_slide{background:#ff6a00!important;border:0!important;color:#fff!important;width:48px!important;height:48px!important;font-size:30px;font-weight:900!important;line-height:48px!important}
    .btn_ok{background:#ff6a00!important;border:0!important;color:#fff!important;width:48px!important;height:48px!important;font-size:30px;font-weight:900!important;line-height:48px!important}
    .nc_scale{background:rgba(241,241,242,1)!important;height:48px!important}
    .nc-lang-cnt{height:48px!important;margin-left:10px!important;line-height:48px!important;font-size:14px!important}
    /* .nc_1_nocaptcha, .nc_2_nocaptcha, .nc_3_nocaptcha{width:360px!important;height:48px!important;margin:auto!important;left:0!important;right:0!important} */
    [class*="_nocaptcha"]{width:360px!important;height:48px!important;margin:auto!important;left:0!important;right:0!important}

</style>

