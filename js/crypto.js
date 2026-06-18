const cryptoClick = document.querySelector('.crypto-click');
const cryptoPerClickLabel = document.querySelector('.crypto-per-click');
const autoMineBtn = document.querySelector('.auto-mine');

let autoMineInterval;
autoMineBtn.addEventListener('click', () => {
    if (autoMineInterval) {
        clearInterval(autoMineInterval);
        autoMineInterval = null;
        autoMineBtn.classList.add('yellow');
        autoMineBtn.classList.remove('green');
        autoMineBtn.textContent = 'Start Auto Mine';
        cryptoClick.classList.remove('auto-mine');
        return;
    }
    if (getCryptoPerClick() <= 0) {
        delayAlert('Please buy some crypto to start auto mining!');
        playSound(baseSfx.denied);
        return;
    }
    autoMineBtn.classList.remove('yellow');
    autoMineBtn.classList.add('green');
    autoMineBtn.textContent = 'Stop Auto Mining';
    cryptoClick.classList.add('auto-mine');
    unlockAchievement(79);
    autoMineInterval = setInterval(() => {
        cryptoClick.click();
    }, 1000);
});
cryptoClick.addEventListener('click', mineCrypto);

function mineCrypto() {
    if (getCryptoPerClick() <= 0) {
        alert('No crypto owned to mine! Buy some to start mining!');
        return;
    }
    let savageCoin = false;
    if (rewireStatus == 'p') {
        delayAlert('You got lucky! Coin rewired to give you 10x!\nYou gained ' + formatMoney(getCryptoPerClick() * 10, 'c') + '!');
        rewireStatus = false;
        calcCrypto(getCryptoPerClick() * 10);
    } else if (rewireStatus == 'n') {
        delayAlert('Oh no! Coin rewired to take away 20x!\nYou lost ' + formatMoney(getCryptoPerClick() * 20, 'c') + '!');
        rewireStatus = false;
        calcCrypto(-getCryptoPerClick() * 20);
    } else {
        if (Math.random() < getSavageClickChance()) {
            calcCrypto(getCryptoPerClick() * 100);
            savageCoin = true;
            setCryptoStats("savageClicks", 1);
            unlockAchievement(50);
            if (getCryptoStats().savageClicks == 10) {unlockAchievement(51);}
            playSound(cryptoSfx.savageClick);
        } else {
            calcCrypto(getCryptoPerClick());
        }
    }
    unlockAchievement(46);
    if (!savageCoin) {playSound(cryptoSfx.mineCoin);}
    moneyLabel.textContent = formatMoney(getCrypto(), 'c');
    setCryptoStats("clicks", 1);
    if (getCryptoStats().clicks == 10) {unlockAchievement(47);}
    else if (getCryptoStats().clicks == 100) {unlockAchievement(48);}
    else if (getCryptoStats().clicks == 1000) {unlockAchievement(49);}
    updateCryptoStats();
}

const cryptoWalletBtns = document.querySelectorAll('.big-itm');
const moneyOwned = document.querySelector('.money-owned-temp');
cryptoWalletBtns.forEach((coin, index) => {
    const buyBtn = coin.querySelector('.buy');
    const buyBoostBtn = coin.querySelector('.buy-boost');
    moneyOwned.textContent = formatMoney(getMoney());

    buyBtn.addEventListener('click', () => {
        if (!enoughMoney(getCoinPrices()[index])) {
            playSound(baseSfx.denied);
            delayAlert('Not enough money to buy this coin!');
            return;
        }
        calcMoney(-getCoinPrices()[index]);
        setCoinOwned(index, getCoinsOwned()[index] + 1);
        unlockAchievement(58);
        if (getCoinPrices()[index] > [10000, 75000, 500000][index]) {unlockAchievement(87 + index);}
        if (getCoinsOwned()[index] == 1) {unlockAchievement(52 + (index * 2));}
        else if (getCoinsOwned()[index] == 10) {unlockAchievement(53 + (index * 2));}
        setCryptoStats("coinsOwned", 1);
        if (getCryptoStats().coinsOwned == 100) {unlockAchievement(90);}
        moneyOwned.textContent = formatMoney(getMoney());
        calcCoinBonus();
        playSound(cryptoSfx.buyCoin);
        setCoinPrice(index, Math.floor(getCoinPrices()[index] * 1.25));
        updateCryptoUI();
        gameOverCheck();
    });
    buyBoostBtn.addEventListener('click', () => {
        if (!enoughMoney(getCoinsBoostedPrice()[index], 'c')) {
            playSound(baseSfx.denied);
            delayAlert('Not enough crypto to boost this coin!');
            return;
        }
        calcCrypto(-getCoinsBoostedPrice()[index]);
        unlockAchievement(59);
        unlockAchievement(60 + index);
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        setCoinBonus(index, getCoinBonuses()[index] * 1.5);
        setCoinPriceBoost(index, getCoinsBoostedPrice()[index] * 1.75);
        if (getCoinBonuses()[index] >= [750, 2500, 10000][index]) {unlockAchievement(80 + index);}
        playSound(cryptoSfx.boostCoin);
        calcCoinBonus();
        updateCryptoUI();
    });
});

