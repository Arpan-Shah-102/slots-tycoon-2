function getMoney() {
    return parseFloat(localStorage.getItem('money')) || 3000;
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

function enoughMoney(amount, type = 'm') {
    let currentMoney;
    if (type === 'm') {currentMoney = getMoney();}
    else if (type === 'c') {currentMoney = getCrypto();}
    else if (type === 's') {currentMoney = getStardust();}
    return currentMoney >= amount;
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
        return '₡' + Math.floor(amount).toLocaleString();
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

function getTheme() {
    return localStorage.getItem('theme') || 'dark';
}
function setTheme(theme) {
    localStorage.setItem('theme', theme);
}
function getUnlockedThemes() {
    return JSON.parse(localStorage.getItem('unlockedThemes')) || ['dark', 'light', 'red', 'green', 'blue', 'purple'];
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

function isMuted() {
    return JSON.parse(localStorage.getItem('muted')) || false;
}
function toggleMute() {
    const muted = isMuted();
    localStorage.setItem('muted', !muted);
}
function getAdvancedMute() {
    return JSON.parse(localStorage.getItem('advancedMute')) || { music: false, sfx: false };
}
function setAdvancedMute(type, value) {
    const advancedMute = getAdvancedMute();
    advancedMute[type] = value;
    localStorage.setItem('advancedMute', JSON.stringify(advancedMute));
}
function playSound(sfx) {
    if (isMuted()) return;
    if (getAdvancedMute().sfx) return;
    const audio = sfx.cloneNode();
    audio.play();
    audio.addEventListener('ended', () => {
        audio.remove();
    });
}

// Slot Machine

function isGameWon() {
    return localStorage.getItem('gameWon') === 'true';
}
function setGameWon() {
    localStorage.setItem('gameWon', true);
}

function getSlotSymbols() {
    return JSON.parse(localStorage.getItem('slotSymbols')) || ['7️⃣', '💎', '🍒', '🍀', '💵', '👑', '🎰', '🍇', '⭐', '💰', '🍉', '🪙'];
}
function removeSlotSymbol() {
    const symbols = getSlotSymbols();
    if (symbols.length > 0) {
        symbols.pop();
        localStorage.setItem('slotSymbols', JSON.stringify(symbols));
    }
}
function getPityJackpot() {
    const raw = localStorage.getItem('pityJackpot');
    if (raw === null) {return getSlotsStats().upgrades.pity;}
    return parseInt(raw);
}
function setPityJackpot(amount) {
    localStorage.setItem('pityJackpot', amount);
}

function getSlotsStats() {
    return JSON.parse(localStorage.getItem('slotsStats')) || { spins: 0, jackpots: 0, nearMisses: 0, upgrades: { rigMachine: 0, payout: [20, 400], cashback: 0, pity: 100 }, dripBonus: 0, themeBonus: 0 };
}
function setSlotsStats(stat, value) {
    const slotsStats = getSlotsStats();
    slotsStats[stat] = value;
    localStorage.setItem('slotsStats', JSON.stringify(slotsStats));
}

function getSlotUpgradeLevels() {
    return JSON.parse(localStorage.getItem('slotUpgradeLevels')) || { rigMachine: 0, payout: 0, cashback: 0, pity: 0 };
}
function setSlotUpgradeLevel(upgrade, level) {
    const slotUpgradeLevels = getSlotUpgradeLevels();
    slotUpgradeLevels[upgrade] = level;
    localStorage.setItem('slotUpgradeLevels', JSON.stringify(slotUpgradeLevels));
}
function getSlotUpgradePrices() {
    const slotUpgradeLevels = getSlotUpgradeLevels();
    let prices = {};
    prices.rigMachine = 500 + (100 * slotUpgradeLevels.rigMachine);
    prices.payout = 250 + (125 * slotUpgradeLevels.payout);
    prices.cashback = 75 + (75 * slotUpgradeLevels.cashback);
    prices.pity = 50 + (50 * slotUpgradeLevels.pity);
    return prices;
}
function isAutoSpinUnlocked() {
    return localStorage.getItem('autoSpinUnlocked') === 'true';
}
function unlockAutoSpin() {
    localStorage.setItem('autoSpinUnlocked', true);
}

function getDripUnlocked() {
    return JSON.parse(localStorage.getItem('dripUnlocked')) || [];
}
function unlockDrip(type) {
    const dripUnlocked = getDripUnlocked();
    if (!dripUnlocked.includes(type)) {
        dripUnlocked.push(type);
        localStorage.setItem('dripUnlocked', JSON.stringify(dripUnlocked));
    }
}
function isDripUnlocked(type) {
    const dripUnlocked = getDripUnlocked();
    return dripUnlocked.includes(type);
}

function getThemeBonusValues() {
    return {
        'dark': [0, 0, 0], 'light': [0, 0, 0], 'red': [0, 0, 0], 'green': [0, 0, 0], 'blue': [0, 0, 0], 'purple': [0, 0, 0],
        'fire': [0.75, 0, 0], 'ice': [0.75, 0, 0], 'nature': [0.75, 0, 0], 'space': [2.5, 0, 0], 'cosmic': [5.99, 0, 0], 'godly': [7.77, 0, 0],
        // crypto values
        // the world values
    }
}
function getBonusAndVanityThemes() {
    return JSON.parse(localStorage.getItem('bonusAndVanityThemesUnlocked')) || { bonus: 'dark', vanity: 'dark' };
}
function setBonusOrVanityTheme(type, theme) {
    const bonusAndVanityThemesUnlocked = getBonusAndVanityThemes();
    bonusAndVanityThemesUnlocked[type] = theme;
    localStorage.setItem('bonusAndVanityThemesUnlocked', JSON.stringify(bonusAndVanityThemesUnlocked));
}
