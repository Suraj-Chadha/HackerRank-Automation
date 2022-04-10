const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const {email,password} = require("./secrets");
let cTab;
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
    cTab = allTabsArr[0];
    // console.log("in current Tab---->",cTab);
    let OpenHackerRankLoginPagePromise = cTab.goto(url);
    return OpenHackerRankLoginPagePromise;
})
.then(function(){
    console.log("inside login screen");
    let emailWillBeTypedPromise = cTab.type("#input-1",email,{delay:100});
    return emailWillBeTypedPromise;
})
.then(function(){
    console.log("email was typed successfully");
    let passwordWillBeTypedPromise = cTab.type("#input-2",password,{delay:100});
    return passwordWillBeTypedPromise;
})
.then(function(){
    console.log("password was typed successfully");
    let submitButtonWillBeClickedPromise = cTab.click(".auth-button");
    return submitButtonWillBeClickedPromise;
})
.then(function(){
    console.log("logged in successfully");
})
.catch(function(err){
    console.log(err);
})