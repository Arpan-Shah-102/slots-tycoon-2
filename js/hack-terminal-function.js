function updateMoneyLabelIfSlotMachine() {
    if (getGamemodeSelected() === 'slot-machine') {
        moneyLabel.textContent = formatMoney(getMoney());
    }
}

const helpMsg = `Available commands:
dp / dailyPrize  -  claim a daily prize
st / steal  -  attempt to steal $50 money (40% success rate, 10% ultra lucky (5x), 50% chance to lose $100)
d / donate  -  give $50 to the overlords that control everything (something might happen if you to this enough times)
cth / clearTerminalHistory  -  clear the history of the terminal (you know, the messages that pop up when you type in commands)
ua / unlockAchievement  -  unlock a secret achievement
f / fart  -  self explanatory
j / joke  -  get a random joke
htm / hackTheMachine  -  attempt to hack the slot machine (10% success rate to get $500, 90% chance to break the machine and and pay a fine of $75)
i / inspire  -  get a random inspirational quote
g / gamble  -  gamble an amount of money in a follow-up prompt with a 40% chance to double, 5% chance to get 5x, and 55% chance to lose it all
cf / coinFlip  -  bet on heads or tails in a follow-up prompt with a 50/50% chance to double or lose your money
v / vault  -  access the secret vault (who knows what's inside?)
cssc / changeSlotSoundCommands  -  view the commands to change the slot machine sound effects
a / admin  -  view higher level commands
etc... (find out more by experimenting with commands!)`;

const adminHelpMsg = `Admin commands:
cle / clearEverything: clears all styling, html, and javascript
clh / clearHTML: clears all HTML
clj / clearJavascript: clears all javascript
clc / clearCSS: clears all styling
wd / whileDestroy: creates an infinite loop that will crash your browser
ra / remoteAccess: a russian hacker will syphon all your money and cause you to go into debt and lose. This is unstopable.
b / bizarre: something bizarre will happen (or maybe nothing at all, who knows?)
rtf / ruinTheFun: gives you access to the admin panel`;

const cssInfoMsg = `Change Slot Sound Commands:
css d / changeSlotSound default - change slot machine sound effects back to default
css 1 / changeSlotSound 1 - change slot machine sound effects to set 1
css 2 / changeSlotSound 2 - change slot machine sound effects to set 2
css 3 / changeSlotSound 3 - change slot machine sound effects to set 3
css 4 / changeSlotSound 4 - change slot machine sound effects to set 4`;

