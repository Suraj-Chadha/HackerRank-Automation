const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
let browserWillBeOpenedPromise = puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args:["--start-maximized","--force-dark-mode"],
});
browserWillBeOpenedPromise.then(function(browser){
    // console.log(browser);
    let allTabsArrPromise = browser.pages();
    return allTabsArrPromise;
})
.then(function(allTabsArr){
    let cTab = allTabsArr[0];
    // console.log("in current Tab---->",cTab);
    let OpenHackerRankLoginPagePromise = cTab.goto(url);
})