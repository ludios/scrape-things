import puppeteer from "puppeteer-extra";

import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// These are for webpack
// import ChromeAppPlugin from "puppeteer-extra-plugin-stealth/evasions/chrome.app";
// import ChromeCsiPlugin from "puppeteer-extra-plugin-stealth/evasions/chrome.csi";
// import ChromeLoadTimes from "puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes";
// import ChromeRuntimePlugin from "puppeteer-extra-plugin-stealth/evasions/chrome.runtime";
// import IFrameContentWindowPlugin from "puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow";
// import MediaCodecsPlugin from "puppeteer-extra-plugin-stealth/evasions/media.codecs";
// import NavigatorLanguagesPlugin from "puppeteer-extra-plugin-stealth/evasions/navigator.languages";
// import NavigatorPermissionsPlugin from "puppeteer-extra-plugin-stealth/evasions/navigator.permissions";
// import NavigatorPlugins from "puppeteer-extra-plugin-stealth/evasions/navigator.plugins";
// import NavigatorVendor from "puppeteer-extra-plugin-stealth/evasions/navigator.vendor";
// import NavigatorWebdriver from "puppeteer-extra-plugin-stealth/evasions/navigator.webdriver";
// import SourceUrlPlugin from "puppeteer-extra-plugin-stealth/evasions/sourceurl";
// import UserAgentOverridePlugin from "puppeteer-extra-plugin-stealth/evasions/user-agent-override";
// import WebglVendorPlugin from "puppeteer-extra-plugin-stealth/evasions/webgl.vendor";
// import WindowOuterDimensionsPlugin from "puppeteer-extra-plugin-stealth/evasions/window.outerdimensions";

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