const nftDivs = document.querySelectorAll('.nft-itm');
const nextRefreshLabel = document.querySelector('.next-refresh');
const nftsOwnedContainter = document.querySelector('#nftsOwned .flexbox');
let timer = 60;
nftDivs.forEach((nft, index) => {
    const buyBtn = nft.querySelector('button');
    const bonus = parseInt(buyBtn.dataset.bonus);
    const item = buyBtn.dataset.item;
    const price = parseInt(buyBtn.dataset.price);
    
    let newPrice = price + Math.floor((Math.random() - 0.5) * price);
    buyBtn.dataset.true = newPrice;
    buyBtn.textContent = `${formatMoney(newPrice, 'c')}`;
    
    buyBtn.addEventListener('click', () => {
        const truePrice = parseInt(buyBtn.dataset.true);
        if (!enoughMoney(truePrice, 'c')) {
            playSound(baseSfx.denied);
            delayAlert('Not enough crypto to buy this NFT!');
            return;
        }
        calcCrypto(-truePrice);
        unlockAchievement(63);
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        if (truePrice < price) {unlockAchievement(65);}
        unlockNft(item);
        if (index === 13 || index === 22) {unlockAchievement(84);}
        playSound(cryptoSfx.buyNft);
        setCryptoStats("nftBonus", bonus);
        if (getCryptoStats().nftBonus >= 250000) {unlockAchievement(77);}
        updateCryptoUI();
    });
});

setInterval(() => {
    timer--;
    if (timer <= 0) {
        nftDivs.forEach((nft, index) => {
            const buyBtn = nft.querySelector('button');
            const truePrice = parseInt(buyBtn.dataset.true);
            const price = parseInt(buyBtn.dataset.price);
            const item = buyBtn.dataset.item;

            if (isNftUnlocked(item)) {
                buyBtn.disabled = true;
                buyBtn.textContent = 'Owned';
                return;
            }
            let newPrice = price + Math.floor((Math.random() - 0.5) * price);
            buyBtn.dataset.true = newPrice;
            buyBtn.textContent = `${formatMoney(newPrice, 'c')}`;
            nft.classList.add('flash');
            setTimeout(() => {nft.classList.remove('flash');}, 250);
        });
        timer = 60;
    }
    nextRefreshLabel.textContent = timer == 60 ? '1:00' : timer < 10 ? `0:0${timer}` : `0:${timer}`;
}, 1000);

