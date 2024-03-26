var HEADLESS  = 1;
var HEADFUL   = 0;
var UNDEFINED = -1;
var BETA = -2


// Test for user agent
function testUserAgent(resultBlock) {
    var userAgent = navigator.userAgent;
    var testResult1 = /Headless/i.test(userAgent);
    var testResult2 = /PhantomJS/i.test(userAgent);
    var testResult = testResult1 || testResult2;
    writeToBlock(resultBlock, userAgent);
    return testResult ? HEADLESS : HEADFUL
}

// Test for app version (almost equal to user agent)
function testAppVersion(resultBlock) {
    var appVersion = navigator.appVersion;
    var testResult = /headless/i.test(appVersion);
    writeToBlock(resultBlock, appVersion);
    return testResult ? HEADLESS : HEADFUL
}

// Test for languages
function testLanguages(resultBlock) {
    var language = navigator.languages;
    var languagesLength = navigator.languages.length;

    var result = `languages: ${language}`;
    writeToBlock(resultBlock, result);

    if (!language || languagesLength === 0)
        return HEADLESS;
    return HEADFUL;
}


// Test for Webdriver
function testWebdriver(resultBlock) {
    var webdriver = navigator.webdriver;
    writeToBlock(resultBlock, webdriver);
    return webdriver ? HEADLESS : HEADFUL;
}

// Test for document attribute
function testWebdriverDocumentAttribute(resultBlock) {
    var documentAttributeKeys = {
        "__driver_evaluate": "undefined",
        "__driver_unwrapped": "undefined",
        "__webdriver_evaluate": "undefined",
        "__webdriver_unwrapped": "undefined",
        "__selenium_evaluate": "undefined",
        "__selenium_unwrapped": "undefined",
        "__fxdriver_evaluate": "undefined",
        "__fxdriver_unwrapped": "undefined",
        "__webdriver_script_fn": "undefined",
        "__webdriver_script_func": "undefined",
        "__webdriver_script_function": "undefined",
        "webdriver": "undefined",
        "_Selenium_IDE_Recorder": "undefined",
        "_selenium": "undefined",
        "calledSelenium": "undefined",
        "_WEBDRIVER_ELEM_CACHE": "undefined",
        "ChromeDriverw": "undefined",
        "driver-evaluate": "undefined",
        "webdriver-evaluate": "undefined",
        "selenium-evaluate": "undefined",
        "webdriverCommand": "undefined",
        "webdriver-evaluate-response": "undefined",
        "__webdriverFunc": "undefined",
        "__$webdriverAsyncExecutor": "undefined",
        "__lastWatirAlert": "undefined",
        "__lastWatirConfirm": "undefined",
        "__lastWatirPrompt": "undefined",
        "$chrome_asyncScriptInfo": "undefined",
        "$cdc_asdjflasutopfhvcZLmcfl_": "undefined"
    };
    var documentElementAttributeKeys = {
        "selenium": "undefined",
        "webdriver": "undefined",
        "driver": "undefined"
    }

    var documentAttributeTest = {};

    var testResult = false;
    for (var key in documentAttributeKeys) {
        var value = window.document[key];
        if (value) {
            documentAttributeTest[key] = true;
            testResult = true;
        }
    }
    for (var key in documentElementAttributeKeys) {
        var value = window.document.documentElement.getAttribute(key);
        if (value) {
            documentAttributeTest["getAttribute('" + key + "')"] = true;
            testResult = true;
        }
    }

    writeToBlock(resultBlock, testResult ? JSON.stringify(documentAttributeTest) : undefined);
    return testResult ? HEADLESS : HEADFUL;
}

