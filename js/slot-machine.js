const slotDisplays = document.querySelectorAll('.reel > p');
const slotTerminal = document.querySelector('.result-message');
const gWinLabel = document.querySelector('.g-win');
const spinLever = document.querySelector('.spin-lever');
const moneyLabel = document.querySelector('.money-label');

spinLever.addEventListener('click', () => {
    if (getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {
        delayAlert('Not enough money to spin!');
        playSound(baseSfx.denied);
        gameOverCheck();
        return;
    }
    spinSlots();
});
moneyLabel.textContent = formatMoney(getMoney());
gWinLabel.textContent = getPityJackpot();
const autoSpinBtn = document.querySelector('.activate-auto-spin');

let autoSpinInterval;
addBaseSFX(autoSpinBtn);
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
            delayAlert('Not enough money to continue auto-spinning!');
            playSound(baseSfx.denied);
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
    unlockAchievement(0);
    playSound(slotSfx.spin);
    if (getSlotsStats().spins == 10) {unlockAchievement(1);}
    else if (getSlotsStats().spins == 100) {unlockAchievement(23);}
    else if (getSlotsStats().spins == 1000) {unlockAchievement(24);}
    else if (getSlotsStats().spins == 10000) {unlockAchievement(25);}

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
            if (i == 13 || i == 16 || i == 19) {playSound(slotSfx.ding);}
        }, 55 * i);
    }

    setTimeout(() => {
        if (reelResults[0] == reelResults[1] && reelResults[1] == reelResults[2]) {
            slotTerminal.textContent = 'Jackpot! You win ' + formatMoney(getSlotsStats().upgrades.payout[1]) + '!';
            calcMoney(getSlotsStats().upgrades.payout[1]);
            moneyLabel.textContent = formatMoney(getMoney());
            playSound(slotSfx.jackpot);
            setSlotsStats('jackpots', getSlotsStats().jackpots + 1);

            if (getSlotsStats().jackpots == 1) {unlockAchievement(3);}
            else if (getSlotsStats().jackpots == 10) {unlockAchievement(26);}
            else if (getSlotsStats().jackpots == 100) {unlockAchievement(27);}
            if (reelResults.every(s => s == '7️⃣')) {unlockAchievement(36);}
        }
        else if (reelResults[0] == reelResults[1] || reelResults[1] == reelResults[2] || reelResults[0] == reelResults[2]) {
            slotTerminal.textContent = 'Near Miss! You win ' + formatMoney(getSlotsStats().upgrades.payout[0]) + '!';
            calcMoney(getSlotsStats().upgrades.payout[0]);
            moneyLabel.textContent = formatMoney(getMoney());
            playSound(slotSfx.nearMiss);
            setSlotsStats('nearMisses', getSlotsStats().nearMisses + 1);
            unlockAchievement(2);
        }
        else {
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
                    delayAlert('Not enough money!');
                    playSound(baseSfx.denied);
                    return
                }
                calcMoney(-300);
                moneyLabel.textContent = formatMoney(getMoney());
                unlockAutoSpin();
                playSound(slotSfx.upgrade);
                unlockAchievement(5);
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
                    delayAlert('Not enough money to upgrade!');
                    playSound(baseSfx.denied);
                    return;
                }
                setSlotUpgradeLevel(upgradeType, getSlotUpgradeLevels()[upgradeType] + 1);
                calcMoney(-upgradePrice);
                moneyLabel.textContent = formatMoney(getMoney());
                upgradeFunctions[index - 1]();
                playSound(slotSfx.upgrade);
                unlockAchievement(4);
                if (getSlotUpgradeLevels()[upgradeType] == 5) {unlockAchievement(5 + index);}
                updateSlotUI();
                gameOverCheck();
                return;
            }
            delayAlert('Upgrade already at max level!')
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
            delayAlert('Not enough money to get this drip!');
            playSound(baseSfx.denied);
            return;
        }
        calcMoney(-price);
        moneyLabel.textContent = formatMoney(getMoney());
        unlockDrip(item);
        setSlotsStats('dripBonus', getSlotsStats().dripBonus + (price / (1000 - index)));
        playSound(slotSfx.getDrip);
        unlockAchievement(10);
        if ([11, 14, 16, 24].includes(index)) {unlockAchievement(37);}
        if (getDripUnlocked().length == allDripConts.length) {unlockAchievement(11);}
        if (getSlotsStats().dripBonus >= 5) {unlockAchievement(28);}
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
    setCryptoStats('themeBonus', getThemeBonusValues()[themeSelect.value][1] || 0, true);
    // setTheWorldStats('themeBonus', getThemeBonusValues()[themeSelect.value][2] || 0, true);
    generateThemeOptions();
    updateSlotUI();
});
vanityThemeSelect.addEventListener('change', () => {
    setBonusOrVanityTheme('vanity', vanityThemeSelect.value);
    generateThemeOptions();
    updateSlotUI();
});
addBaseSFX(themeSelect);
addBaseSFX(vanityThemeSelect);

