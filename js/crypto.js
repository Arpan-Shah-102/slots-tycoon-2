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
    autoMineBtn.classList.remove('yellow');
    autoMineBtn.classList.add('green');
    autoMineBtn.textContent = 'Stop Auto Mining';
    cryptoClick.classList.add('auto-mine');
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
    playSound(cryptoSfx.mineCoin);
    calcCrypto(getCryptoPerClick());
    moneyLabel.textContent = formatMoney(getCrypto(), 'c');
    setCryptoStats("clicks", 1);
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
        setCryptoStats("coinsOwned", 1);
        moneyOwned.textContent = formatMoney(getMoney());
        calcCoinBonus();
        playSound(cryptoSfx.buyCoin);
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
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        setCoinBonus(index, getCoinBonuses()[index] * 1.5);
        setCoinPriceBoost(index, getCoinsBoostedPrice()[index] * 1.75);
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
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        unlockNft(item);
        playSound(cryptoSfx.buyNft);
        setCryptoStats("nftBonus", bonus);
        updateCryptoUI();
    });
});

setInterval(() => {
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
}, 60000);
setInterval(() => {
    timer--;
    if (timer <= 0) {
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
        document.body.classList = `${themeName}`;
        setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
        setCryptoStats('themeBonus', getThemeBonusValues()[themeName][1] || 0, true);
        setTheWorldStats('themeBonus', getThemeBonusValues()[themeName][2] || 0, true);
        setBonusOrVanityTheme('bonus', themeName);
        setBonusOrVanityTheme('vanity', themeName);
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

        price = +(base * (1 + (Math.random() * 0.2 - 0.1)));
        priceSpan.textContent = `${formatMoney(price, 'c')}`;
        currentOwnedSpan.textContent = index == 0 ? formatMoney(getMoney()) : formatMoney(getCrypto(), 'c');
    });
});

function calcCoinBonus() {
    const coinsOwned = getCoinsOwned();
    const coinBonuses = getCoinBonuses();
    const nftBonus = getCryptoStats().nftBonus;
    const themeBonus = getCryptoStats().themeBonus;

    let totalBonus = 0;
    coinsOwned.forEach((owned, index) => {
        totalBonus += owned * coinBonuses[index];
    });
    totalBonus += nftBonus;
    totalBonus += themeBonus;
    setCryptoStats("coinBonus", totalBonus, true);
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
                stat.textContent = Object.values(cryptoStats)[index];
                break;
            case 2:
            case 3:
            case 4:
                stat.textContent = `+${formatMoney(Object.values(cryptoStats)[index], 'c')}/click`
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
        }
    });

    // Themes
    themeSelect.value = getBonusAndVanityThemes().bonus;
    vanityThemeSelect.value = getBonusAndVanityThemes().vanity;
    document.body.classList = getBonusAndVanityThemes().vanity;
    cryptoThemeDivs.forEach((theme, index) => {
        const themeName = theme.dataset.theme;
        const themePrice = theme.dataset.price;
        const buyBtn = theme.querySelector('button');

        if (isThemeUnlocked(themeName)) {
            theme.textContent = 'Switch';
        }
    });
}

updateCryptoUI();