// Test for window attribute
function testWebdriverWindowAttribute(resultBlock) {
    var windowAttributeKeys = {
        "_phantom": "undefined",
        "__nightmare": "undefined",
        "_selenium": "undefined",
        "callPhantom": "undefined",
        "callSelenium": "undefined",
        "_Selenium_IDE_Recorder": "undefined",
    };
    var windowAttributeTest = {};

    var testResult = false;
    for (var key in windowAttributeKeys) {
        var value = window[key];
        if (value) {
            windowAttributeTest[key] = true;
            testResult = true;
        }
    }
    if (window.external && window.external.toString() && (window.external.toString().indexOf("Sequentum") !== -1)) {
        windowAttributeTest["Sequentum"] = true;
        testResult = true;
    }

    writeToBlock(resultBlock, testResult ? JSON.stringify(windowAttributeTest) : undefined);
    return testResult ? HEADLESS : HEADFUL;
}

// Test for cdc attribute
function testCDCAttribute(resultBlock) {
    var matches = []
    for(var prop in window) {
        prop.match(/cdc_\S/ig) && matches.push(prop)
    }
    writeToBlock(resultBlock, JSON.stringify(matches));

    function hasvarructorAlias(window, varructor) {
        for (var prop of window.Object.getOwnPropertyNames(window)) {
            if (prop === varructor.name) continue;
            if (window[prop] === varructor) return true;
        }
        return false;
    }
    var testResult = hasvarructorAlias(window, window.Array)
        && hasvarructorAlias(window, window.Promise)
        && hasvarructorAlias(window, window.Symbol)
        && matches.length > 0;

    return testResult ? HEADLESS : HEADFUL;
}

// Test for chrome (especific for google chrome browser)
function testChrome(resultBlock) {
    var chrome = window.chrome;
    writeToBlock(resultBlock, chrome ? true : undefined);
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("WebKit") !== -1) {
        return chrome ? HEADFUL : HEADLESS;
    }
    return HEADFUL;
}

// Test for permission
async function testPermission(resultBlock) {
    if (!navigator.permissions) {
        writeToBlock(resultBlock, "navigator.permissions is undefined.");
        return UNDEFINED;
    }

    try {
        var permissionStatus = await navigator.permissions.query({name: "notifications"});
        var notificationPermission = Notification.permission;
        var result = `Notification.permission: ${notificationPermission}<br/>navigator.permissions: ${permissionStatus.state}`;
        writeToBlock(resultBlock, result);

        if (notificationPermission === "denied" && permissionStatus.state === "prompt") {
            return HEADLESS;
        }
        return HEADFUL;
    } catch (e) {
        writeToBlock(resultBlock, e);
        return HEADLESS;
    }
}

// Test for Plugins Length
function testPluginsLength(resultBlock) {
    var pluginsLength = navigator.plugins.length;
    writeToBlock(resultBlock, pluginsLength);
    return pluginsLength === 0 ? HEADLESS : HEADFUL;
}

// Tests for plugins prototype and type
function testPluginsPrototypeAndType(resultBlock) {
    var pluginsLength = navigator.plugins.length;
    if (pluginsLength === 0) {
        writeToBlock(resultBlock, `Plugins Prototype Test: failed<br/>Plugins Type Test: failed`);
        return HEADLESS;
    } else {
        var prototypeTest = PluginArray.prototype === navigator.plugins.__proto__ && Plugin.prototype === navigator.plugins[0].__proto__;
        var typeTest = navigator.plugins instanceof PluginArray && navigator.plugins[0].toString() === '[object Plugin]';
        var prototypeTestResult = "Plugins Prototype Test: " + (prototypeTest ? "passed" : "failed");
        var typeTestResult =  "Plugins Type Test: " + (typeTest ? "passed" : "failed");
        writeToBlock(resultBlock, `${typeTestResult}<br/>${prototypeTestResult}`);
        return prototypeTest && typeTest ? HEADFUL : HEADLESS;
    }
}

// Test for mimeTypes length
function testMimeTypesLength(resultBlock) {
    var mimeTypesLength = navigator.mimeTypes.length;
    writeToBlock(resultBlock, mimeTypesLength);
    return mimeTypesLength === 0 ? HEADLESS : HEADFUL;
}

