// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra');

// require these just to get them included in the esbuild output
// generated with:
// (cd node_modules && find puppeteer-extra-plugin-stealth/evasions -type f | rg -v '\.md$' | rg -v '\.test.(js|html)$' | sed -r 's,^,require(",g' | sed -r 's,$,");,g')

require("puppeteer-extra-plugin-stealth/evasions/sourceurl");
require("puppeteer-extra-plugin-stealth/evasions/chrome.app");
require("puppeteer-extra-plugin-stealth/evasions/_template");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency");
require("puppeteer-extra-plugin-stealth/evasions/_utils/index.js");
require("puppeteer-extra-plugin-stealth/evasions/_utils/withUtils.js");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl/index.js");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl/package.json");
require("puppeteer-extra-plugin-stealth/evasions/chrome.app/index.js");
require("puppeteer-extra-plugin-stealth/evasions/chrome.app/package.json");
require("puppeteer-extra-plugin-stealth/evasions/_template/index.js");
require("puppeteer-extra-plugin-stealth/evasions/_template/package.json");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi/index.js");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi/package.json");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs/index.js");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs/package.json");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs/index.js");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs/package.json");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime/index.js");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime/package.json");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime/staticData.json");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes/index.js");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/functionMocks.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/magicArray.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/mimeTypes.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/plugins.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/data.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins/package.json");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor/index.js");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages/package.json");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override/package.json");
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow/index.js");
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions/package.json");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions/index.js");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions/package.json");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency/index.js");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency/package.json");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
