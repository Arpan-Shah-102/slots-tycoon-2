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

if (isCryptoGamemodeUnlocked()) {
    slotExchange.classList.remove('hidden');
    // slotExchangeDiv.classList.remove('hidden');
}