// Tests for mimeTypes prototype and type
function testMimeTypesPrototypeAndType(resultBlock) {
    var mimeTypesLength = navigator.mimeTypes.length;
    if (mimeTypesLength === 0) {
        writeToBlock(resultBlock, `mimeTypes Prototype Test: failed<br/>mimeTypes Type Test: failed`);
        return HEADLESS;
    } else {
        var prototypeTest = MimeTypeArray.prototype === navigator.mimeTypes.__proto__ && MimeType.prototype === navigator.mimeTypes[0].__proto__;
        var typeTest = navigator.mimeTypes instanceof MimeTypeArray && navigator.mimeTypes[0].toString() === '[object MimeType]';
        var prototypeTestResult = "mimeTypes Prototype Test: " + (prototypeTest ? "passed" : "failed");
        var typeTestResult =  "mimeTypes Type Test: " + (typeTest ? "passed" : "failed");
        writeToBlock(resultBlock, `${typeTestResult}<br/>${prototypeTestResult}`);
        return prototypeTest && typeTest ? HEADFUL : HEADLESS;
    }
}

// Test for connection-rtt
function testConnectionRtt(resultBlock) {
    var connection = navigator.connection;
    var connectionRtt = connection ? connection.rtt : undefined;
    writeToBlock(resultBlock, connectionRtt)
    if (connectionRtt === undefined) {
        return UNDEFINED;
    } else {
        return connectionRtt === 0 ? HEADLESS : HEADFUL;
    }
}

// Test for WebGL Vendor
function testWebGLVendor(resultBlock) {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl") || canvas.getContext("webgl-experimental");
    if (gl) {
        var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        try {
            var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            writeToBlock(resultBlock, vendor)
            if (vendor === "Brian Paul" || vendor === "Google Inc.") {
                return HEADLESS;
            } else {
                return HEADFUL;
            }
        } catch (e) {
            writeToBlock(resultBlock, "undefined")
            return UNDEFINED;
        }
    } else {
        writeToBlock(resultBlock, "undefined")
        return HEADLESS;
    }
}

// Test for WebGL Renderer
function testWebGLRenderer(resultBlock) {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl") || canvas.getContext("webgl-experimental");
    if (gl) {
        var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        try {
            var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            writeToBlock(resultBlock, renderer)
            if (renderer === "Mesa OffScreen" || renderer.indexOf("Swift") !== -1) {
                return HEADLESS;
            } else {
                return HEADFUL;
            }
        } catch (e) {
            writeToBlock(resultBlock, "undefined")
            return HEADLESS;
        }
    } else {
        writeToBlock(resultBlock, "undefined")
        return HEADLESS;
    }
}

// Test for time elapsed after alert(). If it's closed too fast (< 30ms), it means the browser may be headless
function testAlertElapsedTime(resultBlock) {
    writeToBlock(resultBlock, "点击此区域测试弹窗关闭耗时")
    resultBlock.addEventListener("click", function() {
        var start = Date.now();
        alert("Alert Time Elapse Test.\nAlert 弹窗关闭耗时测试。");
        var elapse = Date.now() - start;
        writeToBlock(resultBlock, `${elapse} ms`)
        resultBlock.parentElement.classList.remove("undefined");
        if (elapse < 30) {
            resultBlock.parentElement.classList.add("headless");
        } else {
            resultBlock.parentElement.classList.add("headful");
        }
    });
}

