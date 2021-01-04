const {
    generateText,
    checkAndGenerate,
} = require('./util');
const puppeteer = require('puppeteer');

test("Should output name and age", () => {
   const text = generateText("Max", 29); 
   expect(text).toBe("Max (29 years old)");
});

test("should output data-less text", () => {
    const text = generateText("", null);
    expect(text).toBe(" (null years old)");

    const text2 = generateText();
    expect(text2).toBe("undefined (undefined years old)");
});

// Integration Test
test("should generate a valid text input", () => {
    const text = checkAndGenerate("Muneer", 26);
    expect(text).toBe("Muneer (26 years old)");
});

// End To End test with headless browser
// test function takes d2nd argument to increase the timeout
test("should create an element with text and correct class", async() => {
    const browser = await puppeteer.launch({
        //headless: false -> opens up chromium browser UI
        headless: true,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
    // Click and type events
    await page.click("input#name");
    await page.type("input#name", "Mahabub");
    await page.click("input#age");
    await page.type("input#age", "34");
    await page.click("button#btnAddUser");

    const finalText = await page.$eval('.user-item', el => el.textContent);

    expect(finalText).toBe("Mahabub (34 years old)");
}, 30000000);