const cryptoThemeDivs = document.querySelectorAll('.crypto-theme');
const cryptoBonusThemeSelect = document.querySelector('#cryptoThemes .theme-selection .theme-bonus-select');
const cryptoVanityThemeSelect = document.querySelector('#cryptoThemes .theme-selection .theme-vanity-select');
cryptoBonusThemeSelect.addEventListener('change', () => {
    const theme = cryptoBonusThemeSelect.value;
    setBonusOrVanityTheme('bonus', theme);
    setSlotsStats('themeBonus', getThemeBonusValues()[theme][0] || 0);
    setCryptoStats('themeBonus', getThemeBonusValues()[theme][1] || 0, true);
    // setTheWorldStats('themeBonus', getThemeBonusValues()[theme][2] || 0, true);
    generateCryptoThemeOptions();
    updateCryptoUI();
});
cryptoVanityThemeSelect.addEventListener('change', () => {
    const theme = cryptoVanityThemeSelect.value;
    setBonusOrVanityTheme('vanity', theme);
    generateCryptoThemeOptions();
    updateCryptoUI();
});
cryptoThemeDivs.forEach((theme, index) => {
    const themeName = theme.dataset.theme;
    const themePrice = theme.dataset.price;
    if (isThemeUnlocked(themeName)) {addBaseSFX(theme);}

    theme.addEventListener('click', () => {
        if (getUnlockedThemes().includes(themeName)) {
            setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
            setCryptoStats('themeBonus', getThemeBonusValues()[themeName][1] || 0, true);
            setTheWorldStats('themeBonus', getThemeBonusValues()[themeName][2] || 0, true);
            setBonusOrVanityTheme('bonus', themeName);
            setBonusOrVanityTheme('vanity', themeName);
            generateCryptoThemeOptions();
            updateCryptoUI();
            return;
        }
        if (!enoughMoney(themePrice, 'c')) {
            delayAlert("Not enough crypto to buy this theme!");
            playSound(baseSfx.denied);
            return;
        }
        calcCrypto(-themePrice);
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        unlockTheme(themeName);
        unlockAchievement(66);
        document.body.classList = `${themeName}`;
        setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
        setCryptoStats('themeBonus', getThemeBonusValues()[themeName][1] || 0, true);
        setTheWorldStats('themeBonus', getThemeBonusValues()[themeName][2] || 0, true);
        setBonusOrVanityTheme('bonus', themeName);
        setBonusOrVanityTheme('vanity', themeName);
        if (themeName == 'matrix') {unlockAchievement(67);}
        playSound(slotSfx.getTheme);
        addBaseSFX(theme);
        generateCryptoThemeOptions();
        updateCryptoUI();
    });
});
function generateCryptoThemeOptions() {
    cryptoBonusThemeSelect.innerHTML = '';
    getUnlockedThemes().forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1) + ` (+$${getThemeBonusValues()[theme][0]}${getThemeBonusValues()[theme][1] ? `/₡${getThemeBonusValues()[theme][1]}` : ''}${getThemeBonusValues()[theme][2] ? `/✺${getThemeBonusValues()[theme][2]}` : ''})`;
        cryptoBonusThemeSelect.appendChild(option);
    });
    cryptoVanityThemeSelect.innerHTML = '';
    getUnlockedThemes().forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        cryptoVanityThemeSelect.appendChild(option);
    });
    cryptoBonusThemeSelect.value = getBonusAndVanityThemes().bonus;
    cryptoVanityThemeSelect.value = getBonusAndVanityThemes().vanity;
}
generateCryptoThemeOptions();

const cryptoExchangeValues = [10, 1];
const cryptoExchangePrices = [5000, 100000];
const cryptoExchangeDivs = document.querySelectorAll('.crypto.exchange-item');

cryptoExchangeDivs.forEach((div, index) => {
    const btn = div.querySelector('button');
    const priceSpan = div.querySelector('p .price');
    const valueSpan = div.querySelector('p .item');
    const currentOwnedSpan = div.querySelector('p .currently-owned');
    const base = cryptoExchangePrices[index];
    let price = +(base * (1 + (Math.random() * 0.4 - 0.2)));
    const value = cryptoExchangeValues[index];
    priceSpan.textContent = `${formatMoney(price, 'c')}`;
    currentOwnedSpan.textContent = index == 0 ? formatMoney(getMoney()) : formatMoney(getCrypto(), 'c');

    btn.addEventListener('click', () => {
        if (!enoughMoney(price, 'c')) {
            delayAlert('Not enough crypto to exchange!');
            playSound(baseSfx.denied);
            return;
        }
        calcCrypto(-price);
        if (index == 0) {calcMoney(value);}
        else if (index == 1) {calcStardust(value);}
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        playSound(slotSfx.exchange);
        if (index == 0 && price > 5500) {unlockAchievement(85);}
        else if (index == 0 && price < 4500) {unlockAchievement(86);}

        unlockAchievement(69 + index);
        price = +(base * (1 + (Math.random() * 0.4 - 0.2)));
        priceSpan.textContent = `${formatMoney(price, 'c')}`;
        currentOwnedSpan.textContent = index == 0 ? formatMoney(getMoney()) : formatMoney(getCrypto(), 'c');
    });
});

const cryptoTrophies = document.querySelectorAll('.crypto-trophies .trophy-item');
const unlockedCryptoTrophies = document.querySelector('.unlocked-crypto-trophies .flexbox');
const cryptoTrophyPrices = [10000000, 100000000, 1000000000];
cryptoTrophies.forEach((trophy, index) => {
    const price = cryptoTrophyPrices[index];
    const buyBtn = trophy.querySelector('button');

    buyBtn.addEventListener('click', () => {
        if (!enoughMoney(price, 'c')) {
            delayAlert('Not enough crypto to buy this trophy!');
            playSound(baseSfx.denied);
            return;
        }
        calcCrypto(-price);
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        unlockCryptoTrophy(index);
        unlockAchievement(74 + index);
        playSound(slotSfx.getTrophy);
        updateCryptoUI();
    });
});

