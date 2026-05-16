const slotSfx = {

}

const slotDisplays = document.querySelectorAll('.reel > p');
const slotTerminal = document.querySelector('.result-message');
const gWinLabel = document.querySelector('.g-win');
const spinLever = document.querySelector('.spin-lever');
const moneyLabel = document.querySelector('.money-label');

spinLever.addEventListener('click', () => {
    if (getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {
        alert('Not enough money to spin!');
        gameOverCheck();
        return;
    }
    spinSlots();
});
moneyLabel.textContent = formatMoney(getMoney());
gWinLabel.textContent = getPityJackpot();
const autoSpinBtn = document.querySelector('.activate-auto-spin');

let autoSpinInterval;
autoSpinBtn.addEventListener('click', () => {
    if (autoSpinInterval) {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
        autoSpinBtn.classList.remove('yellow');
        autoSpinBtn.classList.add('green');
        autoSpinBtn.textContent = 'Activate Auto-Spin';
        return;
    }
    autoSpinBtn.classList.remove('green');
    autoSpinBtn.classList.add('yellow');
    autoSpinBtn.textContent = 'Auto Spinning...';
    if (getMoney() >= (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {spinSlots();}

    autoSpinInterval = setInterval(() => {
        if (getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {
            clearInterval(autoSpinInterval);
            autoSpinInterval = null;
            autoSpinBtn.classList.remove('yellow');
            autoSpinBtn.classList.add('green');
            autoSpinBtn.textContent = 'Activate Auto-Spin';
            gameOverCheck();
            return;
        }
        spinSlots();
    }, 1350);
});

function spinSlots() {
    calcMoney(-10 + getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus);
    moneyLabel.textContent = formatMoney(getMoney());
    setSlotsStats('spins', getSlotsStats().spins + 1);

    spinLever.classList.add('spinning');
    slotDisplays.forEach(display => {
        display.classList.add('spinning');
    });

    slotTerminal.textContent = 'Spinning...';
    const symbols = getSlotSymbols();
    setPityJackpot(getPityJackpot() - 1);
    gWinLabel.textContent = getPityJackpot();
    updateSlotStats();
    
    let reelResults = [];
    if (getPityJackpot() == 0) {
        setPityJackpot(getSlotsStats().upgrades.pity);
        gWinLabel.textContent = "this";
        reelResults = ['7️⃣', '7️⃣', '7️⃣'];
    } else {
        for (let i = 0; i < 3; i++) {
            reelResults.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            slotDisplays[0].textContent = i >= 13 ? reelResults[0] : getSlotSymbols()[(i) % symbols.length];
            slotDisplays[1].textContent = i >= 16 ? reelResults[1] : getSlotSymbols()[(i + 1) % symbols.length];
            slotDisplays[2].textContent = i >= 19 ? reelResults[2] : getSlotSymbols()[(i + 2) % symbols.length];

            if (i == 13) {slotDisplays[0].classList.remove('spinning');}
            if (i == 16) {slotDisplays[1].classList.remove('spinning');}
            if (i == 19) {slotDisplays[2].classList.remove('spinning');}
        }, 55 * i);
    }

    setTimeout(() => {
        if (reelResults[0] == reelResults[1] && reelResults[1] == reelResults[2]) {
            slotTerminal.textContent = 'Jackpot! You win ' + formatMoney(getSlotsStats().upgrades.payout[1]) + '!';
            calcMoney(getSlotsStats().upgrades.payout[1]);
            moneyLabel.textContent = formatMoney(getMoney());
            setSlotsStats('jackpots', getSlotsStats().jackpots + 1);
        } else if (reelResults[0] == reelResults[1] || reelResults[1] == reelResults[2] || reelResults[0] == reelResults[2]) {
            slotTerminal.textContent = 'Near Miss! You win ' + formatMoney(getSlotsStats().upgrades.payout[0]) + '!';
            calcMoney(getSlotsStats().upgrades.payout[0]);
            moneyLabel.textContent = formatMoney(getMoney());
            setSlotsStats('nearMisses', getSlotsStats().nearMisses + 1);
        } else {
            slotTerminal.textContent = 'No win. Try again!';
        }

        gWinLabel.textContent = getPityJackpot();
        spinLever.classList.remove('spinning');
        updateSlotStats();
        if (getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {gameOverCheck();}
    }, 1150);
}

const slotUpgrades = document.querySelectorAll('.slot-upgrade');
slotUpgrades.forEach((upgrade, index) => {
    const btn = upgrade.querySelector('button.primary');

    if (index == 0) {
        btn.addEventListener('click', () => {
            if (!isAutoSpinUnlocked()) {
                if (!enoughMoney(300)) {
                    alert('Not enough money!');
                    return
                }
                calcMoney(-300);
                moneyLabel.textContent = formatMoney(getMoney());
                unlockAutoSpin();
                updateSlotUI();
                gameOverCheck();
            }
        });
    } else {
        btn.addEventListener('click', () => {
            if (getSlotUpgradeLevels()[btn.dataset.type] < 5) {
                const upgradeType = btn.dataset.type;
                const upgradePrice = getSlotUpgradePrices()[upgradeType];
                const upgradeLevelDisplays = upgrade.querySelectorAll('.level > div.empty');

                if (!enoughMoney(upgradePrice)) {
                    alert('Not enough money to upgrade!');
                    return;
                }
                setSlotUpgradeLevel(upgradeType, getSlotUpgradeLevels()[upgradeType] + 1);
                calcMoney(-upgradePrice);
                moneyLabel.textContent = formatMoney(getMoney());
                upgradeFunctions[index - 1]();
                updateSlotUI();
                gameOverCheck();
                return;
            }
            alert('Upgrade already at max level!')
        });
    }
});

function upgradeRig() {
    removeSlotSymbol();
}
function upgradePayout() {
    const slotsStats = getSlotsStats();
    slotsStats.upgrades.payout[0] += 5;
    slotsStats.upgrades.payout[1] += 50;
    localStorage.setItem('slotsStats', JSON.stringify(slotsStats));
}
function upgradeCashback() {
    const slotsStats = getSlotsStats();
    slotsStats.upgrades.cashback += 0.75;
    localStorage.setItem('slotsStats', JSON.stringify(slotsStats));
}
function upgradePity() {
    const slotsStats = getSlotsStats();
    slotsStats.upgrades.pity -= 5;
    localStorage.setItem('slotsStats', JSON.stringify(slotsStats));

    if (getPityJackpot() > slotsStats.upgrades.pity) {
        setPityJackpot(slotsStats.upgrades.pity);
    }
    gWinLabel.textContent = getPityJackpot();
}
const upgradeFunctions = [upgradeRig, upgradePayout, upgradeCashback, upgradePity];

const unlockedDripCont = document.querySelector('.unlocked-drip');
const allDripConts = document.querySelectorAll('.drip-item');
allDripConts.forEach((cont, index) => {
    const btn = cont.querySelector('button');
    const price = parseFloat(btn.value);
    const item = btn.dataset.item;

    btn.addEventListener('click', () => {
        if (!enoughMoney(price)) {
            alert('Not enough money to get this drip!');
            return;
        }
        calcMoney(-price);
        moneyLabel.textContent = formatMoney(getMoney());
        unlockDrip(item);
        setSlotsStats('dripBonus', getSlotsStats().dripBonus + (price / (1000 - index)));
        updateSlotUI();
        gameOverCheck();
    });
});

const themeSelect = document.querySelector('.theme-bonus-select');
const vanityThemeSelect = document.querySelector('.theme-vanity-select');
const shopThemes = document.querySelectorAll('.theme.slot-thing');
const slotThemeBonusValues = {}

themeSelect.addEventListener('change', () => {
    setBonusOrVanityTheme('bonus', themeSelect.value);
    setSlotsStats('themeBonus', getThemeBonusValues()[themeSelect.value][0] || 0);
    generateThemeOptions();
    updateSlotUI();
});
vanityThemeSelect.addEventListener('change', () => {
    setBonusOrVanityTheme('vanity', vanityThemeSelect.value);
    generateThemeOptions();
    updateSlotUI();
});

shopThemes.forEach(theme => {
    theme.addEventListener('click', () => {
        const themeName = theme.dataset.theme;
        const themePrice = parseFloat(theme.dataset.price);

        if (isThemeUnlocked(themeName)) {
            setBonusOrVanityTheme('bonus', themeName);
            setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
            setBonusOrVanityTheme('vanity', themeName);
            generateThemeOptions();
            updateSlotUI();
            return;
        }
        if (!enoughMoney(themePrice)) {
            alert('Not enough money to buy this theme!');
            return;
        }
        calcMoney(-themePrice);
        moneyLabel.textContent = formatMoney(getMoney());
        unlockTheme(themeName);
        setBonusOrVanityTheme('bonus', themeName);
        setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
        setBonusOrVanityTheme('vanity', themeName);
        generateThemeOptions();
        updateSlotUI();
        gameOverCheck();
    });
});

const slotStats = document.querySelectorAll('.slot-stats .table-itm > .stat');
function updateSlotUI() {
    // update upgrade buttons
    slotUpgrades.forEach((upgrade, index) => {
        const btn = upgrade.querySelector('button:not(.activate-auto-spin)');
        if (index == 0) {
            if (isAutoSpinUnlocked()) {
                btn.classList.remove('primary');
                btn.classList.add('secondary', 'yellow');
                btn.disabled = true;
                btn.textContent = 'Unlocked!';

                autoSpinBtn.classList.remove('red', 'secondary');
                autoSpinBtn.classList.add('green');
                autoSpinBtn.disabled = false;
            }
        } else {
            const upgradeType = btn.dataset.type;
            const upgradePrice = getSlotUpgradePrices()[upgradeType];
            const upgradeLevelDisplays = upgrade.querySelectorAll('.level > div');
            btn.textContent = '$' + getSlotUpgradePrices()[upgradeType];
            if (getSlotUpgradeLevels()[upgradeType] >= 5) {
                btn.classList.remove('primary');
                btn.classList.add('secondary', 'green');
                btn.disabled = true;
                btn.textContent = 'MAXED!';
            }

            Array.from(upgradeLevelDisplays).reverse().forEach((display, level) => {
                const currentLevel = getSlotUpgradeLevels()[upgradeType];
                if (level < currentLevel) {
                    display.classList.remove('empty');
                } else {
                    display.classList.add('empty');
                }
            });
        }
    });

    updateSlotStats();

    // update drip items
    if (getDripUnlocked().length > 0) {
        unlockedDripCont.classList.remove('hidden');
        const dripItemCont = unlockedDripCont.querySelector('.flexbox');
        dripItemCont.innerHTML = '';

        allDripConts.forEach((cont, index) => {
            const btn = cont.querySelector('button');
            const price = parseFloat(btn.value);
            const item = btn.dataset.item;

            if (isDripUnlocked(item)) {    
                dripItemCont.innerHTML += `<h1>${item}</h1>`;
                btn.classList.remove('secondary');
                btn.classList.add('teritry');
                btn.disabled = true;
                btn.textContent = 'Owned';
            }
        });
    }

    // themes
    themeSelect.value = getBonusAndVanityThemes().bonus;
    vanityThemeSelect.value = getBonusAndVanityThemes().vanity;
    document.body.classList = getBonusAndVanityThemes().vanity;
    shopThemes.forEach(theme => {
        const themeName = theme.dataset.theme;
        if (isThemeUnlocked(themeName)) {
            theme.textContent = "Switch"
        }
    });
}
function generateThemeOptions() {
    themeSelect.innerHTML = '';
    getUnlockedThemes().forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1) + ` (+$${getThemeBonusValues()[theme][0]}${getThemeBonusValues()[theme][1] ? `/₡${getThemeBonusValues()[theme][1]}` : ''}${getThemeBonusValues()[theme][2] ? `/✺${getThemeBonusValues()[theme][2]}` : ''})`;
        themeSelect.appendChild(option);
    });
    vanityThemeSelect.innerHTML = '';
    getUnlockedThemes().forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        vanityThemeSelect.appendChild(option);
    });
}
function updateSlotStats() {
    slotStats.forEach((stat, index) => {
        const slotsStats = getSlotsStats();
        switch (index) {
            case 0:
            case 1:
            case 2:
                stat.textContent = slotsStats[stat.classList[0]];
                break;
            case 3:
                stat.textContent = Math.round((1 / (getSlotSymbols().length < 12 ? (getSlotSymbols().length ** 2) : 10000)) * 4900) + '%';
                break;
            case 4:
                stat.textContent = `$${slotsStats.upgrades.payout[0]}, $${slotsStats.upgrades.payout[1]}`;
                break;
            case 5:
                stat.textContent = '+' + formatMoney(slotsStats.upgrades.cashback) + '/spin';
                break;
            case 6:
                stat.textContent = slotsStats.upgrades[stat.classList[0]] + ' spins';
                break;
            case 7:
            case 8:
                stat.textContent = '+' + formatMoney(slotsStats[stat.classList[0]]) + '/spin';
                break;
        }
    });
}

const slotExchange = document.querySelector('.slot-exchange');
// const slotExchangeDiv = document.querySelector('.slot-exchange-div');

const gameWinScreen = document.querySelector('.game-over-screen.win');
const gameLoseScreen = document.querySelector('.game-over-screen.lose');
gameWinScreen.querySelector('button').addEventListener('click', () => {
    gameWinScreen.classList.remove('shown');
});
gameLoseScreen.querySelector('button').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
function gameOverCheck() {
    setTimeout(() => {
        if (!isCryptoGamemodeUnlocked() && getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {
            alert("You're out of money I see...");
            gameLoseScreen.classList.add('shown');
        }
    }, 50);
}
generateThemeOptions();
updateSlotUI();
