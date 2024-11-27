<template>
    <div style="text-align: center;">
        <h1>V5 验证 Demo <Badge text="场景：登录/注册/表单/外挂防护丨限额：2QPS" type="tip" vertical="top"/></h1>
        <br>
        <div>
            <input type="text" :placeholder="'\ue614 请输入账号'" id="username" maxlength="" class="iconfont verify5-input">
        </div>
        <br>
        <div>
            <input type="text" :placeholder="'\ue69c 请输入密码'" id="password" maxlength="" class="iconfont verify5-input">
        </div>
        <br>
        <div v5-config="{ name:'login-v5', host:'freetvks2vi2.verify5.com', token:'6b5d4b45db0b4153b5050448143afcb2' }" ></div>
        <input class="verify5-submit" id="submit" type="submit" value="立即登录">
    </div>
</template>

<script>
export default {
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://s.verify5.com/assets/latest/v5.js';
        script.async = true;
        document.head.appendChild(script);
        
        $(document).ready(function () {
            if(location.href.indexOf('#reloaded') == -1){
                location.href = location.href + '#reloaded';
                location.reload();
            }
        });

        $('#submit').click(function () {
            let verifyId = document.getElementsByName('login-v5')[0].value;
            if (!verifyId) {
                return alert('请先完成验证！');
            } else {
                $.ajax({
                    type: 'post',
                    url: 'https://captcha.api.spiderapi.cn/verify5/login',
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val(),
                        host: 'freetvks2vi2.verify5.com',
                        token: '6b5d4b45db0b4153b5050448143afcb2',
                        timestamp: new Date().getTime(),
                        verifyId: verifyId
                    },
                    dataType:'json',
                    success: function (data) {
                        if (data.success) {
                            alert('登录成功！');
                            location.reload();
                        } else {
                            alert('登录失败，请重新验证！');
                        }
                    }
                });
            }
        })
    },
};
</script>

<style>
    h1 span {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-weight: normal;    
    }
    .verify5-submit {
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
    .verify5-submit:hover {
        background: #1A73E8;
    }
    .verify5-input {
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
    .v5-validation-btn, .v5-validation-btn-ing, .v5-validation-btn-success {
        margin: 0 auto;
        width: 300px !important;
        margin-bottom: 0 !important;
    }
</style>
