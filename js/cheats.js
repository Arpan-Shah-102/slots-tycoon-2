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
    if (gamemodeSelected == 'slot-machine') {
        moneyLabel.textContent = formatMoney(getMoney());
    } else if (gamemodeSelected == 'crypto') {
        cryptoLabel.textContent = formatMoney(getCrypto(), 'c');
    } else if (gamemodeSelected == 'the-world') {
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

function enableDevTools() {
    toggleCheatsBtn.textContent = 'Toggle Dev Tools';
    toggleCheatsBtn.classList.remove('hidden');
    fullCheatsBackground.classList.add('shown');
}
