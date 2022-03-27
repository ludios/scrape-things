require("./shared");
const fs = require("fs");
const puppeteer = require("puppeteer-extra");

async function test_stealth_plugin() {
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

function get_cookie_value(cookie_dir, name) {
    if (name.includes(".") || name.includes("/")) {
        throw Error(`rejected possible path traversal attempt: ${name}`);
    }
    return fs.readFileSync(`${cookie_dir}/${name}`).toString().trim();
}

async function get_twitter_followers(cookie_dir, username) {

}

async function get_twitter_following(cookie_dir, username) {
    let browser = await puppeteer.launch({
        headless: true,
        pipe: true,
    });

    const page = await browser.newPage();
    await page.setCookie(
        {domain: ".twitter.com", path: "/", httpOnly: true, secure: true, name: "auth_token", value: get_cookie_value(cookie_dir, "auth_token")},
        {domain: ".twitter.com", path: "/", httpOnly: true, secure: true, name: "ct0", value: get_cookie_value(cookie_dir, "ct0")},
    );
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
                usernames.push(username.replace(/^@/, ""));
            }
            return usernames;
        });

        const last_usernames_count = usernames.size;
        for (let username of new_usernames) {
            usernames.add(username);
        }

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

    for (let username of usernames) {
        console.log(username);
    }
}

get_twitter_following("/home/at/.cache/cookies/twitter/notegone", "notegone");
