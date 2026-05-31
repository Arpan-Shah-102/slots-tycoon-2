function showAchievementPopup(a) {
    const popup = document.createElement('div');
    popup.classList.add('achievement-popup');
    popup.innerHTML = `
        <h1>${a.icon}</h1>
        <div>
            <h3>${a.name}</h3>
            <p>${a.description}</p>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 8000);
}

function unlockAchievement(id) {
    if (isAchievementUnlocked(id)) {return;}
    const achievement = achievementData[id];
    unlockAchievementLocalStorage(id);
    showAchievementPopup(achievement);
    if (getSlotsAchievementsUnlocked() == 30) {unlockAchievement(43);}

    if (achievement.type == 'slots') {incrementSlotsAchievementsUnlocked();}
    else if (achievement.type == 'crypto') {incrementCryptoAchievementsUnlocked();}
    else if (achievement.type == 'world') {incrementWorldAchievementsUnlocked();}
    else if (achievement.type == 'extras') {incrementExtrasAchievementsUnlocked();}
    playSound(baseSfx.achievement);
    updateAchievementPanel();
}

const achievmentBoxes = document.querySelectorAll('.achivement-box');

const totalSlotsAchievements = document.querySelector('.total-achievements.slots');
const totalCryptoAchievements = document.querySelector('.total-achievements.crypto');
const totalWorldAchievements = document.querySelector('.total-achievements.world');
const totalExtrasAchievements = document.querySelector('.total-achievements.extras');

function updateAchievementPanel() {
    getAchievementsUnlocked().forEach(id => {
        achievmentBoxes[id].classList.add('unlocked');
    });
    totalSlotsAchievements.textContent = `${getSlotsAchievementsUnlocked()}/30`;
    totalCryptoAchievements.textContent = `${getCryptoAchievementsUnlocked()}/??`;
    totalWorldAchievements.textContent = `${getWorldAchievementsUnlocked()}/??`;
    totalExtrasAchievements.textContent = `${getExtrasAchievementsUnlocked()}/TBD`;
}
updateAchievementPanel();


const achievementData = {
    // id [int]: {
    //     name: [string],
    //     description: [string, sentence],
    //     icon: [emoji],
    //     type: ["slots" or "crypto" or "world" or "extras"],
    // }
    0: {
        name: 'It all starts here',
        description: 'Spin the Slot Machine for the first time.',
        icon: '🎰',
        type: 'slots',
    },
    1: {
        name: 'Getting the hang of it',
        description: 'Spin the Slot Machine 10 times.',
        icon: '🔄',
        type: 'slots',
    },
    2: {
        name: 'So close yet so far',
        description: 'Get a near miss on the Slot Machine.',
        icon: '😮',
        type: 'slots',
    },
    3: {
        name: 'First Blood',
        description: 'Get your first jackpot!',
        icon: '💰',
        type: 'slots',
    },
    4: {
        name: "Roided Up",
        description: "Get your first upgrade.",
        icon: '💪',
        type: 'slots',
    },
    5: {
        name: "Auto Pilot",
        description: "Obtain the auto-spin upgrade.",
        icon: '✈️',
        type: 'slots',
    },
    6: {
        name: "Definitely Legal",
        description: "Fully rig the slot machine to level 5.",
        icon: '⚖️',
        type: 'slots',
    },
    7: {
        name: "Diamonds in the Machine",
        description: "Fully improve the slot machine payout to level 5.",
        icon: '💎',
        type: 'slots',
    },
    8: {
        name: "Lvl 100 Mastercard",
        description: "Fully improve the slot machine cashback to level 5.",
        icon: '🛍️',
        type: 'slots',
    },
    9: {
        name: "Pity Privilege",
        description: "Fully improve the slot machine pity to level 5.",
        icon: '🥺',
        type: 'slots',
    },
    10: {
        name: "This is catchy",
        description: "Get a piece of drip.",
        icon: '👕',
        type: 'slots',
    },
    11: {
        name: "Drip Lord",
        description: "Get all the drip.",
        icon: '🕶️',
        type: 'slots',
    },
    12: {
        name: "Spectacular",
        description: "Obtain a theme.",
        icon: '🎭',
        type: 'slots',
    },
    13: {
        name: "Massive Bonuses",
        description: "Get a theme that gives back over $5 per spin.",
        icon: '🎁',
        type: 'slots',
    },
    14: {
        name: "The Full Experience",
        description: "Obtain all themes.",
        icon: '🖼️',
        type: 'slots',
    },
    15: {
        name: "Gifted",
        description: "Win a prize from the lootbox.",
        icon: '🎁',
        type: 'slots',
    },
    16: {
        name: "Hacked",
        description: "Obtain the hacking terminal from the lootbox.",
        icon: '💻',
        type: 'slots',
    },
    17: {
        name: "Gacha Enthusiast",
        description: "Obtain all 11 prizes from the lootbox.",
        icon: '📦',
        type: 'slots',
    },
    18: {
        name: "Participation Award",
        description: "Get the $10K trophy.",
        icon: '🎖️',
        type: 'slots',
    },
    19: {
        name: "Financially Gifted",
        description: "Get the $100K trophy.",
        icon: '🏅',
        type: 'slots',
    },
    20: {
        name: "Economy Expert",
        description: "Get the $1M trophy.",
        icon: '🏆',
        type: 'slots',
    },
    21: {
        name: "Hackerman",
        description: "Use the hacking terminal for the first time.",
        icon: '🕵️',
        type: 'slots',
    },
    22: {
        name: "Slots Lord",
        description: "'Beat' the slot machine by fully upgrading it, getting all the drip, and getting all the themes.",
        icon: '👑',
        type: 'slots',
    },
    23: {
        name: "Enthusiast",
        description: "Spin the Slot Machine 100 times.",
        icon: '🔁',
        type: 'slots',
    },
    24: {
        name: "Professional",
        description: "Spin the Slot Machine 1,000 times.",
        icon: '⚡',
        type: 'slots',
    },
    25: {
        name: "Slots Forever",
        description: "Spin the slot machine 10,000 times.",
        icon: '♾️',
        type: 'slots',
    },
    26: {
        name: "Jackpot Master",
        description: "Get 10 jackpots.",
        icon: '💵',
        type: 'slots',
    },
    27: {
        name: "Gambler",
        description: "Get 100 jackpots.",
        icon: '🎲',
        type: 'slots',
    },
    28: {
        name: "The Drip that Pays Off",
        description: "Get the drip bonus to $5 or above.",
        icon: '👕',
        type: 'slots',
    },
    29: {
        name: "Infinite Money",
        description: "Get total money back from drip, themes, or upgrades to $10.",
        icon: '♾️',
        type: 'slots',
    },
    30: {
        name: "Clickerfest",
        description: "Click this achievement.",
        icon: '🖱️',
        type: 'extras',
    },
    31: {
        name: "Scammed",
        description: "Exchange over $13.50 for ₡1,000.",
        icon: '💸',
        type: 'extras',
    },
    32: {
        name: "Bargin Hunter",
        description: "Exchange less than $11.5 for ₡1,000.",
        icon: '🤑',
        type: 'extras',
    },
    33: {
        name: "Code Monkey",
        description: "Find the secret code and enter it in the hacking terminal.",
        icon: '🙈',
        type: 'extras',
    },
    34: {
        name: "Dire Situation",
        description: "Have less than $250.",
        icon: '😰',
        type: 'extras',
    },
    35: {
        name: "An Ungodly Experience",
        description: "Get the godly theme.",
        icon: '😵',
        type: 'extras',
    },
    36: {
        name: "The Stars Align",
        description: "Get a jackpot with 7️⃣7️⃣7️⃣.",
        icon: '✨',
        type: 'extras',
    },
    37: {
        name: "A Bizarre Feeling",
        description: "Something feels bizarre...",
        icon: '👀',
        type: 'extras',
    },
    38: {
        name: "Credited",
        description: "Click the credits!",
        icon: '🎬',
        type: 'extras',
    },
    39: {
        name: "Version History",
        description: "Click the version number.",
        icon: '📜',
        type: 'extras',
    },
    40: {
        name: "2025-2026",
        description: "Good times...",
        icon: '🫠',
        type: 'extras',
    },
    41: {
        name: "3/24/2026",
        description: "That was a good lunch...",
        icon: '🍔',
        type: 'extras',
    },
    42: {
        name: "Just Lazy",
        description: "Use the menu to get to the slot machine.",
        icon: '🛋️',
        type: 'extras',
    },
    43: {
        name: "Just a Dream",
        description: "Get ALL of the slot machine achievements.",
        icon: '🌈',
        type: 'extras',
    },
    // 18: {
    //     name: "Money Laundering",
    //     description: "Exchange money for crypto for the first time.",
    //     icon: '💸',
    //     type: 'crypto',
    // },
}
