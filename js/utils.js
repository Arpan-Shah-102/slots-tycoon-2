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
    return JSON.parse(localStorage.getItem('advancedMute')) || { 'click-1': false, 'click-2': false, 'win': false, 'lose': false, 'denied': false, 'notify': false, 'achievement': false, 'cheat': false, 'spin': false, 'jackpot': false, 'near-miss': false, 'ding': false, 'upgrade': false, 'get-theme': false, 'get-drip': false, 'get-trophy': false, 'exchange': false, 'lootbox-opening': false, 'buy-lootbox': false, 'mine-coin': false, 'buy-coin': false, 'boost-coin': false, 'buy-nft': false, 'savage-click': false, 'bizarre-1': false, 'bizarre-2': false, 'bizarre-3': false, 'bizarre-4': false, 'fart-1': false, 'fart-2': false, 'fart-3': false, 'fart-4': false, 'fart-5': false, 'fart-6': false };
}
function setAdvancedMute(type, value) {
    const advancedMute = getAdvancedMute();
    advancedMute[type] = value;
    localStorage.setItem('advancedMute', JSON.stringify(advancedMute));
}

function getGamemodeSelected() {
    return localStorage.getItem('gamemodeSelected') || 'slot-machine';
}
function setGamemodeSelected(gamemode) {
    localStorage.setItem('gamemodeSelected', gamemode);
}

// Slot Machine

function getGuaranteedJackpot() {
    return JSON.parse(localStorage.getItem('guaranteedJackpot')) || false;
}
function setGuaranteedJackpot(value) {
    localStorage.setItem('guaranteedJackpot', value);
}

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
        'dogecoin': [0, 500, 0], 'ethereum': [1, 1180, 0], 'bitcoin': [5, 5244, 0], 'neon': [6, 19314, 0], 'matrix': [7, 100000, 1], 'quantum': [14, 98100, 10],
        // the world values
        'slot-bg-1': [-2.5, 1234, 0], 'slot-bg-2': [-2.5, 1234, 0], 'slot-bg-3': [-2.5, 1234, 0], 'slot-bg-4': [-2.5, 1234, 0], 'slot-bg-5': [-2.5, 1234, 0], 'slot-bg-6': [-2.5, 0, 1], 'slot-bg-7': [-2.5, 0, 1], 'slot-bg-8': [-2.5, 0, 1], 'slot-bg-9': [-2.5, 0, 1], 'slot-bg-10': [-2.5, 0, 1],
        'crypto-bg-1': [9.99, -25000, 0], 'crypto-bg-2': [9.99, -25000, 0], 'crypto-bg-3': [9.99, -25000, 0], 'crypto-bg-4': [9.99, -25000, 0], 'crypto-bg-5': [9.99, -25000, 0], 'crypto-bg-6': [0, -25000, 7], 'crypto-bg-7': [0, -25000, 7], 'crypto-bg-8': [0, -25000, 7], 'crypto-bg-9': [0, -25000, 7], 'crypto-bg-10': [0, -25000, 7],
        // the world lb bg values
        'cat-background': [7, 7, 7]
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

function getHelpMsg() {
    return localStorage.getItem('helpMsg') || `Available commands:
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
etc... (find out more by experimenting with commands!)`;;
}
function setHelpMsg(msg) {
    localStorage.setItem('helpMsg', msg);
}

// Crypto

function getSavageClickChance() {
    return parseFloat(localStorage.getItem('savageClickChance')) || 0.01;
}
function setSavageClickChance(chance) {
    localStorage.setItem('savageClickChance', chance/100);
}

function getCryptoStats() {
    return JSON.parse(localStorage.getItem('cryptoStats')) || { clicks: 0, savageClicks: 0, coinsOwned: 0, coinBonus: 0, nftBonus: 0, themeBonus: 0 };
}
function setCryptoStats(stat, value, set=false) {
    const cryptoStats = getCryptoStats();
    cryptoStats[stat] = !set ? cryptoStats[stat] + value : value;
    localStorage.setItem('cryptoStats', JSON.stringify(cryptoStats));
}

function getCryptoPerClick() {
    const cryptoStats = getCryptoStats();
    let perClick = cryptoStats.coinBonus + cryptoStats.nftBonus + cryptoStats.themeBonus;
    return perClick;
}

function getCoinsOwned() {
    return JSON.parse(localStorage.getItem('coinsOwned')) || [0, 0, 0];
}
function setCoinOwned(index, amount) {
    const coinsOwned = getCoinsOwned();
    coinsOwned[index] = amount;
    localStorage.setItem('coinsOwned', JSON.stringify(coinsOwned));
}
function getCoinPrices() {
    return JSON.parse(localStorage.getItem('coinPrices')) || [1000, 7500, 50000];
}
function setCoinPrice(index, price) {
    const coinPrices = getCoinPrices();
    coinPrices[index] = price;
    localStorage.setItem('coinPrices', JSON.stringify(coinPrices));
}