const cryptoLootboxDiv = document.querySelector('.crypto.lootbox');
const cryptoLBNumber = cryptoLootboxDiv.querySelectorAll('.c-lb-n');
const cryptoLBTxt = cryptoLootboxDiv.querySelectorAll('h1');
const buyCryptoLootboxBtn = document.querySelector('.buy-lootbox.crypto');
const helpMsgTxtCrypto = `Available commands:
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
c / crypto  -  view crypto commands
cssc / changeSlotSoundCommands  -  view the commands to change the slot machine sound effects
a / admin  -  view higher level commands
etc... (find out more by experimenting with commands!)`;

buyCryptoLootboxBtn.addEventListener('click', () => {
    if (!enoughMoney(25000, 'c')) {
        delayAlert('Not enough crypto to buy a lootbox!');
        playSound(baseSfx.denied);
        return;
    }
    calcCrypto(-25000);
    moneyLabel.textContent = formatMoney(getCrypto(), 'c');
    buyCryptoLootboxBtn.disabled = true;
    playSound(slotSfx.buyLootbox);
    cryptoLootboxDiv.classList.add('opening');
    const lbPrize = Math.floor(Math.random() * 11);
    cryptoLBNumber[0].textContent = getCryptoLootboxIcons()[8];
    cryptoLBNumber[1].textContent = getCryptoLootboxIcons()[9];
    cryptoLBNumber[2].textContent = getCryptoLootboxIcons()[10];

    setTimeout(() => {playSound(slotSfx.lootboxOpening);}, 250);

    setTimeout(() => {
        cryptoLootboxDiv.classList.remove('opening');
        cryptoLBNumber[0].textContent = getCryptoLootboxIcons()[lbPrize + 4];
        cryptoLBNumber[1].textContent = getCryptoLootboxIcons()[lbPrize + 5];
        cryptoLBNumber[2].textContent = getCryptoLootboxIcons()[lbPrize + 6];
        delayAlert(`Congratulations! You won ${getCryptoLootboxPrizes()[lbPrize] == 'hacking-terminal' ? 'crypto commands in the hacking terminal' : isFinite(getCryptoLootboxPrizes()[lbPrize]) ? `${formatMoney(getCryptoLootboxPrizes()[lbPrize], 'c')}` : 'crypto background '+ (lbPrize + 1)}!`)

        if (getCryptoLootboxPrizes()[lbPrize] == 'hacking-terminal') {
            changeCryptoLootboxPrize(50000, lbPrize);
            changeCryptoLootboxIcon('💸', lbPrize + 5);
            changeCryptoLootboxIcon('💸', 4);
            cryptoLBNumber[1].textContent = '💸';
            unlockCryptoCommandsInTerminal();
            setHelpMsg(helpMsgTxtCrypto);
            unlockAchievement(72);
            helpMsg = getHelpMsg();
        }
        else if (isFinite(getCryptoLootboxPrizes()[lbPrize])) {
            calcMoney(getCryptoLootboxPrizes()[lbPrize]);
            moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        }
        else {
            unlockTheme(getCryptoLootboxPrizes()[lbPrize]);
            setBonusOrVanityTheme('vanity', getCryptoLootboxPrizes()[lbPrize]);
            setBonusOrVanityTheme('bonus', getCryptoLootboxPrizes()[lbPrize]);
            generateThemeOptions();
            generateCryptoThemeOptions();
            changeCryptoLootboxPrize(1250, lbPrize);
            changeCryptoLootboxIcon('💵', lbPrize + 5);
            if (lbPrize != 4 && lbPrize != 5 && lbPrize != 6) {
                changeCryptoLootboxIcon('💵', (lbPrize + 16) % 19);
            }
        }
        if (getCryptoLootboxPrizes().every(p => Number.isFinite(p))) {unlockAchievement(73);}
        playSound(slotSfx.winLootbox);
        buyCryptoLootboxBtn.disabled = false;
        unlockAchievement(71);
        updateCryptoUI();
    }, 3000);
});

function calcCoinBonus() {
    const coinsOwned = getCoinsOwned();
    const coinBonuses = getCoinBonuses();

    let coinBonus = 0;
    coinsOwned.forEach((owned, index) => {
        coinBonus += owned * coinBonuses[index];
    });
    setCryptoStats("coinBonus", coinBonus, true);
    if (coinBonus >= 1000000) {unlockAchievement(78);}
}