shopThemes.forEach(theme => {
    const themeName = theme.dataset.theme;
    const themePrice = parseFloat(theme.dataset.price);
    if (isThemeUnlocked(themeName)) {
        addBaseSFX(theme);
    }

    theme.addEventListener('click', () => {
        if (isThemeUnlocked(themeName)) {
            setBonusOrVanityTheme('bonus', themeName);
            setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
            setCryptoStats('themeBonus', getThemeBonusValues()[themeName][1] || 0, true);
            setTheWorldStats('themeBonus', getThemeBonusValues()[themeName][2] || 0, true);
            setBonusOrVanityTheme('vanity', themeName);
            generateThemeOptions();
            updateSlotUI();
            return;
        }
        if (!enoughMoney(themePrice)) {
            delayAlert('Not enough money to buy this theme!');
            playSound(baseSfx.denied);
            return;
        }
        playSound(slotSfx.getTheme);
        calcMoney(-themePrice);
        moneyLabel.textContent = formatMoney(getMoney());
        unlockTheme(themeName);
        unlockAchievement(12);
        if (getThemeBonusValues()[themeName][0] >= 5) {unlockAchievement(13);}
        if (themeName == 'godly') {unlockAchievement(35);}
        if ([...shopThemes].every(t => isThemeUnlocked(t.dataset.theme))) {unlockAchievement(14);}

        setBonusOrVanityTheme('bonus', themeName);
        setSlotsStats('themeBonus', getThemeBonusValues()[themeName][0] || 0);
        setCryptoStats('themeBonus', getThemeBonusValues()[themeName][1] || 0, true);
        setTheWorldStats('themeBonus', getThemeBonusValues()[themeName][2] || 0, true);
        setBonusOrVanityTheme('vanity', themeName);
        generateThemeOptions();
        addBaseSFX(theme);
        updateSlotUI();
        gameOverCheck();
    });
});

const exchangeValues = [1000, 1];
const exchangePrices = [12.50, 250.00];
const exchangeDivs = document.querySelectorAll('.money.exchange-item');

exchangeDivs.forEach((div, index) => {
    const btn = div.querySelector('button');
    const priceSpan = div.querySelector('p .price');
    const valueSpan = div.querySelector('p .item');
    const currentOwnedSpan = div.querySelector('p .currently-owned');
    const base = exchangePrices[index];
    let price = +(base * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2);
    const value = exchangeValues[index];
    priceSpan.textContent = `${formatMoney(price)}`;
    currentOwnedSpan.textContent = index == 0 ? formatMoney(getCrypto(), 'c') : formatMoney(getStardust(), 's');

    btn.addEventListener('click', () => {
        if (!enoughMoney(price)) {
            delayAlert('Not enough money to exchange!');
            playSound(baseSfx.denied);
            return;
        }
        calcMoney(-price);
        if (index == 0) {calcCrypto(value);}
        else if (index == 1) {calcStardust(value);}
        moneyLabel.textContent = formatMoney(getMoney());
        playSound(slotSfx.exchange);

        if (price >= 13.5 && index == 0) {unlockAchievement(31);}
        else if (price <= 11.5 && index == 0) {unlockAchievement(32);}

        price = +(base * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2);
        priceSpan.textContent = `${formatMoney(price)}`;
        currentOwnedSpan.textContent = index == 0 ? formatMoney(getCrypto(), 'c') : formatMoney(getStardust(), 's');
    });
});

const trophiesFlexbox = document.querySelector('.unlocked-trophies > .flexbox');
const trophies = document.querySelectorAll('.slots-trophies .trophy-item');
const trophyPrices = [10000, 100000, 1000000];
const trophyIcons = ['🥉', '🥈', '🥇'];

