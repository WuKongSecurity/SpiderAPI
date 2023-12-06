let HEADLESS  = 1;
let HEADFUL   = 0;
let UNDEFINED = -1;


// Test for user agent
function testUserAgent(resultBlock) {
    const userAgent = navigator.userAgent;
    const testResult = /headless/i.test(userAgent);
    writeToBlock(resultBlock, userAgent);
    return testResult ? HEADLESS : HEADFUL
}

// Test for app version (almost equal to user agent)
function testAppVersion(resultBlock) {
    const appVersion = navigator.appVersion;
    const testResult = /headless/i.test(appVersion);
    writeToBlock(resultBlock, appVersion);
    return testResult ? HEADLESS : HEADFUL
}

// Test for languages
function testLanguages(resultBlock) {
    const language = navigator.language;
    const languagesLength = navigator.languages.length;

    const result = `navigator.language: ${language}<br/>navigator.languages.length: ${languagesLength}`;
    writeToBlock(resultBlock, result);

    if (!language || languagesLength === 0)
        return HEADLESS;
    return HEADFUL;
}


// Test for Webdriver
function testWebdriver(resultBlock) {
    const webdriver = navigator.webdriver;
    writeToBlock(resultBlock, webdriver);
    return webdriver ? HEADLESS : HEADFUL;
}

