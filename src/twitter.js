require('./shared');
const puppeteer = require('puppeteer-extra');

async function testStealthPlugin() {
    let browser = await puppeteer.launch({
        headless: true,
        pipe: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`Testing the stealth plugin..`);
    await page.goto('https://bot.sannysoft.com');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'stealth.png', fullPage: true });

    console.log(`All done, check the screenshots. ✨`);
    await browser.close();
}

async function getTwitterFollowers(username) {
    let browser = await puppeteer.launch({
        headless: true,
        pipe: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`Testing the stealth plugin..`);
    await page.goto(`https://twitter.com/${username}/followers`);
    await page.waitForTimeout(10000);

    await browser.close();
}

async function getTwitterFollowing(username) {
    let browser = await puppeteer.launch({
        headless: true,
        pipe: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`https://twitter.com/${username}/following`, {
        referer: `https://twitter.com/${username}`,
        waitUntil: "networkidle0",
    });

    await page.evaluate((username) => {
        const node_list = document.querySelectorAll(`div[role="presentation"] > a[href="/${username}/following"][role=tab][aria-selected=true]`);
        if (node_list.length != 1) {
            throw Error("The tab we expected to be focused was not focused; are we on the right page?");
        }
    }, username);

    const usernames = new Set();
    let failures_to_get_more_usernames = 0;

    while (true) {
        const new_usernames = await page.evaluate(() => {
            const usernames_with_at = Array.from(document.querySelectorAll('a[href][role="link"][tabindex][class] > div[class] > div[class][dir] > span[class]')).map(e => e.innerText);
            const usernames = [];
            for (const username of usernames_with_at) {
                if (!username.startsWith("@")) {
                    throw Error(`Expected to get a username starting with "@"; got ${username}`);
                }
                usernames.push(username);
            }
            return usernames;
        });

        const last_usernames_count = usernames.size;
        for (let username of new_usernames) {
            usernames.add(username);
        }
        console.log(usernames);

        if (usernames.size == last_usernames_count) {
            failures_to_get_more_usernames += 1;
        }
        if (failures_to_get_more_usernames == 3) {
            break;
        }

        await page.keyboard.press("PageDown");
        await page.waitForTimeout(1000);
    }

    await browser.close();
}

getTwitterFollowing("notegone");
