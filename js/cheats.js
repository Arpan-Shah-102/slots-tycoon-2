const slotMachineSelect = document.querySelector('.slot-machine-select');
const cryptoSelect = document.querySelector('.crypto-select');
const theWorldSelect = document.querySelector('.the-world-select');

const slotMachineSection = document.querySelector('.slot-machine-game');
const cryptoSection = document.querySelector('.crypto-game');
const theWorldSection = document.querySelector('.the-world-game');

const slotMachineLinks = document.querySelector('.slot-machine-links');
const cryptoLinks = document.querySelector('.crypto-links');
const theWorldLinks = document.querySelector('.the-world-links');

const selectors = [slotMachineSelect, cryptoSelect, theWorldSelect];
const sections = [slotMachineSection, cryptoSection, theWorldSection];
const links = [slotMachineLinks, cryptoLinks, theWorldLinks];
const unlocked = [true, isCryptoGamemodeUnlocked(), isTheWorldUnlocked()];
const stardustExchanges = document.querySelectorAll('.stardust-exchange');

const fullCheatsBackground = document.querySelector('.cheats-menu-background');
const toggleCheatsBtn = document.querySelector('.toggle-cheats');

if (isTheFunRuined()) {
    toggleCheatsBtn.classList.remove('hidden');
}

fullCheatsBackground.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    cheatsClose();
});
function cheatsClose() {
    playSound(baseSfx.cheat);
    fullCheatsBackground.classList.remove('shown');
}
function toggleCheatsDiv() {
    fullCheatsBackground.classList.toggle('shown');
    playSound(baseSfx.cheat);
}

function cheatsGetCurrency(currency) {
    const currencyAmount = prompt(`How much ${currency} do you want?`).trim();
    if (isNaN(currencyAmount) || currencyAmount < 0 || !isFinite(currencyAmount) || currencyAmount == null) {
        alert('Please enter a valid number.');
        return;
    }
    if (currency === 'money') {
        calcMoney(parseFloat(currencyAmount));
    } else if (currency === 'crypto') {
        calcCrypto(parseInt(currencyAmount));
    } else if (currency === 'stardust') {
        calcWorld(parseInt(currencyAmount));
    }
    if (getGamemodeSelected() == 'slot-machine') {
        moneyLabel.textContent = formatMoney(getMoney());
    } else if (getGamemodeSelected() == 'crypto') {
        cryptoLabel.textContent = formatMoney(getCrypto(), 'c');
    } else if (getGamemodeSelected() == 'the-world') {
        worldLabel.textContent = formatMoney(getWorld(), 'w');
    }
    delayAlert("Transaction successful.");
    playSound(baseSfx.cheat);
}

const cheatsAchievementBtn = document.querySelector('.unlock-all-achievements');
if (getAchievementsUnlocked().length == Object.keys(achievementData).length) {
    cheatsAchievementBtn.disabled = true;
}
function cheatsUnlockAllAchievements() {
    const lockedAchievements = Object.keys(achievementData).filter((_, index) => !isAchievementUnlocked(index));
    if (lockedAchievements.length === 0) {
        alert('All achievements are already unlocked!');
        return;
    }
    for (let i = 0; i < lockedAchievements.length; i++) {
        setTimeout(() => {
            unlockAchievement(Number(lockedAchievements[i]));
        }, i * 100);
    }
    cheatsAchievementBtn.disabled = true;
    delayAlert('All achievements unlocked!', 4100 + (lockedAchievements.length * 100));
}

let isTextEditable = false;
function cheatsEditAllText(btn) {
    isTextEditable = !isTextEditable;
    document.body.contentEditable = isTextEditable;
    btn.textContent = isTextEditable ? 'Disable Text Editing' : 'Enable Text Editing';
    playSound(baseSfx.cheat);
}
let unlockCryptoBtn = document.querySelector('.unlock-crypto');
let unlockTheWorldBtn = document.querySelector('.unlock-the-world');
if (isCryptoGamemodeUnlocked()) {
    unlockCryptoBtn.disabled = true;
}
if (isTheWorldUnlocked()) {
    unlockTheWorldBtn.disabled = true;
}
function cheatsUnlockCrypto() {
    unlockCryptoGamemode();
    slotExchange.classList.remove('hidden');
    theWorldSelect.classList.remove('disabled');
    unlocked[1] = true;
    moneyExchange.classList.remove('hidden');
    playSound(baseSfx.cheat);
    unlockCryptoBtn.disabled = true;
}
function cheatsUnlockTheWorld() {
    unlockTheWorld();
    slotExchange.classList.remove('hidden');
    stardustExchanges.forEach(exchange => exchange.classList.remove('hidden'));
    unlocked[2] = true;
    playSound(baseSfx.cheat);
    unlockTheWorldBtn.disabled = true;
}

const getGuaranteedJackpotBtn = document.querySelector('.guaranteed-jackpot');
const getGuaranteedSavageClickBtn = document.querySelector('.guaranteed-savage-click');
if (getGuaranteedJackpot()) {
    getGuaranteedJackpotBtn.disabled = true;
}
if (getSavageClickChance() == 1) {
    getGuaranteedSavageClickBtn.disabled = true;
}
function unlockGuaranteedJackpot() {
    setGuaranteedJackpot(true);
    getGuaranteedJackpotBtn.disabled = true;
    playSound(baseSfx.cheat);
}
function unlockGuaranteedSavageClick() {
    setSavageClickChance(100);
    getGuaranteedSavageClickBtn.disabled = true;
    playSound(baseSfx.cheat);
}

function enableDevTools() {
    toggleCheatsBtn.textContent = 'Toggle Dev Tools';
    toggleCheatsBtn.classList.remove('hidden');
    fullCheatsBackground.classList.add('shown');
}
