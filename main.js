const puppeteer = require('puppeteer');
const credentials = require('./credentials');

const EMAIL_INPUT_SELECTOR = 'input[id="ap_email"]';
const PASSWORD_INPUT_SELECTOR = 'input[id="ap_password"]';
const SIGNIN_BUTTON_SELECTOR = 'input[id="signInSubmit"]';
const LIBRARY_SECTION_SELECTOR = 'div[id="library"]';
const BOOKS_SELECTOR = 'div[class="a-row kp-notebook-library-each-book"]';
const URL = 'https://read.amazon.com/notebook';

async function main() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);
        await page.waitForSelector(EMAIL_INPUT_SELECTOR, { timeout: 10000 });
        await page.waitForSelector(PASSWORD_INPUT_SELECTOR, { timeout: 10000 });
        
        await page.type(EMAIL_INPUT_SELECTOR, credentials.LOGIN_EMAIL);
        await page.type(PASSWORD_INPUT_SELECTOR, credentials.LOGIN_PASSWORD);
        await page.click(SIGNIN_BUTTON_SELECTOR);

        await page.waitForNavigation();

        await page.waitForSelector(LIBRARY_SECTION_SELECTOR, { timeout: 10000 });


        const books = await page.$$(BOOKS_SELECTOR);

        for (const book of books) {
            console.log(book);
            console.log('------------------------------');
        }

        await page.screenshot({ path: 'screenshot.png' });

        

        await page.close();
        await browser.close();

    } catch (error) {
        console.error(error);
    }
}

main();