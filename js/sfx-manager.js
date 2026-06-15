const sfxPathSlots = './assets/sounds/slots/';
const sfxPathCrypto = './assets/sounds/crypto/';
const sfxPathTheWorld = './assets/sounds/the-world/';
const baseSfxPath = './assets/sounds/';

const baseSfx = {
    click1: new Audio(`${baseSfxPath}click-1.mp3`),
    click2: new Audio(`${baseSfxPath}click-2.mp3`),
    win: new Audio(`${baseSfxPath}win.mp3`),
    lose: new Audio(`${baseSfxPath}lose.mp3`),
    denied: new Audio(`${baseSfxPath}denied.mp3`),
    notify: new Audio(`${baseSfxPath}notify.mp3`),
    achievement: new Audio(`${baseSfxPath}achievement.mp3`),
    cheat: new Audio(`${baseSfxPath}cheat.mp3`),

    bizarre1: new Audio(`${baseSfxPath}bizarre/bizarre-1.mp3`),
    bizarre2: new Audio(`${baseSfxPath}bizarre/bizarre-2.mp3`),
    bizarre3: new Audio(`${baseSfxPath}bizarre/bizarre-3.mp3`),
    bizarre4: new Audio(`${baseSfxPath}bizarre/bizarre-4.mp3`),
}
const farts = {
    1: new Audio(`${baseSfxPath}farts/fart-1.mp3`),
    2: new Audio(`${baseSfxPath}farts/fart-2.mp3`),
    3: new Audio(`${baseSfxPath}farts/fart-3.mp3`),
    4: new Audio(`${baseSfxPath}farts/fart-4.mp3`),
    5: new Audio(`${baseSfxPath}farts/fart-5.mp3`),
    6: new Audio(`${baseSfxPath}farts/fart-6.mp3`),
}

const defaultSlotSfx = {
    spin: new Audio(sfxPathSlots + 'spin.mp3'),
    jackpot: new Audio(sfxPathSlots + 'jackpot.mp3'),
    nearMiss: new Audio(sfxPathSlots + 'near-miss.mp3'),
    ding: new Audio(sfxPathSlots + 'ding.mp3'),
    upgrade: new Audio(sfxPathSlots + 'upgrade.mp3'),
    getTheme: new Audio(sfxPathSlots + 'get-theme.mp3'),
    getDrip: new Audio(sfxPathSlots + 'get-drip.mp3'),
    exchange: new Audio(sfxPathSlots + 'exchange.mp3'),
    getTrophy: new Audio(sfxPathSlots + 'get-trophy.mp3'),
    winLootbox: new Audio(sfxPathSlots + 'win-lootbox.mp3'),
    lootboxOpening: new Audio(sfxPathSlots + 'lootbox-opening.mp3'),
    buyLootbox: new Audio(sfxPathSlots + 'buy-lootbox.mp3'),
}
const allSpecialSlotSfx = {
    sfxSet1: {
        ...defaultSlotSfx,
        spin: new Audio(sfxPathSlots + 'sfx-1/spin.mp3'),
        jackpot: new Audio(sfxPathSlots + 'sfx-1/jackpot.mp3'),
        nearMiss: new Audio(sfxPathSlots + 'sfx-1/near-miss.mp3'),
        ding: new Audio(sfxPathSlots + 'sfx-1/ding.mp3'),
    },
    sfxSet2: {
        ...defaultSlotSfx,
        spin: new Audio(sfxPathSlots + 'sfx-2/spin.mp3'),
        jackpot: new Audio(sfxPathSlots + 'sfx-2/jackpot.mp3'),
        nearMiss: new Audio(sfxPathSlots + 'sfx-2/near-miss.mp3'),
        ding: new Audio(sfxPathSlots + 'sfx-2/ding.mp3'),
    },
    sfxSet3: {
        ...defaultSlotSfx,
        spin: new Audio(sfxPathSlots + 'sfx-3/spin.mp3'),
        jackpot: new Audio(sfxPathSlots + 'sfx-3/jackpot.mp3'),
        nearMiss: new Audio(sfxPathSlots + 'sfx-3/near-miss.mp3'),
        ding: new Audio(sfxPathSlots + 'sfx-3/ding.mp3'),
    },
    sfxSet4: {
        ...defaultSlotSfx,
        spin: new Audio(sfxPathSlots + 'sfx-4/spin.mp3'),
        jackpot: new Audio(sfxPathSlots + 'sfx-4/jackpot.mp3'),
        nearMiss: new Audio(sfxPathSlots + 'sfx-4/near-miss.mp3'),
        ding: new Audio(sfxPathSlots + 'sfx-4/ding.mp3'),
    }
}
let slotSfx = defaultSlotSfx;

const cryptoSfx = {
    mineCoin: new Audio(sfxPathCrypto + 'mine-coin.mp3'),
}
const theWorldSfx = {

}

function addBaseSFX(unit) {
    unit.addEventListener('mousedown', () => {
        playSound(baseSfx.click1);
    });
    unit.addEventListener('mouseup', () => {
        playSound(baseSfx.click2);
    });
}

function playSound(sfx) {
    if (isMuted()) return;
    const sfxSrcSplit = sfx.src.split('/');
    const sfxName = sfxSrcSplit[sfxSrcSplit.length - 1].split('.')[0];
    if (getAdvancedMute()[sfxName]) return;
    const audio = sfx.cloneNode();
    audio.volume = getMasterVolume() / 100;
    audio.play();
    audio.addEventListener('ended', () => {
        audio.remove();
    });
}

if (isMuted()) {
    document.querySelector('.mute-btn').textContent = 'Unmute';
    document.querySelector('.mute-btn').classList.add('red');
}
function checkMuteToggle(btn) {
    toggleMute();
    btn.innerHTML = isMuted() ? 'Unmute' : '&nbsp;Mute&nbsp;';
    btn.classList.toggle('red');
    if (isMuted()) {
        masterVolInput.value = 0;
    } else {
        masterVolInput.value = getMasterVolume() || 100;
    }
}

let advancedMuteVisible = false;
const advancedMuteSettings = document.querySelector('.advanced-mute-cont');
const masterVolInput = advancedMuteSettings.querySelector('.master-vol-change');
masterVolInput.value = isMuted() ? 0 : getMasterVolume();
const muteBtn = document.querySelector('.mute-btn');

function masterVolumeChange(input) {
    setMasterVolume(input.value);
    if (input.value == 0 && !isMuted()) {
        checkMuteToggle(muteBtn);
    } else if (input.value > 0 && isMuted()) {
        checkMuteToggle(muteBtn);
    }
}
function showAdvancedMute(btn) {
    advancedMuteVisible = !advancedMuteVisible;
    btn.textContent = advancedMuteVisible ? 'Hide Advanced Mute' : 'Show Advanced Mute';
    advancedMuteSettings.classList.toggle('hidden');
}
advancedMuteSettings.querySelectorAll('.flexbox > label > input').forEach(input => {
    input.checked = !getAdvancedMute()[input.dataset.sound];
    addBaseSFX(input.parentElement);
    input.addEventListener('change', () => {
        const sound = input.dataset.sound;
        setAdvancedMute(sound, !input.checked);
    });
});
