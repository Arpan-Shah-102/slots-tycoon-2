function getMoney() {
    return parseFloat(localStorage.getItem('money')) || 5000;
}
function setMoney(amount) {
    localStorage.setItem('money', amount);
}
function calcMoney(amount, symbol = '+') {
    let currentMoney = getMoney();
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
    setMoney(currentMoney);
}
function formatMoney(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
    return JSON.parse(localStorage.getItem('slotsStats')) || { spins: 0, jackpots: 0, nearMisses: 0, upgradeBonus: { rigMachine: 0, payout: [20, 400], cashback: 0, turbo: 100 }, dripBonus: 0, themeBonus: 0 };
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
function isTheWorldUnlocked() {
    return JSON.parse(localStorage.getItem('theWorldUnlocked')) || false;
}
function unlockTheWorld() {
    localStorage.setItem('theWorldUnlocked', true);
}