function updateCryptoUI() {
    cryptoPerClickLabel.textContent = `${formatMoney(getCryptoPerClick(), 'c')}/click`;
    updateCryptoStats();
}

const cryptoStatElements = document.querySelectorAll('.crypto-stats .table-itm > .stat');
function updateCryptoStats() {
    const cryptoStats = getCryptoStats();
    cryptoStatElements.forEach((stat, index) => {
        switch (index) {
            case 0:
            case 1:
            case 2:
                stat.textContent = Object.values(cryptoStats)[index];
                break;
            case 3:
            case 4:
            case 5:
                stat.textContent = `+${formatMoney(Object.values(cryptoStats)[index], 'c')}/click`
                break;
        }
    });

    // Wallet
    cryptoWalletBtns.forEach((coin, index) => {
        const buyBtn = coin.querySelector('.buy');
        const coinBonusLabel = coin.querySelector('.give-value');
        const totalCoinBonusLabel = coin.querySelector('.bonus');
        const coinsOwnedLabel = coin.querySelector('.owned');
        const buyBoostBtn = coin.querySelector('.buy-boost');
        const boostValueLabel = coin.querySelector('.boost-value');

        buyBtn.textContent = `$${getCoinPrices()[index].toLocaleString()}`;
        totalCoinBonusLabel.textContent = `+${formatMoney(getCoinBonuses()[index] * getCoinsOwned()[index], 'c')}/click`;
        coinsOwnedLabel.textContent = `${getCoinsOwned()[index]} owned`;
        coinBonusLabel.textContent = `+${formatMoney(getCoinBonuses()[index], 'c')}`;

        boostValueLabel.textContent = `+${formatMoney(getCoinBonuses()[index], 'c')} ➤ +${formatMoney(getCoinBonuses()[index] * 1.5, 'c')}`;
        buyBoostBtn.textContent = formatMoney(getCoinsBoostedPrice()[index], 'c');
    });

    // NFTs
    nftsOwnedContainter.innerHTML = '';
    let nftsOwned = 0;
    nftDivs.forEach((nft, index) => {
        const buyBtn = nft.querySelector('button');
        const bonus = parseInt(buyBtn.dataset.bonus);
        const item = buyBtn.dataset.item;
        const price = parseInt(buyBtn.dataset.price);

        if (isNftUnlocked(item)) {
            nft.classList.remove('locked');
            buyBtn.disabled = true;
            buyBtn.textContent = 'Owned';
            buyBtn.classList.remove('secondary');
            buyBtn.classList.add('teritry');
            nftsOwnedContainter.parentElement.classList.remove('hidden');
            nftsOwnedContainter.innerHTML += `<h1>${item}</h1>`;
            nftsOwned++;
        }
    });
    if (nftsOwned == 25) {unlockAchievement(64);}

    // Themes
    themeSelect.value = getBonusAndVanityThemes().bonus;
    vanityThemeSelect.value = getBonusAndVanityThemes().vanity;
    document.body.classList = getBonusAndVanityThemes().vanity;
    let themesOwned = 0;
    cryptoThemeDivs.forEach((theme, index) => {
        const themeName = theme.dataset.theme;
        const themePrice = theme.dataset.price;
        const buyBtn = theme.querySelector('button');

        if (isThemeUnlocked(themeName)) {
            theme.textContent = 'Switch';
            themesOwned++;
        }
    });
    if (themesOwned == 6) {unlockAchievement(68);}

    // Lootbox
    cryptoLBTxt.forEach((num, index) => {
        if (index != 8 && index != 9 && index != 10) {
            num.textContent = getCryptoLootboxIcons()[index];
        }
    });

    // Trophies
    if (getCryptoTrophiesUnlocked().length > 0) {
        unlockedCryptoTrophies.innerHTML = '';
        unlockedCryptoTrophies.parentElement.classList.remove('hidden');

        cryptoTrophies.forEach((trophy, index) => {
            const price = cryptoTrophyPrices[index];
            const buyBtn = trophy.querySelector('button');
            if (isCryptoTrophyUnlocked(index)) {
                buyBtn.disabled = true;
                buyBtn.textContent = 'Owned';
                unlockedCryptoTrophies.innerHTML += `<h1>${['🥉', '🥈', '🥇'][index]}</h1>`;
            }
        });
    }
}

updateCryptoUI();
