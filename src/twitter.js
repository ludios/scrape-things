import "./shared.js";
import fs from "fs";
import process from "process";
import puppeteer from "puppeteer-extra";

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
        throw Error(`rejected possible path traversal attempt: ${inspect(name)}`);
    }
    return fs.readFileSync(`${cookie_dir}/${name}`).toString().trim();
}

// https://bobbyhadz.com/blog/javascript-convert-string-to-title-case
function title_case(str) {
    return str.replace(/\w\S*/g, word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

async function get_twitter_followers_or_following(cookie_dir, username, which) {
    if (!["followers", "following"].includes(which)) {
        throw Error(`'which' argument must be either "followers" or "following", was ${inspect(which)}`);
    }

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

    await page.goto(`https://twitter.com/${username}/${which}`, {
        referer: `https://twitter.com/${username}`,
        waitUntil: "networkidle0",
    });

    await page.evaluate((username, which) => {
        const node_list = document.querySelectorAll(`div[role="presentation"] > a[href="/${username}/${which}"][role=tab][aria-selected=true]`);
        if (node_list.length != 1) {
            throw Error("The tab we expected to be focused was not focused; are we on the right page?");
        }
    }, username, which);

    const usernames = new Set();
    let failures_to_get_more_usernames = 0;

    while (true) {
        const aria_label = `Timeline: ${title_case(which)}`;
        const new_usernames = await page.evaluate((aria_label) => {
            const usernames_with_at = Array.from(document.querySelectorAll(`
                div[aria-label="${aria_label}"] > div > div > div > div > div > div > div > div > div > div > div >
                a[href][role="link"][tabindex][class] > div[class] > div[class][dir] > span[class]
            `)).map(e => e.innerText);
            const usernames = [];
            for (const username of usernames_with_at) {
                if (!username.startsWith("@")) {
                    throw Error(`Expected to get a username starting with "@"; got ${inspect(username)}`);
                }
                usernames.push(username.replace(/^@/, ""));
            }
            return usernames;
        }, aria_label);

        const last_usernames_count = usernames.size;
        for (let username of new_usernames) {
            usernames.add(username);
        }

        if (usernames.size == last_usernames_count) {
            failures_to_get_more_usernames += 1;
        } else {
            failures_to_get_more_usernames = 0;
        }
        if (failures_to_get_more_usernames == 4) {
            break;
        }

        await page.keyboard.press("PageDown");
        await page.waitForTimeout(1500);
    }

    await browser.close();

    for (let username of usernames) {
        console.log(username);
    }
}

const username = process.argv[2];
const which = process.argv[3];
get_twitter_followers_or_following("/home/at/.cache/cookies/twitter/notegone", username, which);
