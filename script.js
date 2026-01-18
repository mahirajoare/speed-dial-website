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

    /* 🔥 Primary favicon: Clearbit */
    function getClearbitFavicon(url) {
        const domain = new URL(url).hostname;
        return `https://logo.clearbit.com/${domain}?size=128`;
    }

    /* 🛡️ Fallback favicon: Google */
    function getGoogleFavicon(url) {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
    }

    function createSpeedDialCard(speedDial, index) {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = speedDial.url;
        card.target = '_blank';

        const img = document.createElement('img');
        img.src = getClearbitFavicon(speedDial.url);
        img.alt = speedDial.name;

        /* 🔁 Fallback chain */
        img.onerror = () => {
            img.onerror = null; // prevent infinite loop
            img.src = getGoogleFavicon(speedDial.url);
        };

        const span = document.createElement('span');
        span.textContent = speedDial.name;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = '×';
        removeButton.onclick = (e) => {
            e.preventDefault();
            speedDials.splice(index, 1);
            localStorage.setItem('speedDials', JSON.stringify(speedDials));
            renderSpeedDials();
        };

        /* ✏️ Long press / Right click edit */
        let pressTimer;

        const startPress = (e) => {
            e.preventDefault();
            pressTimer = setTimeout(() => {
                editSpeedDial(index);
            }, 600);
        };

        const cancelPress = () => clearTimeout(pressTimer);

        card.addEventListener('touchstart', startPress);
        card.addEventListener('touchend', cancelPress);
        card.addEventListener('mousedown', startPress);
        card.addEventListener('mouseup', cancelPress);
        card.addEventListener('mouseleave', cancelPress);

        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            editSpeedDial(index);
        });

        card.appendChild(img);
        card.appendChild(span);
        card.appendChild(removeButton);
        return card;
    }

    function editSpeedDial(index) {
        const current = speedDials[index];

        const newName = prompt('Edit name:', current.name);
        if (!newName) return;

        const newUrl = prompt('Edit URL:', current.url);
        if (!newUrl) return;

        speedDials[index] = {
            name: newName.trim(),
            url: newUrl.trim()
        };

        localStorage.setItem('speedDials', JSON.stringify(speedDials));
        renderSpeedDials();
    }

    function renderSpeedDials() {
        speedDialGrid.innerHTML = '';
        speedDials.forEach((speedDial, index) => {
            speedDialGrid.appendChild(createSpeedDialCard(speedDial, index));
        });
    }

    addButton.addEventListener('click', () => {
        const name = prompt('Enter the name:');
        const url = prompt('Enter the URL:');
        if (name && url) {
            speedDials.push({ name, url });
            localStorage.setItem('speedDials', JSON.stringify(speedDials));
            renderSpeedDials();
        }
    });

    renderSpeedDials();
});
