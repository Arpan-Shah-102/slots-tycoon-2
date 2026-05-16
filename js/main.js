document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const hash = link.getAttribute('href').slice(1);
        const target = document.getElementById(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + hash); // update URL without reloading
    });
});

const slotMachineSelect = document.querySelector('.slot-machine-select');
const cryptoSelect = document.querySelector('.crypto-select');
const theWorldSelect = document.querySelector('.the-world-select');

const slotMachineSection = document.querySelector('.slot-machine-game');
const cryptoSection = document.querySelector('.crypto-game');
const theWorldSection = document.querySelector('.the-world-game');

const selectors = [slotMachineSelect, cryptoSelect, theWorldSelect];
const sections = [slotMachineSection, cryptoSection, theWorldSection];
const unlocked = [true, isCryptoGamemodeUnlocked(), isTheWorldUnlocked()];

if (isCryptoGamemodeUnlocked()) {
    slotExchange.classList.remove('hidden');
    // slotExchangeDiv.classList.remove('hidden');
    theWorldSelect.classList.remove('disabled');
}

selectors.forEach((selector, index) => {
    selector.addEventListener('click', () => {
        if (!unlocked[index]) {
            alert(`${selector.parentElement.title} gamemode is locked! Buy it for ${index == 1 ? formatMoney(7777.77) : formatMoney(1234567, 'c')}!`)
            return;
        }
        selectors.forEach(s => s.classList.remove('selected'));
        selector.classList.add('selected');
        sections.forEach(s => s.classList.add('hidden'));
        sections[index].classList.remove('hidden');
    });
});


const resetGameBtn = document.getElementById('resetGameBtn');
resetGameBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
        if (!confirm("Would you like to back out (cancel)? This is your last chance!")) {
            localStorage.clear();
            location.reload();
        }
    }
});



// money secret
let moneyClickCount = 0;
moneyLabel.addEventListener('click', () => {
    moneyClickCount++;
    if (moneyClickCount == 20) {
        calcMoney(10000);
        moneyLabel.textContent = formatMoney(getMoney());
    }
    setTimeout(() => {
        moneyClickCount = 0;
    }, 5000);
});