function htHelp() {
    delayAlert(helpMsg);
    playSound(baseSfx.notify);
}
function htDailyPrize() {
    const date = new Date();
    const dateValue = `${date.getFullYear()}${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
    
    if (getDailyPrizeDateClaimed() == dateValue) {
        delayAlert('You have already claimed your daily prize today! Come back tomorrow!');
        playSound(baseSfx.denied);
        return;
    }
    setDailyPrizeDateClaimed(dateValue);
    const prizeType = prompt(`Chose your daily prize!\n1. $100\n2. ₡10,000 crypto\n3. ✺1\n\n[1/2/3/m/c/s]`);
    if (prizeType == '1' || prizeType.toLowerCase() == 'm') {
        calcMoney(100);
        updateMoneyLabelIfSlotMachine();
        delayAlert('You claimed $100 as your daily prize!');
        playSound(baseSfx.win);
    } else if (prizeType == '2' || prizeType.toLowerCase() == 'c') {
        calcCrypto(10000);
        if (getGamemodeSelected() === 'crypto') {
            moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        }
        delayAlert('You claimed ₡10,000 crypto as your daily prize!');
        playSound(baseSfx.win);
    } else if (prizeType == '3' || prizeType.toLowerCase() == 's') {
        calcStardust(1);
        if (getGamemodeSelected() === 'the-world') {
            moneyLabel.textContent = formatMoney(getStardust(), 's');
        }
        delayAlert('You claimed ✺1 stardust as your daily prize!');
        playSound(baseSfx.win);
    } else {
        delayAlert('Invalid prize type, please try again! Please enter 1, 2, or 3 (or m, c, s) to claim your prize next time!');
        playSound(baseSfx.denied);
    }
}
function htSteal() {
    if (confirm('Are you sure you want to try and steal? (40% - $75 | 10% - $375 | 50% - lose $100)')) {
        const rand = Math.random();
        let alertMsg;

        if (rand < 0.4) {
            calcMoney(75);
            playSound(baseSfx.win);
            alertMsg = 'You successfully stole $75!';
        } else if (rand < 0.5) {
            calcMoney(375);
            playSound(baseSfx.win);
            alertMsg = 'You got super lucky and stole $375!';
        } else {
            calcMoney(-100);
            playSound(baseSfx.lose);
            alertMsg = 'You got caught and had to pay a fine of $100!';
        }

        delayAlert(alertMsg);
        updateMoneyLabelIfSlotMachine();
    }
}
function htDonate() {
    donateToYahu();
    calcMoney(-50);
    delayAlert('You have donated $50 to the overlords.\nYou now have ' + formatMoney(getMoney()));
    updateMoneyLabelIfSlotMachine();

    if (getAmountDonatedToYahu() == 10000) {
        delayAlert('Yahu is pleased with your generosity. He donates to you ₡1,000,000 and ✺10!\nYahu won\'t feel this generous again so count yourself lucky!', 100);
        calcCrypto(1000000);
        calcStardust(10);
        if (getGamemodeSelected() === 'crypto') {
            moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        } else if (getGamemodeSelected() === 'the-world') {
            moneyLabel.textContent = formatMoney(getStardust(), 's');
        }
        playSound(baseSfx.win);
    }
}
const terminalHistory = document.querySelector('.terminal-history');
function htClearTerminalHistory() {
    terminalHistory.innerHTML = '';
    delayAlert('Terminal history cleared!');
    playSound(baseSfx.notify);
}
function htUnlockAchievement() {
    if (isAchievementUnlocked(33)) {
        delayAlert('You have already unlocked this achievement!');
        playSound(baseSfx.denied);
        return;
    }
    unlockAchievement(33);
}
function htFart() {
    const fartSounds = [farts[1], farts[2], farts[3], farts[4], farts[5], farts[6]];
    const randIndex = Math.floor(Math.random() * fartSounds.length);
    playSound(fartSounds[randIndex]);
}
async function htJoke() {
    try {
        const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const data = await res.json();
        delayAlert(data.joke);
        playSound(baseSfx.notify);
    } catch (e) {
        delayAlert('Failed to fetch joke. Please try again later.');
        playSound(baseSfx.denied);
    }
}
function htHackTheMachine() {
    if (confirm('Are you sure you want to try and hack the machine? (10% - $500 | 90% - pay $75)')) {
        const rand = Math.random();
        let alertMsg;
        if (rand < 0.1) {
            calcMoney(500);
            playSound(baseSfx.win);
            alertMsg = 'You successfully hacked the machine and stole $500!';
        } else {
            calcMoney(-75);
            playSound(baseSfx.lose);
            alertMsg = 'You failed to hack the machine and had to pay a fine of $75!';
        }
        delayAlert(alertMsg);
        updateMoneyLabelIfSlotMachine();
    }
}
async function htInspire() {
    try {
        const res = await fetch('https://motivational-spark-api.vercel.app/api/quotes/random');
        const data = await res.json();
        delayAlert(`${data.quote}\n- ${data.author}`);
        playSound(baseSfx.notify);
    } catch (e) {
        delayAlert('Failed to fetch inspiration. Please try again later.');
        playSound(baseSfx.denied);
    }
}
function htGamble() {
    const amountStr = prompt('Enter the amount of money you want to gamble:');
    if (!isFinite(amountStr)) {
        delayAlert('Invalid amount entered.');
        playSound(baseSfx.denied);
        return;
    }
    const amount = parseFloat(amountStr);
    if (amount <= 0) {
        delayAlert('Amount must be greater than 0.');
        playSound(baseSfx.denied);
        return;
    }
    if (amount > getMoney()) {
        delayAlert('You cannot gamble more money than you have!');
        playSound(baseSfx.denied);
        return;
    }
    calcMoney(-amount);
    const rand = Math.random();
    let alertMsg;
    if (rand < 0.4) {
        calcMoney(amount * 2);
        playSound(baseSfx.win);
        alertMsg = `Congratulations! You won and doubled your money to ${formatMoney(getMoney())}!`;
    } else if (rand < 0.45) {
        calcMoney(amount * 6);
        playSound(baseSfx.win);
        alertMsg = `Incredible! You hit the jackpot and got 5x your money! You now have ${formatMoney(getMoney())}!`;
    }
    else {
        playSound(baseSfx.lose);
        alertMsg = `Unlucky! You lost all the money you gambled and now have ${formatMoney(getMoney())}. Better luck next time!`;
    }
    delayAlert(alertMsg);
    updateMoneyLabelIfSlotMachine();
}
function htCoinFlip() {
    const choice = prompt('Enter heads or tails (h/t):').toLowerCase();
    if (choice !== 'h' && choice !== 't' && choice !== 'heads' && choice !== 'tails') {
        delayAlert('Invalid choice entered.');
        playSound(baseSfx.denied);
        return;
    }
    const amountStr = prompt('Enter the amount of money you want to bet:');
    if (!isFinite(amountStr)) {
        delayAlert('Invalid amount entered.');
        playSound(baseSfx.denied);
        return;
    }
    const amount = parseFloat(amountStr);
    if (amount <= 0) {
        delayAlert('Amount must be greater than 0.');
        playSound(baseSfx.denied);
        return;
    }
    if (amount > getMoney()) {
        delayAlert('You cannot bet more money than you have!');
        playSound(baseSfx.denied);
        return;
    }
    calcMoney(-amount);
    const rand = Math.random();
    const coinResult = rand < 0.5 ? 'h' : 't';
    let alertMsg;
    if ((choice === 'h' || choice === 'heads') && coinResult === 'h') {
        calcMoney(amount * 2);
        playSound(baseSfx.win);
        alertMsg = `Congratulations! It was heads and you won ${formatMoney(getMoney())}!`;
    } else if ((choice === 't' || choice === 'tails') && coinResult === 't') {
        calcMoney(amount * 2);
        playSound(baseSfx.win);
        alertMsg = `Congratulations! It was tails and you won ${formatMoney(getMoney())}!`;
    } else {
        playSound(baseSfx.lose);
        alertMsg = `Unlucky! You lost your bet and now have ${formatMoney(getMoney())}. Better luck next time!`;
    }
    delayAlert(alertMsg);
    updateMoneyLabelIfSlotMachine();
}
function htVault() {
    const vaultMessage = getVaultMessage();
    if (confirm(`${vaultMessage == '' ? 'There is nothing in the vault right now.' : vaultMessage}\n\nDo you want to update the vault message?`)) {
        const newMessage = prompt('Enter the new vault message:');
        if (newMessage !== null && newMessage !== '') {
            setVaultMessage(newMessage.trim());
            delayAlert("Vault message updated!");
        } else {
            delayAlert("Invalid vault message. Vault message not updated.");
        } 
    }
    playSound(baseSfx.notify);
}
function htAdmin() {
    delayAlert(adminHelpMsg);
    playSound(baseSfx.notify);
}

function htaClearEverything() {
    if (confirm('Are you sure you want to clear all components? This will clear all styling, HTML, and JavaScript. This can be fixed by reloading the page.')) {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        playSound(baseSfx.lose);
    }
}
function htaClearHTML() {
    if (confirm('Are you sure you want to clear all HTML? This can be fixed by reloading the page.')) {
        document.body.innerHTML = '';
        playSound(baseSfx.lose);
    }
}
function htaClearJavascript() {
    if (confirm('Are you sure you want to clear all JavaScript? This will stop all functionality on the page. This can be fixed by reloading the page.')) {
        document.body.replaceWith(document.body.cloneNode(true));
        playSound(baseSfx.lose);
    }
}
function htaClearCSS() {
    if (confirm('Are you sure you want to clear all CSS? This will remove all styling on the page. This can be fixed by reloading the page.')) {
        document.head.innerHTML = '';
        playSound(baseSfx.lose);
    }
}
function htaWhileDestroy() {
    if (confirm('Are you sure you want to create an infinite loop that will crash your browser? This can be fixed by exiting and reloading the page.')) {
        let count = 0;
        playSound(baseSfx.lose);
        playSound(baseSfx.denied);
        while (true) {
            count++;
            console.log(`Infinite loop count: ${count}`);
        }
    }
}
function htaRemoteAccess() {
    if (confirm('A russian hacker is attempting to gain remote access to your machine. Do you want to let them in?')) {
        delayAlert('Hello comrade, you have successfully given me access to your machine. I am now syphoning all your money. Goodbye!');
        playSound(baseSfx.lose);

        setInterval(() => {
            calcMoney(-100);
            updateMoneyLabelIfSlotMachine();
            playSound(baseSfx.denied);

            const element = document.createElement('p');
            element.textContent = 'Thank you for your money comrade!';
            terminalHistory.appendChild(element);
        }, 1000);
    }
}
function htaBizarre() {
    const randNum = Math.random();
    if (randNum < 0.25) {playSound(baseSfx.bizarre1);}
    else if (randNum < 0.5) {playSound(baseSfx.bizarre2);}
    else if (randNum < 0.75) {playSound(baseSfx.bizarre3);}
    else {playSound(baseSfx.bizarre4);}
    unlockAchievement(37);
}
function htaRuinTheFun() {
    if (confirm('Are you sure you want to access the admin panel? This will ruin all the fun from the game and cause permanent changes to your save file.')) {
        const password = prompt('Enter the admin password (stored in the vault):');
        if (password === getVaultMessage()) {
            delayAlert('Access granted. Welcome to the admin panel!');
            playSound(baseSfx.cheat);
            ruinTheFunSet();
            location.reload();
        } else {
            delayAlert('Access denied. Incorrect password.');
            playSound(baseSfx.denied);
        }
    }
}

function cssInfo() {
    delayAlert(cssInfoMsg);
    playSound(baseSfx.notify);
}
function css1() {
    slotSfx = allSpecialSlotSfx.sfxSet1;
    delayAlert('Slot machine sound effects changed to set 1!');
    playSound(slotSfx.jackpot);
}
function css2() {
    slotSfx = allSpecialSlotSfx.sfxSet2;
    delayAlert('Slot machine sound effects changed to set 2!');
    playSound(slotSfx.jackpot);
}
function css3() {
    slotSfx = allSpecialSlotSfx.sfxSet3;
    delayAlert('Slot machine sound effects changed to set 3!');
    playSound(slotSfx.jackpot);
}
function css4() {
    slotSfx = allSpecialSlotSfx.sfxSet4;
    delayAlert('Slot machine sound effects changed to set 4!');
    playSound(slotSfx.jackpot);
}
function cssD() {
    slotSfx = defaultSlotSfx;
    delayAlert('Slot machine sound effects changed to default!');
    playSound(baseSfx.notify);
}

function s2526() {
    unlockAchievement(40);
    delayAlert("iEagle has been fun...", 100);
}
function s3242026() {
    unlockAchievement(41);
    delayAlert("Oh hey! A polaroid of me!", 100);
}

const allCommands = [htHelp, htDailyPrize, htSteal, htDonate, htClearTerminalHistory, htUnlockAchievement, htFart, htJoke, htHackTheMachine, htInspire, htGamble, htCoinFlip, htVault, htAdmin, htaClearEverything, htaClearHTML, htaClearJavascript, htaClearCSS, htaWhileDestroy, htaRemoteAccess, htaBizarre, htaRuinTheFun, cssInfo, css1, css2, css3, css4, cssD, s2526, s3242026];
const commandAbbreviations = ['h', 'dp', 'st', 'd', 'cth', 'ua', 'f', 'j', 'htm', 'i', 'g', 'cf', 'v', 'a', 'cle', 'clh', 'clj', 'clc', 'wd', 'ra', 'b', 'rtf', 'cssc', 'css 1', 'css 2', 'css 3', 'css 4', 'css d', '2526', '3242026'];
const commandNames = ['help', 'dailyprize', 'steal', 'donate', 'clearterminalhistory', 'unlockachievement', 'fart', 'joke', 'hackthemachine', 'inspire', 'gamble', 'coinflip', 'vault', 'admin', 'cleareverything', 'clearhtml', 'clearjavascript', 'clearcss', 'whiledestroy', 'remoteaccess', 'bizarre', 'ruinthefun', 'changeslotsoundcommands', 'changeslotsound 1', 'changeslotsound 2', 'changeslotsound 3', 'changeslotsound 4', 'changeslotsound default', '2025-2026', '3/24/2026'];
const fullCommandNames = ['Help', 'Daily Prize', 'Steal', 'Donate', 'Clear Terminal History', 'Unlock Achievement', 'Fart', 'Joke', 'Hack The Machine', 'Inspire', 'Gamble', 'Coin Flip', 'Vault', 'Admin', 'Clear Everything', 'Clear HTML', 'Clear Javascript', 'Clear CSS', 'While Destroy', 'Remote Access', 'Bizarre', 'Ruin The Fun', 'Change Slot Sound Commands', 'Change Slot Sound 1', 'Change Slot Sound 2', 'Change Slot Sound 3', 'Change Slot Sound 4', 'Change Slot Sound Default', '6 Years of iEagle', 'Polaroid of Me'];