function getCoinsBoostedPrice() {
    return JSON.parse(localStorage.getItem('coinsBoostedPrice')) || [20000, 150000, 500000];
}
function setCoinPriceBoost(index, price) {
    const coinsBoostedPrice = getCoinsBoostedPrice();
    coinsBoostedPrice[index] = price;
    localStorage.setItem('coinsBoostedPrice', JSON.stringify(coinsBoostedPrice));
}
function getCoinBonuses() {
    return JSON.parse(localStorage.getItem('coinBonuses')) || [100, 750, 2500];
}
function setCoinBonus(index, bonus) {
    const coinBonuses = getCoinBonuses();
    coinBonuses[index] = bonus;
    localStorage.setItem('coinBonuses', JSON.stringify(coinBonuses));
}

function getNftsUnlocked() {
    return JSON.parse(localStorage.getItem('nftsUnlocked')) || [];
}
function unlockNft(type) {
    const nftsUnlocked = getNftsUnlocked();
    if (!nftsUnlocked.includes(type)) {
        nftsUnlocked.push(type);
        localStorage.setItem('nftsUnlocked', JSON.stringify(nftsUnlocked));
    }
}
function isNftUnlocked(type) {
    const nftsUnlocked = getNftsUnlocked();
    return nftsUnlocked.includes(type);
}

function getCryptoTrophiesUnlocked() {
    return JSON.parse(localStorage.getItem('cryptoTrophiesUnlocked')) || [];
}
function unlockCryptoTrophy(trophy) {
    const trophies = getCryptoTrophiesUnlocked();
    if (!trophies.includes(trophy)) {
        trophies.push(trophy);
        localStorage.setItem('cryptoTrophiesUnlocked', JSON.stringify(trophies));
    }
}
function isCryptoTrophyUnlocked(trophy) {
    const trophies = getCryptoTrophiesUnlocked();
    return trophies.includes(trophy);
}

function getCryptoLootboxPrizes() {
    return JSON.parse(localStorage.getItem('cryptoLootboxPrizes')) || ['crypto-bg-1', 'crypto-bg-2', 'crypto-bg-3', 'crypto-bg-4', 'crypto-bg-5', 'crypto-bg-6', 'crypto-bg-7', 'crypto-bg-8', 'crypto-bg-9', 'crypto-bg-10', 'hacking-terminal'];
}
function changeCryptoLootboxPrize(prize, index) {
    const prizes = getCryptoLootboxPrizes();
    prizes[index] = prize;
    localStorage.setItem('cryptoLootboxPrizes', JSON.stringify(prizes));
}
function getCryptoLootboxIcons() {
    return JSON.parse(localStorage.getItem('cryptoLootboxIcons')) || ['7️⃣', '8️⃣', '9️⃣', '🔟', '💻', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '💻', '1️⃣', '2️⃣', '3️⃣'];
}
function changeCryptoLootboxIcon(icon, index) {
    const icons = getCryptoLootboxIcons();
    icons[index] = icon;
    localStorage.setItem('cryptoLootboxIcons', JSON.stringify(icons));
}

function areCryptoCommandsUnlocked() {
    return JSON.parse(localStorage.getItem('cryptoCommandsUnlocked')) || false;
}
function unlockCryptoCommandsInTerminal() {
    localStorage.setItem('cryptoCommandsUnlocked', true);
}

function getAmountFedToCryptoCat() {
    return parseInt(localStorage.getItem('amountFedToCryptoCat')) || 0;
}
function feedCryptoCat() {
    let amountFedToCryptoCat = getAmountFedToCryptoCat();
    amountFedToCryptoCat += 1000;
    localStorage.setItem('amountFedToCryptoCat', amountFedToCryptoCat);
}

function getCatfood() {
    return JSON.parse(localStorage.getItem('catfood')) || 0;
}
function calcCatfood(amount, symbol = '+') {
    let currentCatfood = getCatfood();
    if (symbol === '+') {
        currentCatfood += amount;
    } else if (symbol === '-') {
        currentCatfood -= amount;
    }
    localStorage.setItem('catfood', currentCatfood);
}
function setCatfood(amount) {
    localStorage.setItem('catfood', amount);
}

// The World

function getTheWorldStats() {
    return JSON.parse(localStorage.getItem('theWorldStats')) || { themeBonus: 0 };
}
function setTheWorldStats(stat, value, set=false) {
    const theWorldStats = getTheWorldStats();
    theWorldStats[stat] = !set ? theWorldStats[stat] + value : value;
    localStorage.setItem('theWorldStats', JSON.stringify(theWorldStats));
}
