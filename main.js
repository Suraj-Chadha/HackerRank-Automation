const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const {email,password} = require("./secrets");
let cTab;
let{answer} = require("./codes");
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
    let emailWillBeTypedPromise = cTab.type("#input-1",email);
    return emailWillBeTypedPromise;
})
.then(function(){
    console.log("email was typed successfully");
    let passwordWillBeTypedPromise = cTab.type("#input-2",password);
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
    let questionWillBeSolved = questionSolver(linkArr[1],0);
    for(let i = 2; i < linkArr.length; i++){
        questionWillBeSolved = questionWillBeSolved.then(function(){
            return questionSolver(linkArr[i],i-1);
        })
    }
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

function questionSolver(questionLink, idx){
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
            let prefferedLanguageWillBeTypedPromise = cTab.type('input[role="combobox"]','java 8',{delay:100});
            return prefferedLanguageWillBeTypedPromise;

        })
        .then(function(){
            console.log("language typed");
            let languageWillbeSelected = cTab.keyboard.press('Enter');
            return languageWillbeSelected;
        })
        .then(function(){
            console.log("language java8 selected");
            let customInputBoxWillBeClickedPromise = cTab.click('.checkbox-input');
            return customInputBoxWillBeClickedPromise;
        })
        .then(function(){
            console.log("customBox Input Clicked");
            let waitForCustomInputAreaPromise = cTab.waitForSelector('.text-area.custominput');
            return waitForCustomInputAreaPromise;
        })
        .then(function(){
            console.log("custom Text Area is available");
            let answerWillBeTypedPromise = cTab.type('.text-area.custominput',answer[idx]);
            return answerWillBeTypedPromise;
        })
        .then(function(){
            console.log("answer typed successfully");
            let controlKeyIsPressedPromise = cTab.keyboard.down('Control');
            return controlKeyIsPressedPromise;
        })
        .then(function(){
            let aKeyIsPressedPromise = cTab.keyboard.press('a');
            return aKeyIsPressedPromise;
        })
        .then(function(){
            let xkeyIsPressedPromise = cTab.keyboard.press('x');
            return xkeyIsPressedPromise;
        })
        .then(function(){
            console.log("answer copied from custom input box correctly");
            let controlDownPromise = cTab.keyboard.up("Control");
            return controlDownPromise;
        })
        .then(function(){
            let editorWillBeClickedPromise = cTab.click('.monaco-editor.no-user-select');
            return editorWillBeClickedPromise;
        })
        .then(function(){
            console.log("editor clicked");
            let controlWillBePressedPromise = cTab.keyboard.down("Control");
            return controlWillBePressedPromise;
        })
        .then(function(){
            let aPressedPromise = cTab.keyboard.press("a");
            return aPressedPromise;
        })
        .then(function(){
            let visPressedPromise = cTab.keyboard.press("v");
            return visPressedPromise;
        })
        .then(function(){
            let controlDownPromise = cTab.keyboard.up("Control");
            return controlDownPromise;
        })
        .then(function(){
            console.log("answer pasted in editor successfully");
            let submitQuestionSuccessfullyPromise = cTab.click('.hr-monaco-submit');
            // resolve();
        })
        .then(function(){
            console.log("answer submitted successfuly");
            // resolve();
            let waitForSuccessMessagePromise = cTab.waitForSelector('.congrats-heading');
            return waitForSuccessMessagePromise;
        })
        .then(function(){
            console.log("test cases passed");
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })

}