// Test for time elapsed after console.table
function testConsovarableElapsedTime(resultBlock) {
    var consovarabvarime = 0;
    (function (f, K) {
        var o = O;
        var d = f();

        while (!![]) {
            try {
                var C = -parseInt(o(404)) / 1 * (parseInt(o(400)) / 2) + parseInt(o(398)) / 3 * (parseInt(o(401)) / 4) + parseInt(o(408)) / 5 * (-parseInt(o(395)) / 6) + parseInt(o(406)) / 7 + parseInt(o(399)) / 8 + -parseInt(o(402)) / 9 + -parseInt(o(407)) / 10 * (parseInt(o(397)) / 11);
                if (C === K) break; else d.push(d.shift());
            } catch (L) {
                console.log(L);
                d.push(d.shift());
            }
        }
    })(z, 648894);

    !function () {
        var f = {};
        var K = [];

        for (var L = 0; L < 5000; L++) f[L] = L;

        for (var R = 0; R < 50; R += 1) K.push(f);

        var timeBegin = performance.now();
        console.groupCollapsed("");
        console.table(K);
        console.groupEnd();
        consovarabvarime = (performance.now() - timeBegin).toFixed(2);
    }();

    function O(f, K) {
        var d = z();
        return O = function (C, L) {
            C = C - 394;
            return d[C];
        }, O(f, K);
    }

    function z() {
        var h = ["16gDNyHG", "groupColla", "8422918jCSZOp", "170aHjdmy", "265WFhIGI", "psed", "94158QDJrQI", "push", "762773HQdsfm", "3KzFBSj", "9513040OWgaws", "17042qzsOnC", "4061104XbQIyi", "5507010MWdRuq", "now"];
        z = function () {
            return h;
        };
        return z();
    }

    writeToBlock(resultBlock, `${consovarabvarime} ms`)
    return consovarabvarime < 5 ? HEADFUL : HEADLESS;
}

