require('./shared');
const puppeteer = require('puppeteer-extra');

async function getTwitterFollows() {
    // That's it, the rest is puppeteer usage as normal 😊
    let browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`Testing the stealth plugin..`);
    await page.goto('https://bot.sannysoft.com');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'stealth.png', fullPage: true });

    console.log(`All done, check the screenshots. ✨`);
    await browser.close();
}

getTwitterFollows();
