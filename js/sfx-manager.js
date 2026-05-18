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
    if (!getAdvancedMute()[sfxName]) return;
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
    input.checked = getAdvancedMute()[input.dataset.sound];
    addBaseSFX(input.parentElement);
    input.addEventListener('change', () => {
        const sound = input.dataset.sound;
        setAdvancedMute(sound, input.checked);
    });
});
