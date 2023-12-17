// 控制台打印信息
const consoleStr = function () {
  /*
           _____       _     __          ___          _
          / ___/____  (_)___/ /__  _____/   |  ____  (_)        爬虫爬得欢
          \__ \/ __ \/ / __  / _ \/ ___/ /| | / __ \/ /        监狱要坐穿
         ___/ / /_/ / / /_/ /  __/ /  / ___ |/ /_/ / /        数据玩得溜
        /____/ .___/_/\__,_/\___/_/  /_/  |_/ .___/_/        牢饭吃个够
            /_/                            /_/
  */
};
function makeConsoleStr(string) {
    let l = String(string)
    l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
    return "%c " + l
}
console.log(makeConsoleStr(consoleStr), "color: #0084ff");
console.log("\n %c © BOB'S BLOG %c itbob.cn %c © SpiderApi %c spiderapi.cn %c © SpiderBox %c spiderbox.cn \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #ffffff; background: #0084ff; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #ffffff; background: #f1404b; padding:5px 0;", "background: #fadfa3; padding:5px 0;");


// 百度收录自动推送
(function(){
    let bp = document.createElement('script');
    let curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();


//网站运行时长
function ShowRunTime(id) {
    let BootDate = new Date("2023/8/13 00:03:16");//设置网站运行时间，格式：年/月/日 时:分:秒
    let NowDate = new Date();
    let RunDateM = parseInt(NowDate - BootDate);
    let RunDays = Math.floor(RunDateM / (24 * 3600 * 1000));
    let RunHours = Math.floor(RunDateM % (24 * 3600 * 1000) / (3600 * 1000));
    let RunMinutes = Math.floor(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
    let RunSeconds = Math.round(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
    document.getElementById(id).innerHTML = "小破站已运行了 "
        + "<font style='color:#FFA500;font-weight:bold'>" + RunDays + "</font>" + " 天 "
        + "<font style='color:#1DBF97;font-weight:bold'>" + RunHours + "</font>" + " 小时 "
        + "<font style='color:#8A2BE2;font-weight:bold'>" + RunMinutes + "</font>" + " 分 "
        + "<font style='color:#007EC6;font-weight:bold'>" + RunSeconds + "</font>" + " 秒 ";
}
setInterval("ShowRunTime('sitetime')", 1000);

// 51.la 网站统计
(function () {
    LA.init({id:"3FpCxw5JhIELmjz2",ck:"3FpCxw5JhIELmjz2"})
})();