// Test for missing image, worked in Chrome 59, but no longer works in Chrome 60.
async function testMissingImage(resultBlock) {
    var testResult = await new Promise((resolve) => {
        var element = document.getElementById("missing-image-result");
        var image = document.createElement("img");
        image.src = "404_image.png";
        element.appendChild(image);
        image.onerror = function() {
            var imageWidth = image.width;
            var imageHeight = image.height;
            writeToBlock(resultBlock, `image width: ${imageWidth}<br/>image height: ${imageHeight}`);
            if (imageWidth === 0 && imageHeight === 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
    });
    return testResult ? HEADLESS : HEADFUL;
}

// Test for mouse event (analyze attributes movementX and movementY)
function testMouseMove(resultBlock) {
    var zeroMovement = true;
    var mouseEventCounter = 0;

    document.getElementsByTagName("body")[0].addEventListener("mousemove", mouseEvent);
    writeToBlock(resultBlock, "移动鼠标开始检测轨迹");

    function mouseEvent(event) {
        zeroMovement = zeroMovement && (event.movementX === 0 && event.movementY === 0);

        // Analyze 50 mouse events until give result
        if (mouseEventCounter > 50) {
            document.getElementsByTagName("body")[0].removeEventListener("mousemove", mouseEvent);
            writeToBlock(resultBlock, `movementX: ${event.movementX}<br/>movementY: ${event.movementY}`);
            resultBlock.parentElement.classList.remove("undefined");
            if (zeroMovement) {
                // writeToBlock(resultBlock, "movementX and movementY are 0 in every mouse event");
                resultBlock.parentElement.classList.add("headless");
            } else {
                // writeToBlock(resultBlock, "movementX and movementY vary in mouse events");
                resultBlock.parentElement.classList.add("headful");
            }
        }
        mouseEventCounter++;
    }
}

// Test for screen size (abandoned)
function testScreenSize(resultBlock) {
    var width = screen.width;
    var height = screen.height;
    var availWidth = screen.availWidth;
    var availHeight = screen.availHeight;
    var outerWidth = window.outerWidth;
    var outerHeight = window.outerHeight;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    writeToBlock(resultBlock, `
        screen.width: ${width}<br/>
        screen.height: ${height}<br/>
        screen.availWidth: ${availWidth}<br/>
        screen.availHeight: ${availHeight}<br/>
        window.outerWidth: ${outerWidth}<br/>
        window.outerHeight: ${outerHeight}<br/>
        window.innerWidth: ${innerWidth}<br/>
        window.innerHeight: ${innerHeight}<br/>`
    );
    var testResult = width !== 0 && height !== 0 &&
        availWidth !== 0 && availHeight !== 0 && outerWidth !== 0 &&
        outerHeight !== 0 && innerWidth !==0 && outerWidth !== 0 &&
        width >= availWidth &&  height >= availHeight &&
        outerWidth >= innerWidth &&  outerHeight >= innerHeight;

    return testResult ? HEADFUL : HEADLESS;
}

// Test for browser features (only hidpi/retina screen, abandoned)
// https://lib.baomitu.com/modernizr/latest/modernizr.min.js
function testBrowserFeatures(resultBlock) {
    var hairline = Modernizr.hairline
    writeToBlock(resultBlock, hairline);
    return hairline ? HEADFUL : UNDEFINED;
}

function testIFrame(resultBlock) {
    /*
    https://github.com/puppeteer/puppeteer/issues/1106
    https://github.com/paulirish/headless-cat-n-mouse/blob/master/detect-headless.js
    https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow
    */
    window.iframeTestFlag = "true";
    var srcdocIframe = (() => {
        var el = document.createElement("iframe");
        el.srcdoc = "Puppeteer Extra Test";
        document.body.appendChild(el);
        var flag = el.contentWindow.iframeTestFlag;
        document.body.removeChild(el);
        return flag;
    })();
    writeToBlock(resultBlock, `${srcdocIframe}`);
    return srcdocIframe === undefined ? HEADFUL : HEADLESS;
}

function testErrorStack(resultBlock) {
    // https://github.com/berstend/puppeteer-extra/issues/239
    // https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/sourceurl
    writeToBlock(resultBlock, "false");
    function doTest() {
        var err = new Error("Test Error Stack");
        var stackString = err.stack.toString();
        var testResult = stackString.includes("pptr:evaluate") || stackString.includes("puppeteer_evaluation_script") || stackString.includes("phantomjs")
        writeToBlock(resultBlock, testResult);
        resultBlock.parentElement.classList.remove("headful");
        if (testResult) {
            resultBlock.parentElement.classList.add("headless");
        } else {
            resultBlock.parentElement.classList.add("headful");
        }
    }
    function overrideFunction(item) {
        item.obj[item.propName] = (function(orig) {
            return function() {
                doTest()
                return orig.apply(this, arguments)
            }
        })(item.obj[item.propName])
    }
    overrideFunction({
        propName: "querySelector",
        obj: document
    })
    return HEADFUL;
}

function writeToBlock(block, text) {
    block.innerHTML = text;
}

function writeToTarget(block, text) {
    var target = text.split('/');
    target.forEach(tt => {
        var divElement = document.createElement("div");
        divElement.classList.add("target-box");
        divElement.classList.add("explain-box")
        block.appendChild(divElement);
        divElement.innerHTML = tt;
    });
}

// Create table row for each item
function generateTableRow(test) {
    var table = document.getElementById("headless-table");
    var row = table.insertRow();
    row.id = test.id;
    var nameBlock   = row.insertCell();
    var resultBlock = row.insertCell();
    var correctBlock = row.insertCell();
    var targetBlock = row.insertCell();
    writeToBlock(nameBlock, test.name);
    writeToBlock(correctBlock, test.correct);
    writeToTarget(targetBlock, test.target);
    resultBlock.id = `${test.id}-result`;
}

async function testBrowser(test) {
    var row = document.getElementById(test.id);
    var resultBlock = document.getElementById(`${test.id}-result`);
    var correctBlock = document.getElementById(`${test.id}-correct`);
    var testType = document.getElementById(`${test.id}-type`);
    var result = await test.testFunction(resultBlock, correctBlock, testType);
    if (result === HEADLESS)
        row.classList.add("headless");
    else if (result === HEADFUL)
        row.classList.add("headful");
    else if (result === BETA)
        row.classList.add("beta");
    else
        row.classList.add("undefined")
}

// All testing items
var headlessTests = [
    { name: "User Agent",                   id: "user-agent",                correct: "不含 Headless/PhantomJS 关键字",           target: "SE/PH/PL/PP/DP",    testFunction: testUserAgent                  },
    { name: "App Version",                  id: "app-version",               correct: "不含 Headless/PhantomJS 关键字",           target: "SE/PH/PL/PP/DP",    testFunction: testAppVersion                 },
    { name: "Languages",                    id: "languages",                 correct: "至少包含一种语言",                          target: "SE/PH/PL/PP",       testFunction: testLanguages                  },
    { name: "Webdriver",                    id: "webdriver",                 correct: "false",                                   target: "SE/PH/PL/PP",       testFunction: testWebdriver                  },
    { name: "Window Attribute",             id: "window-attribute",          correct: "undefined",                               target: "SE/PH",             testFunction: testWebdriverWindowAttribute   },
    { name: "Document Attribute",           id: "document-attribute",        correct: "undefined",                               target: "SE/PH",             testFunction: testWebdriverDocumentAttribute },
    { name: "CDC Attribute",                id: "cdc-attribute",             correct: "[]",                                      target: "SE",                testFunction: testCDCAttribute               },
    { name: "Chrome",                       id: "chrome-element",            correct: "webkit/blink 内核为 true",                 target: "SE/PH/PL/PP",       testFunction: testChrome                     },
    { name: "Permission",                   id: "permission",                correct: `default<br/>prompt`,                      target: "SE/PH/PL/PP",       testFunction: testPermission                 },
    { name: "Plugins Length",               id: "plugins-length",            correct: "> 0",                                     target: "SE/PH/PL/PP",       testFunction: testPluginsLength              },
    { name: "Plugins Prototype and Type",   id: "plugins-prototype-type",    correct: "passed",                                  target: "SE/PH/PL/PP",       testFunction: testPluginsPrototypeAndType    },
    { name: "mimeTypes Length",             id: "mimetypes-length",          correct: "> 0",                                     target: "SE/PH/PL/PP",       testFunction: testMimeTypesLength            },
    { name: "mimeTypes Prototype and Type", id: "mimetypes-prototype-type",  correct: "passed",                                  target: "SE/PH/PL/PP",       testFunction: testMimeTypesPrototypeAndType  },
    { name: "Connection Rtt",               id: "connection-rtt",            correct: "> 0",                                     target: "SE/PH/PL/PP",       testFunction: testConnectionRtt              },
    { name: "WebGL Vendor",                 id: "webgl-vendor",              correct: `!= Brian Paul<br/>!= undefined`,          target: "SE/PH/PL/PP",       testFunction: testWebGLVendor                },
    { name: "WebGL Renderer",               id: "webgl-renderer",            correct: `!= Mesa OffScreen<br/>不含 Swift 关键字`,   target: "SE/PH/PL/PP/DP",    testFunction: testWebGLRenderer              },
    { name: "Alert Elapsed Time",           id: "alert-elapsed-time",        correct: "> 30 ms",                                 target: "SE/PH/PL/PP/PE",    testFunction: testAlertElapsedTime           },
    { name: "console.table Elapsed Time",   id: "console-elapsed-time",      correct: "< 5 ms",                                  target: "SE/PH/PL/PP/PE",    testFunction: testConsovarableElapsedTime    },
    { name: "Missing Image",                id: "missing-image",             correct: "> 0",                                     target: "SE/PH/PL/PP",       testFunction: testMissingImage               },
    { name: "Mouse Move",                   id: "mouse-move",                correct: "!= 0",                                    target: "SE/PH/PL/PP/PE/DP", testFunction: testMouseMove                  },
    { name: "Screen Size",                  id: "screen-size",               correct: `> 0<br/>width >= availWidth<br/>height >= availHeight<br/>outerWidth >= innerWidth<br/>outerHeight >= innerHeight`, target: "SE/PH/PL/PP", testFunction: testScreenSize },
    { name: "Browser features",             id: "browser-features",          correct: "HiDPI/Retina 屏幕为 true",                 target: "SE/PH/PL/PP/PE",    testFunction: testBrowserFeatures            },
    { name: "iFrame srcdoc",                id: "iframe-srcdoc",             correct: "undefined",                               target: "PE",                testFunction: testIFrame                     },
    { name: "Error Stack",                  id: "error-stack",               correct: "false",                                   target: "PP/PE",             testFunction: testErrorStack                 },
];


// headlessTests.forEach(test => {
//     generateTableRow(test);
//     testBrowser(test).then(res => {});
// });

