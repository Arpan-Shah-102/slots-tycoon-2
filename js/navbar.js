const menuBackground = document.querySelector('.menu-background');
const achievementBackground = document.querySelector('.achievements-background');

function toggleAchievements() {
    achievementBackground.classList.toggle('shown');
}
function toggleMenu() {
    menuBackground.classList.toggle('shown');
}

menuBackground.addEventListener('click', (e) => {
    if (e.target === menuBackground) {
        toggleMenu();
    }
});
achievementBackground.addEventListener('click', (e) => {
    if (e.target === achievementBackground) {
        toggleAchievements();
    }
});