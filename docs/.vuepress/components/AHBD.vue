<template>
    <div style='text-align: center'>
        <h1>Automated/Headless Browser Detection (AHBD)</h1>
        <div>
            颜色状态：
            <div class="explain-box headful"></div> Normal 正常
            <div class="explain-box headless"></div> Abnormal 异常
            <div class="explain-box undefined"></div> Suspicious 可疑
            <div class="explain-box beta"></div> Bata 测试阶段
        </div>
        <br>
        <div>
            检测对象：
            <div class="explain-box target-box">SE</div> Selenium
            <div class="explain-box target-box">PH</div> Phantomjs
            <div class="explain-box target-box">PL</div> Playwright
            <div class="explain-box target-box">PP</div> Puppeteer / Pyppeteer
            <div class="explain-box target-box">DP</div> DrissionPage
        </div>
        <br>
        <div>
            <div class="explain-box target-box">PE</div> Puppeteer-extra / Playwright-extra
        </div>
        <br>
        <table id='headless-table'>
            <tr>
                <th>测试项目</th>
                <th>测试结果</th>
                <th>正确参考</th>
                <th>检测对象</th>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    mounted() {
        const script1 = document.createElement('script');
        script1.src = 'https://lib.baomitu.com/modernizr/latest/modernizr.min.js';
        script1.async = true;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://static.spiderapi.cn/spiderdoc/js/detection.0.0.2.js';
        script2.async = true;
        document.head.appendChild(script2);

        setTimeout(function() {
            headlessTests.forEach(function(test) {
                generateTableRow(test);
                testBrowser(test).then(function(res) {});
            });
        }, 500)
    },
};
</script>

<style>
    #headless-table, #headless-table th, #headless-table td {
        border: 2px solid black;
        border-collapse: collapse;
        padding: 10px;
        text-align: center;
    }
    #headless-table th {
        font-size: large;
    }
    #headless-table td:nth-child(1) {
        max-width: 150px;
    }
    #headless-table td:nth-child(2) {
        max-width: 300px;
    }
    #headless-table td:nth-child(3) {
        max-width: 150px;
    }
    .headful {
        background-color: #00ff00 !important;
    }
    .headless {
        background-color: #ff0000 !important;
    }
    .undefined {
        background-color: #ffff00 !important;
    }
    .beta {
        background-color: #b45ddf !important;
    }
    .explain-box {
        height: 15px;
        width: 15px;
        margin-right: 3px;
        margin-left: 3px;
        border: 1px solid black;
        display: inline-block;
    }
    .target-box {
        text-align: center;
        font-size: 10px;
        color: white;
        background-color: #0078D7;
    }
</style>
