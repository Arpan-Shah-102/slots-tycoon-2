document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const hash = link.getAttribute('href').slice(1);
        const target = document.getElementById(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toggleMenu();
    });
});

const slotMachineSelect = document.querySelector('.slot-machine-select');
const cryptoSelect = document.querySelector('.crypto-select');
const theWorldSelect = document.querySelector('.the-world-select');

const slotMachineSection = document.querySelector('.slot-machine-game');
const cryptoSection = document.querySelector('.crypto-game');
const theWorldSection = document.querySelector('.the-world-game');

const slotMachineLinks = document.querySelector('.slot-machine-links');
const cryptoLinks = document.querySelector('.crypto-links');
const theWorldLinks = document.querySelector('.the-world-links');

const selectors = [slotMachineSelect, cryptoSelect, theWorldSelect];
const sections = [slotMachineSection, cryptoSection, theWorldSection];
const links = [slotMachineLinks, cryptoLinks, theWorldLinks];
const unlocked = [true, isCryptoGamemodeUnlocked(), isTheWorldUnlocked()];
const stardustExchanges = document.querySelectorAll('.stardust-exchange');

if (isCryptoGamemodeUnlocked()) {
    slotExchange.classList.remove('hidden');
    moneyExchange.classList.remove('hidden');
    theWorldSelect.classList.remove('disabled');
}
if (isTheWorldUnlocked()) {
    stardustExchanges.forEach(exchange => exchange.classList.remove('hidden'));
}

if (isHackingTerminalUnlocked()) {
    hackingTerminalDiv.classList.remove('hidden');
    hackingTerminalLink.classList.remove('hidden');
    setLastLoginWithIP();
}

if (getGamemodeSelected() != 'slot-machine') {
    sections.forEach(s => s.classList.add('hidden'));
    selectors.forEach(s => s.classList.remove('selected'));
    links.forEach(link => link.classList.add('hidden'));
    
    if (getGamemodeSelected() == 'crypto') {
        moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        cryptoSection.classList.remove('hidden');
        cryptoSelect.classList.add('selected');
        cryptoLinks.classList.remove('hidden');
    }
    else if (getGamemodeSelected() == 'the-world') {
        moneyLabel.textContent = formatMoney(getStardust(), 's');
        theWorldSection.classList.remove('hidden');
        theWorldSelect.classList.add('selected');
        theWorldLinks.classList.remove('hidden');
    }
}

const gameModePrices = [0, 7777.77, 123456789];
selectors.forEach((selector, index) => {
    addBaseSFX(selector);
    selector.addEventListener('click', () => {
        if (!unlocked[index]) {
            if (index == 1 && enoughMoney(gameModePrices[index]) && confirm(`Would you like to unlock the crypto gamemode for $7,777.77?`)) {
                calcMoney(-gameModePrices[index]);
                moneyLabel.textContent = formatMoney(getMoney());
                unlockCryptoGamemode();
                slotExchange.classList.remove('hidden');
                theWorldSelect.classList.remove('disabled');
                unlocked[index] = true;
                moneyExchange.classList.remove('hidden');
                playSound(baseSfx.win);
                return;
            } else if (index == 2 && enoughMoney(gameModePrices[index], 'c') && confirm(`Would you like to unlock The World gamemode for ₡123,456,789?`)) {
                calcCrypto(-gameModePrices[index]);
                moneyLabel.textContent = formatMoney(getCrypto(), 'c');
                unlockTheWorld();
                unlocked[index] = true;
                playSound(baseSfx.win);
                return;
            }
            delayAlert(`${selector.parentElement.title} gamemode is locked! Buy it for ${formatMoney(gameModePrices[index], index == 2 ? 'c' : 'm')}!`)
            return;
        }
        selectors.forEach(s => s.classList.remove('selected'));
        selector.classList.add('selected');

        sections.forEach(s => s.classList.add('hidden'));
        sections[index].classList.remove('hidden');

        links.forEach(link => link.classList.add('hidden'));
        links[index].classList.remove('hidden');

        if (index == 0) {
            moneyLabel.textContent = formatMoney(getMoney());
            setGamemodeSelected('slot-machine');
        }
        else if (index == 1) {
            moneyLabel.textContent = formatMoney(getCrypto(), 'c');
            setGamemodeSelected('crypto');
        }
        else if (index == 2) {
            moneyLabel.textContent = formatMoney(getStardust(), 's');
            setGamemodeSelected('the-world');
        }

        if (slotMachineLinks.classList.contains('hidden')) {
            clearInterval(autoSpinInterval);
            autoSpinInterval = null;
            autoSpinBtn.classList.remove('yellow');
            autoSpinBtn.classList.add('green');
            autoSpinBtn.textContent = 'Activate Auto-Spin';
        }
        generateThemeOptions();
        generateCryptoThemeOptions();
        // generateTheWorldThemeOptions();
        toggleMenu();
    });
});

function resetGameAsk() {
    setTimeout(() => {
        if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
            if (!confirm("Would you like to back out (cancel)? This is your last chance!")) {
                localStorage.clear();
                location.reload();
            }
        }
    }, 50);
}


function saveGame() {
    const data = {
        
    };
    return data;
}
function saveGameToJSON() {
    const data = saveGame();
    const jsonData = JSON.stringify(data);
    // Implementation for saving to JSON
}
function saveGameToTXT() {
    const data = saveGame();
    const jsonData = JSON.stringify(data);
    // Implementation for saving to TXT
}
function loadGame() {

}

document.querySelectorAll('.settings > div > button').forEach(button => {
    addBaseSFX(button);
});
document.querySelectorAll('.credits a').forEach(link => {
    addBaseSFX(link);
});

// money secret
let moneyClickCount = 0;
moneyLabel.addEventListener('click', () => {
    moneyClickCount++;
    if (moneyClickCount > 0 && moneyClickCount % 20 == 0) {
        calcMoney(10000);
        calcCrypto(200000000);
        calcStardust(500);
        playSound(baseSfx.win);

        if (slotMachineSelect.classList.contains('selected')) {
            moneyLabel.textContent = formatMoney(getMoney());
        } else if (cryptoSelect.classList.contains('selected')) {
            moneyLabel.textContent = formatMoney(getCrypto(), 'c');
        } else if (theWorldSelect.classList.contains('selected')) {
            moneyLabel.textContent = formatMoney(getStardust(), 's');
        }
    }
});