trophies.forEach((trophy, index) => {
    const btn = trophy.querySelector('button');
    addBaseSFX(btn);
    btn.addEventListener('click', () => {
        if (!enoughMoney(trophyPrices[index])) {
            delayAlert('Not enough money to buy this trophy!');
            playSound(baseSfx.denied);
            return;
        }
        calcMoney(-trophyPrices[index]);
        moneyLabel.textContent = formatMoney(getMoney());
        unlockSlotTrophy(index);
        unlockAchievement(18 + index);
        playSound(slotSfx.getTrophy);
        updateSlotUI();
        gameOverCheck();
    });
});

const slotLootboxDiv = document.querySelector('.slot.lootbox');
const slotLBNumber = slotLootboxDiv.querySelectorAll('.lb-n');
const slotLBTxt = slotLootboxDiv.querySelectorAll('h1');
const buyLootboxBtn = document.querySelector('.buy-lootbox');

const hackingTerminalDiv = document.querySelector('.hacking-terminal');
const hackingTerminalLink = document.querySelector('.hacking-terminal-link');

buyLootboxBtn.addEventListener('click', () => {
    if (!enoughMoney(250)) {
        delayAlert('Not enough money to buy a lootbox!');
        playSound(baseSfx.denied);
        return;
    }
    calcMoney(-250);
    moneyLabel.textContent = formatMoney(getMoney());
    buyLootboxBtn.disabled = true;
    playSound(slotSfx.buyLootbox);
    slotLootboxDiv.classList.add('opening');
    const lbPrize = Math.floor(Math.random() * 11);
    slotLBNumber[0].textContent = getSlotLootboxIcons()[8];
    slotLBNumber[1].textContent = getSlotLootboxIcons()[9];
    slotLBNumber[2].textContent = getSlotLootboxIcons()[10];

    setTimeout(() => {playSound(slotSfx.lootboxOpening);}, 250);

    setTimeout(() => {
        slotLootboxDiv.classList.remove('opening');
        slotLBNumber[0].textContent = getSlotLootboxIcons()[lbPrize + 4];
        slotLBNumber[1].textContent = getSlotLootboxIcons()[lbPrize + 5];
        slotLBNumber[2].textContent = getSlotLootboxIcons()[lbPrize + 6];
        delayAlert(`Congratulations! You won ${getSlotLootboxPrizes()[lbPrize] == 'hacking-terminal' ? 'the hacking terminal' : isFinite(getSlotLootboxPrizes()[lbPrize]) ? `$${getSlotLootboxPrizes()[lbPrize]}.00` : 'background '+ (lbPrize + 1)}!`)
        unlockAchievement(15);

        if (getSlotLootboxPrizes()[lbPrize] == 'hacking-terminal') {
            changeSlotLootboxPrize(500, lbPrize);
            changeSlotLootboxIcon('💸', lbPrize + 5);
            changeSlotLootboxIcon('💸', 4);
            unlockAchievement(16);
            slotLBNumber[1].textContent = '💸';
            hackingTerminalDiv.classList.remove('hidden');
            hackingTerminalLink.classList.remove('hidden');
            setLastLoginWithIP();
        }
        else if (isFinite(getSlotLootboxPrizes()[lbPrize])) {
            calcMoney(getSlotLootboxPrizes()[lbPrize]);
            moneyLabel.textContent = formatMoney(getMoney());
        }
        else {
            unlockTheme(getSlotLootboxPrizes()[lbPrize]);
            setBonusOrVanityTheme('vanity', getSlotLootboxPrizes()[lbPrize]);
            setBonusOrVanityTheme('bonus', getSlotLootboxPrizes()[lbPrize]);
            generateThemeOptions();
            changeSlotLootboxPrize(150, lbPrize);
            changeSlotLootboxIcon('💵', lbPrize + 5);
            if (lbPrize != 4 && lbPrize != 5 && lbPrize != 6) {
                changeSlotLootboxIcon('💵', (lbPrize + 16) % 19);
            }
        }
        if (getSlotLootboxPrizes().every(p => p.isFinite)) {unlockAchievement(17);}
        playSound(slotSfx.winLootbox);
        buyLootboxBtn.disabled = false;
        updateSlotUI();
    }, 3000);
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

    // trophies
    const unlockedTrophies = slotTrophiesUnlocked();
    if (unlockedTrophies.length > 0) {
        const unlockedTrophiesSection = document.querySelector('.unlocked-trophies');
        unlockedTrophiesSection.classList.remove('hidden');
        trophiesFlexbox.innerHTML = '';

        unlockedTrophies.forEach((trophyIndex, index) => {
            const btn = trophies[trophyIndex].querySelector('button');
            btn.disabled = true;
            btn.textContent = 'Owned';
            trophiesFlexbox.innerHTML += `<h1>${trophyIcons[trophyIndex]}</h1>`;
        });
    }

    // lootbox
    slotLBTxt.forEach((num, index) => {
        if (index != 8 && index != 9 && index != 10) {
            num.textContent = getSlotLootboxIcons()[index];
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
    themeSelect.value = getBonusAndVanityThemes().bonus;
    vanityThemeSelect.value = getBonusAndVanityThemes().vanity;
}
function updateSlotStats() {
    const slotsStats = getSlotsStats();
    if (slotsStats.upgrades.cashback + slotsStats.dripBonus + slotsStats.themeBonus >= 10) {unlockAchievement(29);}
    slotStats.forEach((stat, index) => {
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
        if (getMoney() < 250) {unlockAchievement(34);}
        if ((!isCryptoGamemodeUnlocked() || isCryptoGamemodeUnlocked() && getCryptoPerClick() <= 0) && getMoney() < (10 - getSlotsStats().upgrades.cashback + getSlotsStats().dripBonus + getSlotsStats().themeBonus)) {
            alert("You're out of money I see...");
            playSound(baseSfx.lose);
            gameLoseScreen.classList.remove('hidden');
            return;
        }
        if (!isAchievementUnlocked(22) && isAchievementUnlocked(6) && isAchievementUnlocked(7) && isAchievementUnlocked(8) && isAchievementUnlocked(9) && isAchievementUnlocked(11) && isAchievementUnlocked(14)) {
            alert("You've gotten gotten all upgrades, drips, and themes I see...");
            playSound(baseSfx.win);
            gameWinScreen.classList.remove('hidden');
            unlockAchievement(22);
        }
    }, 50);
}
generateThemeOptions();
updateSlotUI();

const terminalInput = document.querySelector('.input-field.ht');
const lastLoginLabel = document.querySelector('.last-login');

async function getIP() {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    const json = await res.json();
    return json.ip;
}
async function setLastLoginWithIP() {
    const time = new Date().toLocaleString();
    try {
        const ip = await getIP();
        lastLoginLabel.textContent = `Last Login: ${time} from ${ip}`;
    } catch {
        lastLoginLabel.textContent = `Last Login: ${time} from unknown`;
    }
}

const commandHistory = [''];
let commandIndex = 0;
terminalInput.addEventListener('keydown', async (e) => {
    if (e.key == 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        if (command == '') {terminalInput.blur(); return;}
        terminalInput.value = '';
        let success = false;
        unlockAchievement(21);
        commandHistory.pop();
        commandHistory.push(command);
        commandHistory.push('');
        commandIndex = commandHistory.length - 1;

        commandNames.forEach((name, index) => {
            if (command == name || command == commandAbbreviations[index]) {
                allCommands[index]();
                success = true;
                gameOverCheck();
            }
        });
        if (!success) {
            delayAlert('Unknown command. Type "help" for a list of commands.');
            playSound(baseSfx.denied);
        }

        if (command != 'cth' && command != 'clearterminalhistory') {
            const ip = await getIP();
            const newTerminalEntry = document.createElement('p');
            newTerminalEntry.innerHTML = `> <span class="code">${command}</span><br>Status - ${success ? 'Success' : 'Failed'}${success ? `<br>Command Executed: ${fullCommandNames[commandNames.indexOf(command)] || fullCommandNames[commandAbbreviations.indexOf(command)]}` : ''}<br>Time Stamp - ${new Date().toLocaleTimeString()}<br>Connection - ${ip || 'unknown'}`;
            terminalHistory.appendChild(newTerminalEntry);
            setLastLoginWithIP();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        commandIndex--;
        if (commandIndex < 0) commandIndex = 0;
        terminalInput.value = commandHistory[commandIndex] || '';
        terminalInput.focus();
        terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        commandIndex++;
        if (commandIndex >= commandHistory.length) commandIndex = commandHistory.length - 1;
        terminalInput.value = commandHistory[commandIndex] || '';
        terminalInput.focus();
        terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
    }
});
