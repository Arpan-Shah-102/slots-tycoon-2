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

function delayAlert(msg, timeout = 50) {
    setTimeout(() => {
        alert(msg);
    }, timeout);
}

function getAchievementsUnlocked() {
    return JSON.parse(localStorage.getItem('achievementsUnlocked')) || [];
}
function unlockAchievementLocalStorage(id) {
    const achievementsUnlocked = getAchievementsUnlocked();
    if (!achievementsUnlocked.includes(id)) {
        achievementsUnlocked.push(id);
        localStorage.setItem('achievementsUnlocked', JSON.stringify(achievementsUnlocked));
    }
}
function isAchievementUnlocked(id) {
    return getAchievementsUnlocked().includes(id);
}

function incrementAchievementProgress(lsKey, getFunc) {
    let unlocked = getFunc();
    unlocked += 1;
    localStorage.setItem(lsKey, unlocked);
}
function getSlotsAchievementsUnlocked() {
    return parseInt(localStorage.getItem('slotsAchievementsUnlocked')) || 0;
}
function incrementSlotsAchievementsUnlocked() {
    incrementAchievementProgress('slotsAchievementsUnlocked', getSlotsAchievementsUnlocked);
}
function getCryptoAchievementsUnlocked() {
    return parseInt(localStorage.getItem('cryptoAchievementsUnlocked')) || 0;
}
function incrementCryptoAchievementsUnlocked() {
    incrementAchievementProgress('cryptoAchievementsUnlocked', getCryptoAchievementsUnlocked);
}
function getWorldAchievementsUnlocked() {
    return parseInt(localStorage.getItem('worldAchievementsUnlocked')) || 0;
}
function incrementWorldAchievementsUnlocked() {
    incrementAchievementProgress('worldAchievementsUnlocked', getWorldAchievementsUnlocked);
}
function getExtrasAchievementsUnlocked() {
    return parseInt(localStorage.getItem('extrasAchievementsUnlocked')) || 0;
}
function incrementExtrasAchievementsUnlocked() {
    incrementAchievementProgress('extrasAchievementsUnlocked', getExtrasAchievementsUnlocked);
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
function getMasterVolume() {
    const volume = parseFloat(localStorage.getItem('masterVolume'));
    return isNaN(volume) ? 50 : volume;
}
function setMasterVolume(volume) {
    localStorage.setItem('masterVolume', volume);
}
function getAdvancedMute() {
    return JSON.parse(localStorage.getItem('advancedMute')) || { 'click-1': false, 'click-2': false, 'win': false, 'lose': false, 'denied': false, 'notify': false, 'achievement': false, 'cheat': false, 'spin': false, 'jackpot': false, 'near-miss': false, 'ding': false, 'upgrade': false, 'get-theme': false, 'get-drip': false, 'get-trophy': false, 'exchange': false, 'lootbox-opening': false, 'buy-lootbox': false, 'bizarre-1': false, 'bizarre-2': false, 'bizarre-3': false, 'bizarre-4': false, 'fart-1': false, 'fart-2': false, 'fart-3': false, 'fart-4': false, 'fart-5': false, 'fart-6': false };
}
function setAdvancedMute(type, value) {
    const advancedMute = getAdvancedMute();
    advancedMute[type] = value;
    localStorage.setItem('advancedMute', JSON.stringify(advancedMute));
}

let gamemodeSelected = 'slot-machine';

// Slot Machine

function isGameWon() {
    return localStorage.getItem('gameWon') === 'true';
}
function setGameWon() {
    localStorage.setItem('gameWon', true);
}

function getSlotSymbols() {
    return JSON.parse(localStorage.getItem('slotSymbols')) || ['7️⃣', '💎', '🍒', '💵', '👑', '🎰', '🍀', '🍇', '⭐'];
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
        'slot-bg-1': [-2.5, 100, 0], 'slot-bg-2': [-2.5, 100, 0], 'slot-bg-3': [-2.5, 100, 0], 'slot-bg-4': [-2.5, 100, 0], 'slot-bg-5': [-2.5, 100, 0], 'slot-bg-6': [-2.5, 0, 1], 'slot-bg-7': [-2.5, 0, 1], 'slot-bg-8': [-2.5, 0, 1], 'slot-bg-9': [-2.5, 0, 1], 'slot-bg-10': [-2.5, 0, 1],
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

function slotTrophiesUnlocked() {
    return JSON.parse(localStorage.getItem('slotTrophiesUnlocked')) || [];
}
function unlockSlotTrophy(trophy) {
    const trophies = slotTrophiesUnlocked();
    if (!trophies.includes(trophy)) {
        trophies.push(trophy);
        localStorage.setItem('slotTrophiesUnlocked', JSON.stringify(trophies));
    }
}
function isSlotTrophyUnlocked(trophy) {
    const trophies = slotTrophiesUnlocked();
    return trophies.includes(trophy);
}

function getSlotLootboxPrizes() {
    return JSON.parse(localStorage.getItem('slotLootboxPrizes')) || ['slot-bg-1', 'slot-bg-2', 'slot-bg-3', 'slot-bg-4', 'slot-bg-5', 'slot-bg-6', 'slot-bg-7', 'slot-bg-8', 'slot-bg-9', 'slot-bg-10', 'hacking-terminal'];
}
function changeSlotLootboxPrize(prize, index) {
    const prizes = getSlotLootboxPrizes();
    prizes[index] = prize;
    localStorage.setItem('slotLootboxPrizes', JSON.stringify(prizes));
}
function isHackingTerminalUnlocked() {
    return getSlotLootboxPrizes().includes('hacking-terminal');
}
function getSlotLootboxIcons() {
    return JSON.parse(localStorage.getItem('slotLootboxIcons')) || ['7️⃣', '8️⃣', '9️⃣', '🔟', '💻', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '💻', '1️⃣', '2️⃣', '3️⃣'];
}
function changeSlotLootboxIcon(icon, index) {
    const icons = getSlotLootboxIcons();
    icons[index] = icon;
    localStorage.setItem('slotLootboxIcons', JSON.stringify(icons));
}
function isHackingTerminalUnlocked() {
    return !getSlotLootboxPrizes().includes('hacking-terminal');
}

function getAmountDonatedToYahu() {
    return parseInt(localStorage.getItem('amountDonatedToYahu')) || 0;
}
function donateToYahu() {
    let amountDonatedToYahu = getAmountDonatedToYahu();
    amountDonatedToYahu += 50;
    localStorage.setItem('amountDonatedToYahu', amountDonatedToYahu);
}

function getDailyPrizeDateClaimed() {
    return localStorage.getItem('dailyPrizeDateClaimed') || 10000000;
}
function setDailyPrizeDateClaimed(date) {
    localStorage.setItem('dailyPrizeDateClaimed', date);
}
function getVaultMessage() {
    return localStorage.getItem('vaultMessage') || '';
}
function setVaultMessage(message) {
    localStorage.setItem('vaultMessage', message);
}

function isTheFunRuined() {
    return JSON.parse(localStorage.getItem('theFunRuined')) || false;
}
function ruinTheFunSet() {
    localStorage.setItem('theFunRuined', true);
}
