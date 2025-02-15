document.addEventListener('DOMContentLoaded', () => {
    const speedDialGrid = document.getElementById('speedDialGrid');
    const addButton = document.getElementById('addButton');
    let speedDials = JSON.parse(localStorage.getItem('speedDials')) || [];

    const initialSpeedDials = [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'ReVanced', url: 'https://github.com/ReVanced/revanced-patches/releases' },
        { name: 'LiteAPKs', url: 'https://liteapks.com/' },
        { name: 'PDF Candy', url: 'https://pdfcandy.com/' },
        { name: 'Visa Check', url: 'https://epassportbd.info/visa-check-with-passport-number/' },
        { name: 'Bollyflix', url: 'https://bollyflix.africa/' },
    ];

    if (speedDials.length === 0) {
        speedDials = initialSpeedDials;
        localStorage.setItem('speedDials', JSON.stringify(speedDials));
    }

    function getFavicon(url) {
        return `https://logo.clearbit.com/${new URL(url).hostname}?size=80`;
    }

    function createSpeedDialCard(speedDial) {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = speedDial.url;
        card.target = '_blank';

        const img = document.createElement('img');
        img.src = getFavicon(speedDial.url);
        img.alt = speedDial.name;

        const span = document.createElement('span');
        span.textContent = speedDial.name;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = '×';
        removeButton.onclick = (e) => {
            e.preventDefault();
            speedDials = speedDials.filter(sd => sd.url !== speedDial.url);
            localStorage.setItem('speedDials', JSON.stringify(speedDials));
            card.remove();
        };

        card.appendChild(img);
        card.appendChild(span);
        card.appendChild(removeButton);
        return card;
    }

    function renderSpeedDials() {
        speedDialGrid.innerHTML = '';
        speedDials.forEach(speedDial => {
            speedDialGrid.appendChild(createSpeedDialCard(speedDial));
        });
    }

    addButton.addEventListener('click', () => {
        const name = prompt('Enter the name:');
        const url = prompt('Enter the URL:');
        if (name && url) {
            const newSpeedDial = { name, url };
            speedDials.push(newSpeedDial);
            localStorage.setItem('speedDials', JSON.stringify(speedDials));
            renderSpeedDials();
        }
    });

    renderSpeedDials();
});