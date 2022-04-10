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
    // let openNewPagePromise = browser.newPage(); //opens new page and gives the new single page
    let allTabsArrayPromise = browser.pages();//gives array of opened pages
    return allTabsArrayPromise;
})
.then(function(allTabsArr){
    // cTab = newTab;
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
    // let algorithmLabelIsClickedPromise = cTab.click("div[data-automation=\"algorithms\"]");
    let algorithmLabelIsClickedPromise = waitAndClick('div[data-automation=\"algorithms\"]');
    return algorithmLabelIsClickedPromise;
})
.then(function(){
    console.log("in algorithm Questions Page");
    let questionsWillBeLoadedPromise = cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
    return questionsWillBeLoadedPromise;
})
.then(function(){
    console.log("algo tab is opened");
    function getQLinkArr(){
        let QLinkArr = document.querySelectorAll("a[data-analytics=\"ChallengeListChallengeName\"]");
        let linkArr = [];
        for(let i = 0; i < QLinkArr.length; i++){
            linkArr.push(QLinkArr[i].getAttribute("href"));
        }
        return linkArr;
    }

    let getAllQuestionLinkPromise = cTab.evaluate(getQLinkArr);
    return getAllQuestionLinkPromise;
})
.then(function(linkArr){
    console.log(linkArr);
    let questionWillBeSolved = questionSolver(linkArr[0]);
    return questionWillBeSolved;
})
.then(function(){
    console.log("Question is solved");
})
.catch(function(err){
    console.log(err);
})

function waitAndClick(selectorClick){
    let waitAndClickPromise = new Promise(function(resolve, reject){

    let waitForSelectorToLoadPromise = cTab.waitForSelector(selectorClick);
    waitForSelectorToLoadPromise.then(function(){
        let selectorWillBeClickedPromise = cTab.click(selectorClick);
        return selectorWillBeClickedPromise;
    })
    .then(function(){
        resolve();
    })
    .catch(function(err){
        reject(err);
    })

})
return waitAndClickPromise;

}

function questionSolver(questionLink){
    return new Promise(function(resolve, reject){
        let fullLink = `https://hackerrank.com${questionLink}`;
        let questionWillBeOpenedPromise = cTab.goto(fullLink);
        questionWillBeOpenedPromise
        .then(function(){
            console.log("inside Question");
            // resolve();
            let dropBoxWillBeLoaded = cTab.waitForSelector('input[role="combobox"]');
            return dropBoxWillBeLoaded;
        })
        .then(function(){
            console.log("now we have to select the preffered language");
            let prefferedLanguageWillBeTypedPromise = cTab.type('input[role="combobox"]','java 8');
            return prefferedLanguageWillBeTypedPromise;

        })
        .then(function(){
            console.log("language typed");
            let languageWillbeSelected = cTab.keyboard.press('Enter');
            return languageWillbeSelected;
        })
        .then(function(){
            console.log("language java8 selected");
        })
        .catch(function(err){
            reject(err);
        })
    })

}