// Test for document attribute
function testWebdriverDocumentAttribute(resultBlock) {
    const documentAttributeKeys = {
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
    const documentElementAttributeKeys = {
        "selenium": "undefined",
        "webdriver": "undefined",
        "driver": "undefined"
    }

    const documentAttributeTest = {};

    let testResult = false;
    for (const key in documentAttributeKeys) {
        const value = window.document[key];
        if (value) {
            documentAttributeTest[key] = true;
            testResult = true;
        }
    }
    for (const key in documentElementAttributeKeys) {
        const value = window.document.documentElement.getAttribute(key);
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
    const windowAttributeKeys = {
        "_phantom": "undefined",
        "__nightmare": "undefined",
        "_selenium": "undefined",
        "callPhantom": "undefined",
        "callSelenium": "undefined",
        "_Selenium_IDE_Recorder": "undefined",
    };
    const windowAttributeTest = {};

    let testResult = false;
    for (const key in windowAttributeKeys) {
        const value = window[key];
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
    let matches = []
    for(const prop in window) {
        prop.match(/cdc_\S/ig) && matches.push(prop)
    }
    writeToBlock(resultBlock, JSON.stringify(matches));
    return matches.length > 0 ? HEADLESS : HEADFUL;
}

// Test for chrome (especific for google chrome browser)
function testChrome(resultBlock) {
    const chrome = window.chrome;
    writeToBlock(resultBlock, chrome ? true : undefined);
    return chrome ? HEADFUL : UNDEFINED;
}

// Test for permission
async function testPermission(resultBlock) {
    if (!navigator.permissions) {
        writeToBlock(resultBlock, "navigator.permissions is undefined.");
        return UNDEFINED;
    }

    const permissionStatus = await navigator.permissions.query({ name: "notifications" });
    const notificationPermission = Notification.permission;
    const result = `Notification.permission: ${notificationPermission}<br/>navigator.permissions: ${permissionStatus.state}`;
    writeToBlock(resultBlock, result);

    if (notificationPermission === "denied" && permissionStatus.state === "prompt") {
        return HEADLESS;
    }
    return HEADFUL;
}

// Test for Plugins Length
function testPluginsLength(resultBlock) {
    const pluginsLength = navigator.plugins.length;
    writeToBlock(resultBlock, pluginsLength);
    return pluginsLength === 0 ? HEADLESS : HEADFUL;
}

// Tests for plugins prototype and type
function testPluginsPrototypeAndType(resultBlock) {
    const pluginsLength = navigator.plugins.length;
    if (pluginsLength === 0) {
        writeToBlock(resultBlock, `Plugins Prototype Test: failed<br/>Plugins Type Test: failed`);
        return HEADLESS;
    } else {
        const prototypeTest = PluginArray.prototype === navigator.plugins.__proto__ && Plugin.prototype === navigator.plugins[0].__proto__;
        const typeTest = navigator.plugins instanceof PluginArray && navigator.plugins[0].toString() === '[object Plugin]';
        const prototypeTestResult = "Plugins Prototype Test: " + (prototypeTest ? "passed" : "failed");
        const typeTestResult =  "Plugins Type Test: " + (typeTest ? "passed" : "failed");
        writeToBlock(resultBlock, `${typeTestResult}<br/>${prototypeTestResult}`);
        return prototypeTest && typeTest ? HEADFUL : HEADLESS;
    }
}

// Test for mimeTypes length
function testMimeTypesLength(resultBlock) {
    const mimeTypesLength = navigator.mimeTypes.length;
    writeToBlock(resultBlock, mimeTypesLength);
    return mimeTypesLength === 0 ? HEADLESS : HEADFUL;
}

// Tests for mimeTypes prototype and type
function testMimeTypesPrototypeAndType(resultBlock) {
    const mimeTypesLength = navigator.mimeTypes.length;
    if (mimeTypesLength === 0) {
        writeToBlock(resultBlock, `mimeTypes Prototype Test: failed<br/>mimeTypes Type Test: failed`);
        return HEADLESS;
    } else {
        const prototypeTest = MimeTypeArray.prototype === navigator.mimeTypes.__proto__ && MimeType.prototype === navigator.mimeTypes[0].__proto__;
        const typeTest = navigator.mimeTypes instanceof MimeTypeArray && navigator.mimeTypes[0].toString() === '[object MimeType]';
        const prototypeTestResult = "mimeTypes Prototype Test: " + (prototypeTest ? "passed" : "failed");
        const typeTestResult =  "mimeTypes Type Test: " + (typeTest ? "passed" : "failed");
        writeToBlock(resultBlock, `${typeTestResult}<br/>${prototypeTestResult}`);
        return prototypeTest && typeTest ? HEADFUL : HEADLESS;
    }
}

// Test for connection-rtt
function testConnectionRtt(resultBlock) {
    const connection = navigator.connection;
    const connectionRtt = connection ? connection.rtt : undefined;
    writeToBlock(resultBlock, connectionRtt)
    if (connectionRtt === undefined) {
        return UNDEFINED;
    } else {
        return connectionRtt === 0 ? HEADLESS : HEADFUL;
    }
}

// Test for WebGL Vendor
function testWebGLVendor(resultBlock) {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl-experimental");
    if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        try {
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
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
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl-experimental");
    if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        try {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            writeToBlock(resultBlock, renderer)
            if (renderer === "Mesa OffScreen" || renderer.indexOf("Swift") !== -1) {
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

// Test for time elapsed after alert(). If it's closed too fast (< 30ms), it means the browser may be headless
function testAlertElapsedTime(resultBlock) {
    const start = Date.now();
    alert("Alert Time Elapse Test.\nAlert 弹窗关闭耗时测试。");
    const elapse = Date.now() - start;
    writeToBlock(resultBlock, `${elapse} ms`)
    return elapse < 30 ? HEADLESS : HEADFUL;
}

// Test for time elapsed after console.table
function testConsoleTableElapsedTime(resultBlock) {
    let consoleTableTime = 0;
    (function (f, K) {
        const o = O;
        const d = f();

        while (!![]) {
            try {
                const C = -parseInt(o(404)) / 1 * (parseInt(o(400)) / 2) + parseInt(o(398)) / 3 * (parseInt(o(401)) / 4) + parseInt(o(408)) / 5 * (-parseInt(o(395)) / 6) + parseInt(o(406)) / 7 + parseInt(o(399)) / 8 + -parseInt(o(402)) / 9 + -parseInt(o(407)) / 10 * (parseInt(o(397)) / 11);
                if (C === K) break; else d.push(d.shift());
            } catch (L) {
                console.log(L);
                d.push(d.shift());
            }
        }
    })(z, 648894);

    !function () {
        let f = {};
        let K = [];

        for (let L = 0; L < 5000; L++) f[L] = L;

        for (let R = 0; R < 50; R += 1) K.push(f);

        const timeBegin = performance.now();
        console.groupCollapsed("");
        console.table(K);
        console.groupEnd();
        consoleTableTime = (performance.now() - timeBegin).toFixed(2);
    }();

    function O(f, K) {
        const d = z();
        return O = function (C, L) {
            C = C - 394;
            return d[C];
        }, O(f, K);
    }

    function z() {
        const h = ["16gDNyHG", "groupColla", "8422918jCSZOp", "170aHjdmy", "265WFhIGI", "psed", "94158QDJrQI", "push", "762773HQdsfm", "3KzFBSj", "9513040OWgaws", "17042qzsOnC", "4061104XbQIyi", "5507010MWdRuq", "now"];
        z = function () {
            return h;
        };
        return z();
    }

    writeToBlock(resultBlock, `${consoleTableTime} ms`)
    return consoleTableTime < 5 ? HEADFUL : UNDEFINED;
}

// Test for missing image
async function testMissingImage(resultBlock) {
    const testResult = await new Promise((resolve) => {
        const element = document.getElementById("missing-image-result");
        const image = document.createElement("img");
        image.src = "404_image.png";
        element.appendChild(image);

        image.onerror = function() {
            const imageWidth = image.width;
            const imageHeight = image.height;
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
    let zeroMovement = true;
    let mouseEventCounter = 0;

    document.getElementsByTagName("body")[0].addEventListener("mousemove", mouseEvent);
    writeToBlock(resultBlock, `movementX: 0<br/>movementY: 0<br/>Move your mouse`);

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

// Test for devtools protocol (abandoned)
function testDevtoolsStatus(resultBlock) {
    const any = /./;
    let count = 0;
    let oldToString = any.toString;

    any.toString = function() {
        count++;
        return "any";
    }

    console.debug(any);
    let usingDevTools = count > 1;
    any.toString = oldToString;
    writeToBlock(resultBlock, usingDevTools ? "open" : "close")
    return usingDevTools ? UNDEFINED : HEADFUL;
}

// Test for outerHeight and outerWidth (abandoned)
function testWindowOuter(resultBlock) {
    const outerHeight = window.outerHeight;
    const outerWidth  = window.outerWidth;
    writeToBlock(resultBlock, `window.outerHeight: ${outerHeight}<br/>window.outerWidth: ${outerWidth}`);
    return (outerHeight === 0 && outerWidth === 0) ? HEADLESS : HEADFUL;
}

// Test for browser features (only hidpi/retina screen, abandoned)
function testBrowserFeatures(resultBlock) {
    const hairline = Modernizr.hairline
    writeToBlock(resultBlock, hairline);
    return hairline ? HEADFUL : UNDEFINED;
}

function writeToBlock(block, text) {
    block.innerHTML = text;
}

function writeToTarget(block, text) {
    let target = text.split('/');
    target.forEach(tt => {
        let divElement = document.createElement("div");
        divElement.classList.add("target-box");
        divElement.classList.add("explain-box")
        block.appendChild(divElement);
        divElement.innerHTML = tt;
    });
}

// Create table row for each item
function generateTableRow(test) {
    let table = document.getElementById("headless-table");
    let row = table.insertRow();
    row.id = test.id;
    let nameBlock   = row.insertCell();
    let resultBlock = row.insertCell();
    let correctBlock = row.insertCell();
    let targetBlock = row.insertCell();
    writeToBlock(nameBlock, test.name);
    writeToBlock(correctBlock, test.correct);
    writeToTarget(targetBlock, test.target);
    resultBlock.id = `${test.id}-result`;
}

async function testBrowser(test) {
    const row         = document.getElementById(test.id);
    const resultBlock = document.getElementById(`${test.id}-result`);
    const correctBlock = document.getElementById(`${test.id}-correct`);
    const testType = document.getElementById(`${test.id}-type`);
    const result = await test.testFunction(resultBlock, correctBlock, testType);
    if (result === HEADLESS)
        row.classList.add("headless");
    else if (result === HEADFUL)
        row.classList.add("headful");
    else
        row.classList.add("undefined");
}

// All testing items
const headlessTests = [
    { name: "User Agent",                   id: "user-agent",                correct: "不含 headless 关键字",                     target: "SE/PH/PL/PP",  testFunction: testUserAgent                  },
    { name: "App Version",                  id: "app-version",               correct: "不含 headless 关键字",                     target: "SE/PH/PL/PP",  testFunction: testAppVersion                 },
    { name: "Languages",                    id: "languages",                 correct: "至少包含一种语言",                          target: "SE/PH/PL/PP",  testFunction: testLanguages                  },
    { name: "Webdriver",                    id: "webdriver",                 correct: "false",                                   target: "SE/PH/PL/PP",  testFunction: testWebdriver                  },
    { name: "Window Attribute",             id: "window-attribute",          correct: "undefined",                               target: "SE/PH",        testFunction: testWebdriverWindowAttribute   },
    { name: "Document Attribute",           id: "document-attribute",        correct: "undefined",                               target: "SE/PH",        testFunction: testWebdriverDocumentAttribute },
    { name: "CDC Attribute",                id: "cdc-attribute",             correct: "[]",                                      target: "SE",           testFunction: testCDCAttribute               },
    { name: "Chrome",                       id: "chrome-element",            correct: "webkit 内核浏览器为 true",                  target: "SE/PH/PL/PP",  testFunction: testChrome                     },
    { name: "Permission",                   id: "permission",                correct: `default<br/>prompt`,                      target: "SE/PH/PL/PP",  testFunction: testPermission                 },
    { name: "Plugins Length",               id: "plugins-length",            correct: "> 0",                                     target: "SE/PH/PL/PP",  testFunction: testPluginsLength              },
    { name: "Plugins Prototype and Type",   id: "plugins-prototype-type",    correct: "passed",                                  target: "SE/PH/PL/PP",  testFunction: testPluginsPrototypeAndType    },
    { name: "mimeTypes Length",             id: "mimetypes-length",          correct: "> 0",                                     target: "SE/PH/PL/PP",  testFunction: testMimeTypesLength            },
    { name: "mimeTypes Prototype and Type", id: "mimetypes-prototype-type",  correct: "passed",                                  target: "SE/PH/PL/PP",  testFunction: testMimeTypesPrototypeAndType  },
    { name: "Connection Rtt",               id: "connection-rtt",            correct: "> 0",                                     target: "SE/PH/PL/PP",  testFunction: testConnectionRtt              },
    { name: "WebGL Vendor",                 id: "webgl-vendor",              correct: `!= Brian Paul<br/>!= undefined`,          target: "SE/PH/PL/PP",  testFunction: testWebGLVendor                },
    { name: "WebGL Renderer",               id: "webgl-renderer",            correct: `!= Mesa OffScreen<br/>不含 Swift 关键字`,  target: "SE/PH/PL/PP",  testFunction: testWebGLRenderer              },
    { name: "Alert Elapsed Time",           id: "alert-elapsed-time",        correct: "> 30ms",                                  target: "SE/PH/PL/PP",  testFunction: testAlertElapsedTime           },
    { name: "console.table Elapsed Time",   id: "console-elapsed-time",      correct: "< 5ms",                                   target: "SE/PH/PL/PP",  testFunction: testConsoleTableElapsedTime    },
    { name: "Missing Image",                id: "missing-image",             correct: "> 0",                                     target: "SE/PH/PL/PP",  testFunction: testMissingImage               },
    { name: "Mouse Move",                   id: "mouse-move",                correct: "!= 0",                                    target: "SE/PH/PL/PP",  testFunction: testMouseMove                  },
    { name: "Devtools Status",              id: "devtools-status",           correct: "close",                                   target: "SE/PH/PL/PP",  testFunction: testDevtoolsStatus             },  // abandoned
    { name: "Window Outer",                 id: "window-outer",              correct: "> 0",                                     target: "SE/PH/PL/PP",  testFunction: testWindowOuter                },  // abandoned
    { name: "Browser features",             id: "browser-features",          correct: "HiDPI/Retina 屏幕为 true",                 target: "SE/PH/PL/PP",  testFunction: testBrowserFeatures            },  // abandoned
];

setTimeout(function() {
    headlessTests.forEach(test => {
        generateTableRow(test);
        testBrowser(test).then(res => {});
    }), 500
})
