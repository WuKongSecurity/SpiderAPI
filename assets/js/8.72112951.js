(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{335:function(t,e,a){},397:function(t,e,a){"use strict";a(335)},412:function(t,e,a){"use strict";a.r(e);var s={mounted(){const t=document.createElement("script");t.src="https://static.geetest.com/static/js/gt.0.4.9.js",t.async=!0,document.head.appendChild(t),setTimeout((function(){let t=function(t){$("#submit").click((function(e){let a=t.getValidate();if(!a)return e.preventDefault(),alert("请先完成验证！");$.ajax({url:"https://captcha.api.spiderapi.cn/geetest3/validate",type:"POST",dataType:"json",data:{username:$("#username").val(),password:$("#password").val(),geetest_challenge:a.geetest_challenge,geetest_validate:a.geetest_validate,geetest_seccode:a.geetest_seccode},success:function(e){"success"===e.result?(alert("登录成功！"),t.reset()):"fail"===e.result&&(alert("登录失败，请重新验证！"),t.reset())}})})),t.appendTo("#gt-captcha"),t.onReady((function(){$("#gt-wait").hide()}))};$.ajax({url:"https://captcha.api.spiderapi.cn/geetest3/register?t="+(new Date).getTime(),type:"get",dataType:"json",success:function(e){initGeetest({gt:e.gt,challenge:e.challenge,new_captcha:e.new_captcha,offline:!e.success,product:"float",width:"100%"},t)}})}),500)}},i=(a(397),a(14)),c=Object(i.a)(s,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{"text-align":"center"}},[e("h1",[t._v("极验验证 3.0 Demo "),e("Badge",{attrs:{text:"风控模型：登陆/注册/找回密码",type:"tip",vertical:"top"}})],1),t._v(" "),e("form",{attrs:{id:"form"}},[e("br"),t._v(" "),e("div",[e("input",{staticClass:"iconfont gt-input",attrs:{type:"text",placeholder:" 请输入账号",id:"username",maxlength:""}})]),t._v(" "),e("br"),t._v(" "),e("div",[e("input",{staticClass:"iconfont gt-input",attrs:{type:"text",placeholder:" 请输入密码",id:"password",maxlength:""}})]),t._v(" "),e("br"),t._v(" "),t._m(0),t._v(" "),e("input",{staticClass:"gt-submit",attrs:{id:"submit",type:"submit",value:"立即登录"}})])])}),[function(){var t=this._self._c;return t("div",[t("div",{attrs:{id:"gt-captcha"}},[t("p",{staticClass:"gt-show",attrs:{id:"gt-wait"}},[this._v("正在加载验证码......")])])])}],!1,null,null,null);e.default=c.exports}}]);