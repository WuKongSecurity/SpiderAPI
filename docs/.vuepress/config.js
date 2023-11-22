const htmlModules = require('./config/htmlModules.js');


module.exports = {

  theme: 'vdoing', // 使用依赖包主题
  // theme: require.resolve('../../vdoing'), // 使用本地主题 (先将vdoing主题文件下载到本地：https://github.com/xugaoyi/vuepress-theme-vdoing)

  title: "SpiderAPI - 爬虫逆向常用 API",
  description: 'SpiderAPI - 汇总各种爬虫逆向常用 API，涉及各种网络请求库，自动化框架，爬虫框架，HOOK 脚本，ADB 命令等。',
  base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
  head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: 'spiderapi,jsvmp,frida,spider,api,hook,adb' }],
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
    ['meta', { name: 'baidu-site-verification', content: 'codeva-L7Nb1StNAA' }], // 百度搜索验证
    // ['meta', { name: 'wwads-cn-verify', content: '6c4b761a28b734fe93831e3fb400ce87' }], // 广告相关，你可以去掉
    // ['script', { src: 'https://cdn.wwads.cn/js/makemoney.js', type: 'text/javascript' }], // 广告相关，你可以去掉
    // ['script', { src: 'https://lib.baomitu.com/jquery/1.9.1/jquery.min.js', type: 'text/javascript' }],
    ['script', { src: '//sdk.51.la/js-sdk-pro.min.js', type: 'text/javascript', id: 'LA_COLLECT', charset: 'UTF-8' }],
    // 极验行为验证 2.0 需要的 JS，直接在 md 里插入 <script> 标签会存在加载时机问题，到底是为什么？不会前端啊！
    ['script', { src: 'https://static.geetest.com/static/js/geetest.0.0.0.js', type: 'text/javascript' }],
    ['script', { src: '/js/autoPush.js', type: 'text/javascript' }],
    ['script', {}, `LA.init({id:"3FpCxw5JhIELmjz2",ck:"3FpCxw5JhIELmjz2"})`],
    ['script', {},
    `
    function makeMulti(string) {
        let l = new String(string)
        l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
        return "%c " + l
    };
    const string = function () {
      /*
           _____       _     __          ___          _ 
           / ___/____  (_)___/ /__  _____/   |  ____  (_)        爬虫爬得欢
           \\__ \\/ __ \\/ / __  / _ \\/ ___/ /| | / __ \\/ /        监狱要坐穿
          ___/ / /_/ / / /_/ /  __/ /  / ___ |/ /_/ / /        数据玩得溜
         /____/ .___/_/\\__,_/\\___/_/  /_/  |_/ .___/_/        牢饭吃个够
             /_/                            /_/          
      */
    };
    console.log(makeMulti(string), "color: #0084ff");
    console.log("\\n %c © BOB'S BLOG %c itbob.cn %c © SpiderApi %c spiderapi.cn %c © vdoing %c doc.xugaoyi.com \\n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #ffffff; background: #0084ff; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #ffffff; background: #f1404b; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
    `],
    ['script', {},
    `
    //网站运行时长
    function ShowRunTime(id) {
        var BootDate = new Date("2023/8/13 00:03:16");//设置网站运行时间，格式：年/月/日 时:分:秒
        var NowDate = new Date();
        var RunDateM = parseInt(NowDate - BootDate);
        var RunDays = Math.floor(RunDateM / (24 * 3600 * 1000));
        var RunHours = Math.floor(RunDateM % (24 * 3600 * 1000) / (3600 * 1000));
        var RunMinutes = Math.floor(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
        var RunSeconds = Math.round(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
        document.getElementById(id).innerHTML = "小破站已运行了 "
            + "<font style='color:#FFA500;font-weight:bold'>" + RunDays + "</font>" + " 天 "
            + "<font style='color:#1DBF97;font-weight:bold'>" + RunHours + "</font>" + " 小时 "
            + "<font style='color:#8A2BE2;font-weight:bold'>" + RunMinutes + "</font>" + " 分 "
            + "<font style='color:#007EC6;font-weight:bold'>" + RunSeconds + "</font>" + " 秒 ";
    }
    setInterval("ShowRunTime('sitetime')", 1000);
    `
    ],
  ],

  // 主题配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '目录', link: '/pages/toc/' },
      {
        text: '网络请求', link: '/pages/requests/', items: [
          { 
            text: '基本请求', items: [
              { text: 'requests', link: '/pages/requests/' },
              { text: 'urllib', link: '/pages/urllib/' },
              { text: 'aiohttp', link: '/pages/aiohttp/' },
              { text: 'httpx', link: '/pages/httpx/' },
              { text: 'pyhttpx', link: '/pages/pyhttpx/' },
              { text: 'tls_client', link: '/pages/tls_client/' },
              { text: 'curl_cffi', link: '/pages/curl_cffi/' },
              { text: 'requests_go', link: '/pages/requests_go/' },
              { text: 'pycurl', link: '/pages/pycurl/' },
              { text: 'websocket', link: '/pages/websocket/' },
            ]
          },
          {
            text: '异步协程', items: [
              { text: 'asyncio', link: '/pages/asyncio/' },
              { text: 'gevent', link: '/pages/gevent/' },
            ]
          },
          {
            text: '多线程', items: [
              { text: 'threading', link: '/pages/threading/' },
              { text: 'vthread', link: '/pages/vthread/' },
            ]
          },
          {
            text: '多进程', items: [
              { text: 'multiprocessing', link: '/pages/multiprocessing/' },
            ]
          }
        ]
      },
      {
        text: '数据处理', link: '/pages/re/', items: [
          { 
            text: '数据提取', items: [
              { text: 're', link: '/pages/re/' },
              { text: 'lxml', link: '/pages/lxml/' },
              { text: 'BeautifulSoup', link: '/pages/BeautifulSoup/' },
              { text: 'pyquery', link: '/pages/pyquery/' },
              { text: 'selectolax', link: '/pages/selectolax/' }
            ]
          },
          {
            text: '数据分析', items: [
              { text: 'wordcloud', link: '/pages/wordcloud/' },
              { text: 'jieba', link: '/pages/jieba/' },
              { text: 'pandas', link: '/pages/pandas/' },
              { text: 'NumPy', link: '/pages/NumPy/' },
              { text: 'SciPy', link: '/pages/SciPy/' },
            ]
          },
          {
            text: '制表绘图', items: [
              { text: 'matplotlib', link: '/pages/matplotlib/' },
              { text: 'pyecharts', link: '/pages/pyecharts/' },
              { text: 'plotly', link: '/pages/plotly/' },
              { text: 'seaborn', link: '/pages/seaborn/' },
            ]
          },
          {
            text: '数据存储', items: [
              { text: '文件存储', link: '/pages/file-storage/' },
              { text: 'MySQL', link: '/pages/MySQL/' },
              { text: 'MongoDB', link: '/pages/MongoDB/' },
              { text: 'Redis', link: '/pages/Redis/' },
              { text: 'SQLite', link: '/pages/SQLite/' },
            ]
          },
        ]
      },
      {
        text: '框架接口', link: '/pages/selenium/', items: [
          { 
            text: '自动化框架', items: [
              { text: 'selenium', link: '/pages/selenium/' },
              { text: 'pyppeteer', link: '/pages/pyppeteer/' },
              { text: 'playwright', link: '/pages/playwright/' },
              { text: 'splash', link: '/pages/splash/' },
              { text: 'DrissionPage', link: '/pages/DrissionPage/' },
              { text: 'appium', link: '/pages/appium/' },
              { text: 'airtest', link: '/pages/airtest/' }
            ]
          },
          {
            text: '接口编写', items: [
              { text: 'FastAPI', link: '/pages/FastAPI/' },
              { text: 'flask', link: '/pages/flask/' },
              { text: 'express', link: '/pages/express/' },
            ]
          },
          {
            text: '爬虫框架', items: [
              { text: 'scrapy', link: '/pages/scrapy/' },
              { text: 'feapder', link: '/pages/feapder/' },
              { text: 'pyspider', link: '/pages/pyspider/' },
            ]
          },
        ]
      },
      {
        text: '辅助查询', link: '/pages/js-hook/', items: [
          { 
            text: '辅助脚本', items: [
              { text: 'JS Hook', link: '/pages/js-hook/' },
              { text: 'Frida API', link: '/pages/frida-api/' },
              { text: 'babel', link: '/pages/babel/' },
            ]
          },
          {
            text: '命令查询', items: [
              { text: 'Linux 命令', link: '/pages/linux/' },
              { text: 'ADB 命令', link: '/pages/adb/' },
              { text: 'ARM 指令集', link: '/pages/arm/' },
              { text: 'Dalvik 指令集', link: '/pages/dalvik/' },
            ]
          },
          {
            text: '指纹信息', items: [
              { text: 'CreepJS', link: '/pages/creepjs/' },
              { text: 'Fingerprint2', link: '/pages/fingerprint2/' },
            ]
          },
          {
            text: '加密算法', items: [
              { text: 'MD5', link: '/pages/md5/' },
              { text: 'Base64', link: '/pages/base64/' },
              { text: 'HMAC', link: '/pages/hmac/' },
              { text: 'SHA', link: '/pages/sha/' },
              { text: 'RC4', link: '/pages/rc4/' },
              { text: 'AES', link: '/pages/aes/' },
              { text: '3DES', link: '/pages/3des/' },
              { text: 'DES', link: '/pages/des/' },
              { text: 'RSA', link: '/pages/rsa/' },
            ]
          },
        ]
      },
      { 
        text: '验证码', link: '/captcha/', items: [
          // { text: '目录总览', link: '/pages/captcha/'},
          { text: '国内验证码', items: [
            { text: '顶象 DING XIANG', link: '/captcha/dingxiang/' },
            { text: '数美 NEXTDATA', link: '/captcha/shumei/' },
            { text: '易盾 NETEASE YIDUN', link: '/captcha/yidun/' },
            { text: '极验 GEETEST', link: '/captcha/geetest-v2/', items: [
              { text: '行为验证 2.0', link: '/captcha/geetest-v2/' },
              { text: '行为验证 3.0', link: '/captcha/geetest-v3/' },
              { text: '行为验证 4.0', link: '/captcha/geetest-v4/' }
            ]},
            { text: '阿里云云盾验证码', link: '/captcha/aliyun-v1/', items: [
              { text: '阿里云云盾验证码 1.0', link: '/captcha/aliyun-v1/' },
              { text: '阿里云云盾验证码 2.0', link: '/captcha/aliyun-v2/' },
            ]},
            { text: '腾讯天御 T-Sec', link: '/captcha/tencent/' },
            { text: '小红书 redCaptcha', link: '/captcha/redcaptcha/' },
            { text: '小盾 XIAODUN', link: '/captcha/xiaodun/' },
            { text: '云片 YUNPIAN', link: '/captcha/yunpian/' },
            { text: '三六零天御', link: '/captcha/360/' },
            { text: '螺丝帽 Luosimao', link: '/captcha/luosimao/' },
            { text: 'Vaptcha', link: '/captcha/vaptcha/' },
            { text: 'V5 验证', link: '/captcha/verify5/' },
            { text: '凯格 KYGER', link: '/captcha/kgcaptcha/' },
            { text: '友验 FastYotest', link: '/captcha/fastyotest/' },
          ]},
          { text: '国外验证码', items: [
            { text: 'Cloudflare Turnstile', link: '/captcha/turnstile-managed/', items: [
              { text: 'Turnstile Managed Challenge', link: '/captcha/turnstile-managed/' },
              { text: 'Turnstile Non-Interactive Challenge', link: '/captcha/turnstile-non-interactive/' },
              { text: 'Turnstile Invisible Challenge', link: '/captcha/turnstile-invisible/' },
            ]},
            { text: 'Google reCAPTCHA', link: '/captcha/recaptcha-v2-checkbox/', items: [
              { text: 'reCAPTCHA V2 Checkbox', link: '/captcha/recaptcha-v2-checkbox/' },
              { text: 'reCAPTCHA v2 Invisible', link: '/captcha/recaptcha-v2-invisible/' },
              { text: 'reCAPTCHA v2 Enterprise', link: '/captcha/recaptcha-v2-enterprise/' },
              { text: 'reCAPTCHA v3', link: '/captcha/recaptcha-v3/' },
              { text: 'reCAPTCHA v3 Enterprise', link: '/captcha/recaptcha-v3-enterprise/' },
            ]},
            { text: 'hCaptcha', link: '/captcha/hcaptcha-easy/', items: [
              { text: 'hCaptcha Easy', link: '/captcha/hcaptcha-easy/' },
              { text: 'hCaptcha Medium', link: '/captcha/hcaptcha-medium/' },
              { text: 'hCaptcha Difficult', link: '/captcha/hcaptcha-difficult/' },
              { text: 'hCaptcha Invisible', link: '/captcha/hcaptcha-invisible/' },
              { text: 'hCaptcha Pro', link: '/captcha/hcaptcha-pro/' },
              { text: 'hCaptcha Enterprise', link: '/captcha/hcaptcha-enterprise/' },
            ]},
            { text: 'Arkose Labs FunCAPTCHA', link: '/captcha/funcaptcha/' },
            { text: 'DataDome CAPTCHA', link: '/captcha/datadome/' },
            { text: 'PerimeterX丨HUMAN Challenge', link: '/captcha/perimeterx/' },
            { text: 'AWS (Amazon) WAF Captcha', link: '/captcha/aws/' },
            { text: 'MTCaptcha', link: '/captcha/mtcaptcha/' },
            { text: 'Lemin CAPTCHA丨Capy Puzzle', link: '/captcha/lemin/' },
            { text: 'Yandex SmartCaptcha', link: '/captcha/yandex/' },
            { text: 'mCaptcha', link: '/captcha/mcaptcha/' },
            { text: 'KeyCAPTCHA', link: '/captcha/keycaptcha/' },
            { text: 'CyberSiARA', link: '/captcha/cybersiara/' },
            { text: 'Friendly Captcha', link: '/captcha/friendly-captcha/' },
            { text: 'ARCaptcha', link: '/captcha/arcaptcha/' },
            { text: 'CaptchaFox', link: '/captcha/captchafox/' },
          ]}
        ]
      },
      { text: '报错处理', link: '/pages/error-handling/' },
      { text: '赞助', link: '/pages/sponsor/' },
    ],
    sidebarDepth: 3, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/logo.png', // 导航栏logo
    repo: 'TRHX/SpiderApi', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

    // docsDir: 'docs', // 编辑的文件夹
    // editLinks: true, // 编辑链接
    // editLinkText: '编辑',

    // 以下配置是Vdoing主题改动的和新增的配置
    sidebar: { mode: 'structuring', collapsable: false }, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

    // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
    updateBar: { // 最近更新栏
      showToArticle: false, // 显示到文章页底部，默认true
      // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    },
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],

    pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    // contentBgStyle: 1,

    category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
    tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
    // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

    author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
      name: 'BOB', // 必需
      href: 'https://github.com/TRHX' // 可选的
    },
    // social: { // 社交图标，显示于博主信息栏和页脚栏
    //   // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
    //   icons: [
    //     {
    //       iconClass: 'icon-youjian',
    //       title: '联系站长',
    //       link: 'mailto:admin@itbob.cn'
    //     },
    //     {
    //       iconClass: 'icon-github',
    //       title: 'GitHub',
    //       link: 'https://github.com/TRHX'
    //     },
    //     {
    //       iconClass: 'icon-blog',
    //       title: '站长博客',
    //       link: 'https://www.itbob.cn/'
    //     }
    //   ]
    // },
    footer: { // 页脚信息
      createYear: 2023, // 博客创建年份
      copyrightInfo: `
      <a href="https://spiderapi.cn/" target="_blank">SpiderApi</a> All Rights Reserved.
      <br/>
      <br/>
      <span>
        <a href="https://beian.miit.gov.cn/" target="_blank"><img src="/img/icp.png" alt="ICP" style="width:20px; height:auto; margin-bottom:-2px"> 鄂ICP备19003281号-9</a>丨
        <a href="https://cloudbase.net/" target="_blank"><img src="/img/cloudbase.png" alt="云开发 CloudBase" style="width:22px; height:auto; margin-bottom:-2px"> CloudBase</a>丨
        <a href="https://v6.51.la/land/3FcHt9RWSQ8XvN5u" target="_blank"><img src="https://sdk.51.la/icon/1-1.png" alt="51la 网站统计" style="width:auto; height:12px; margin-bottom:-1px"></a>丨
        <span id="sitetime">正在载入网站运行时间...</span>
      </span>
      `,
    },
    htmlModules,
  },

  // 插件
  plugins: [
    // [require('./plugins/love-me'), { // 鼠标点击爱心特效
    //   color: '#11a8cd', // 爱心颜色，默认随机色
    //   excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
    // }],

    ['fulltext-search'], // 全文搜索

    // ['thirdparty-search', { // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
    //   thirdparty: [ // 可选，默认 []
    //     {
    //       title: '在GitHub中搜索',
    //       frontUrl: 'https://github.com/search?q=', // 搜索链接的前面部分
    //       behindUrl: '' // 搜索链接的后面部分，可选，默认 ''
    //     },
    //     {
    //       title: '在npm中搜索',
    //       frontUrl: 'https://www.npmjs.com/search?q=',
    //     },
    //     {
    //       title: '在Bing中搜索',
    //       frontUrl: 'https://cn.bing.com/search?q='
    //     }
    //   ]
    // }],

    [
      'vuepress-plugin-baidu-tongji', // 百度统计
      {
        hm: '769c2781bafe36adb3f3fcf97f2d02bd'
      }
    ],

    [
      'sitemap', // sitemap
      {
        hostname: 'https://spiderapi.cn'
      }
    ],

    ['one-click-copy', { // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }],
    ['demo-block', { // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://fastly.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        },
      },
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs') // https://day.js.org/
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      }
    ]
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.js',
    '.vuepress/config/htmlModules.js',
  ]
}
