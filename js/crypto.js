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
        calcCoinBonus();
        updateCryptoUI();
    });
});

function calcCoinBonus() {
    const coinsOwned = getCoinsOwned();
    const coinBonuses = getCoinBonuses();
    let totalBonus = 0;
    coinsOwned.forEach((owned, index) => {
        totalBonus += owned * coinBonuses[index];
    });
    setCryptoStats("coinBonus", totalBonus, true);
}

function updateCryptoUI() {
    cryptoPerClickLabel.textContent = `₡${getCryptoPerClick()}/click`;
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
                stat.textContent = `+₡${Object.values(cryptoStats)[index]}/click`
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
        totalCoinBonusLabel.textContent = `+₡${getCoinBonuses()[index] * getCoinsOwned()[index]}/click`;
        coinsOwnedLabel.textContent = `${getCoinsOwned()[index]} owned`;
        coinBonusLabel.textContent = `+₡${getCoinBonuses()[index]}`;

        boostValueLabel.textContent = `+${formatMoney(getCoinBonuses()[index], 'c')} ➤ +${formatMoney(getCoinBonuses()[index] * 1.5, 'c')}`;
        buyBoostBtn.textContent = formatMoney(getCoinsBoostedPrice()[index], 'c');
    });
}

updateCryptoUI();
