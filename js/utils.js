function getMoney() {
    return parseFloat(localStorage.getItem('money')) || 5000;
}
function setMoney(amount) {
    localStorage.setItem('money', amount);
}
function calcMoney(amount, symbol = '+') {
    calcCurrency(amount, 'm', symbol);
}

function getCrypto() {
    return parseFloat(localStorage.getItem('crypto')) || 0;
}
function setCrypto(amount) {
    localStorage.setItem('crypto', amount);
}
function calcCrypto(amount, symbol = '+') {
    calcCurrency(amount, 'c', symbol);
}

function getStardust() {
    return parseFloat(localStorage.getItem('stardust')) || 0;
}
function setStardust(amount) {
    localStorage.setItem('stardust', amount);
}
function calcStardust(amount, symbol = '+') {
    calcCurrency(amount, 's', symbol);
}

function calcCurrency(amount, currency, symbol) {
    let currentMoney;
    if (currency === 'm') {currentMoney = getMoney();}
    else if (currency === 'c') {currentMoney = getCrypto();}
    else if (currency === 's') {currentMoney = getStardust();}

    if (symbol === '+') {
        currentMoney += amount;
    } else if (symbol === '-') {
        currentMoney -= amount;
    } else if (symbol === '*') {
        currentMoney *= amount;
    } else if (symbol === '/') {
        currentMoney /= amount;
    } else if (symbol === '%') {
        currentMoney %= amount;
    } else if (symbol === '**') {
        currentMoney **= amount;
    }

    if (currency === 'm') {setMoney(currentMoney);}
    else if (currency === 'c') {setCrypto(currentMoney);}
    else if (currency === 's') {setStardust(currentMoney);}
}
function formatMoney(amount, type = 'm') {
    if (type === 'm') {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else if (type === 'c') {
        return '₡' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (type === 's') {
        return '✺' + Math.floor(amount).toLocaleString();
    }
}

function getAchievementsUnlocked() {
    return JSON.parse(localStorage.getItem('achievementsUnlocked')) || [];
}
function unlockAchievement(id) {
    const achievementsUnlocked = getAchievementsUnlocked();
    if (!achievementsUnlocked.includes(id)) {
        achievementsUnlocked.push(id);
        localStorage.setItem('achievementsUnlocked', JSON.stringify(achievementsUnlocked));
    }
}
function isAchievementUnlocked(id) {
    const achievementsUnlocked = getAchievementsUnlocked();
    return achievementsUnlocked.includes(id);
}

function getSlotsStats() {
    return JSON.parse(localStorage.getItem('slotsStats')) || { spins: 0, jackpots: 0, nearMisses: 0, upgradeBonus: { rigMachine: 0, payout: [20, 400], cashback: 0, pity: 100 }, dripBonus: 0, themeBonus: 0 };
}

function getTheme() {
    return localStorage.getItem('theme') || 'dark';
}
function setTheme(theme) {
    localStorage.setItem('theme', theme);
}
function getUnlockedThemes() {
    return JSON.parse(localStorage.getItem('unlockedThemes')) || ['dark'];
}
function unlockTheme(theme) {
    const unlockedThemes = getUnlockedThemes();
    if (!unlockedThemes.includes(theme)) {
        unlockedThemes.push(theme);
        localStorage.setItem('unlockedThemes', JSON.stringify(unlockedThemes));
    }
}
function isThemeUnlocked(theme) {
    const unlockedThemes = getUnlockedThemes();
    return unlockedThemes.includes(theme);
}

function isCryptoGamemodeUnlocked() {
    return JSON.parse(localStorage.getItem('cryptoGamemodeUnlocked')) || false;
}
function unlockCryptoGamemode() {
    localStorage.setItem('cryptoGamemodeUnlocked', true);
}
function isMadeInHeavenUnlocked() {
    return JSON.parse(localStorage.getItem('madeInHeavenUnlocked')) || false;
}
function unlockMadeInHeaven() {
    localStorage.setItem('madeInHeavenUnlocked', true);
}