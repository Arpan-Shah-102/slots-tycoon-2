const slotSfx = {

}

const slotDisplays = document.querySelectorAll('.reel > p');
const slotTerminal = document.querySelector('.result-message');
const gWinLabel = document.querySelector('.g-win');
const spinLever = document.querySelector('.spin-lever');
const moneyLabel = document.querySelector('.money-label');

spinLever.addEventListener('click', spinSlots);
moneyLabel.textContent = formatMoney(getMoney());
gWinLabel.textContent = getPityJackpot();

function spinSlots() {
    calcMoney(-10 + getSlotsStats().upgrades.cashback);
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
        if (getMoney() < (10 - getSlotsStats().upgrades.cashback)) {gameOverCheck();}
    }, 1150);
}

function gameOverCheck() {
    setTimeout(() => {

    }, 50);
}
