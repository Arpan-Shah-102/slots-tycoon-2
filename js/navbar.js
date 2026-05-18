const menuBackground = document.querySelector('.menu-background');
const achievementBackground = document.querySelector('.achievements-background');

addBaseSFX(document.querySelector('.achivement-toggle > svg'));
addBaseSFX(document.querySelector('.menu-toggle > svg'));
addBaseSFX(document.querySelector('.close-achievements'));
document.querySelectorAll('.menu li > a').forEach(link => addBaseSFX(link));

function toggleAchievements() {
    achievementBackground.classList.toggle('shown');
    if (achievementBackground.classList.contains('shown')) {
        menuBackground.classList.remove('shown');
    }
}
function toggleMenu() {
    menuBackground.classList.toggle('shown');
    if (menuBackground.classList.contains('shown')) {
        achievementBackground.classList.remove('shown');
    }
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