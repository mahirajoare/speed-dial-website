const speedDials = [
    { name: 'Github', url: 'https://github.com' },
    { name: 'Revanced', url: 'https://github.com/ReVanced/revanced-patches/releases' },
    { name: 'RVX', url: 'https://github.com/inotia00/revanced-patches/releases' },
    { name: 'ShizuTools', url: 'https://github.com/legendsayantan/ShizuTools' },
    { name: 'YTDLnis', url: 'https://github.com/deniscerri/ytdlnis/releases' },
    { name: 'PDF Candy', url: 'https://pdfcandy.com/' },
    { name: 'HdHub4u', url: 'https://hdhub4u.how/' },
    { name: 'Bollyflix', url: 'https://bollyflix.africa/' },
    { name: 'Liteapks', url: 'https://liteapks.com/' },
    { name: 'RexDl', url: 'https://rexdl.com/' },
    { name: 'ApkModCT', url: 'https://apkmodct.com/' },
    { name: 'Fights Break Sphere · Season 5 - Plex', url: 'https://watch.plex.tv/show/battle-through-the-heavens/season/5' },
    { name: 'Visa Check', url: 'https://epassportbd.info/visa-check-with-passport-number/' },
    { name: 'P. World', url: 'https://wanmei-shijie.fandom.com/wiki/Cultivation' },
    { name: 'An1', url: 'https://an1.com/' }
];

function displaySpeedDials() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = ''; // Clear previous items
    speedDials.forEach(dial => {
        const speedDialElement = document.createElement('div');
        speedDialElement.classList.add('speed-dial');
        speedDialElement.innerHTML = `
            <a href="${dial.url}" target="_blank">
                <img src="https://www.google.com/s2/favicons?domain=${dial.url}" alt="${dial.name}">
                <p>${dial.name}</p>
            </a>
        `;
        grid.appendChild(speedDialElement);
    });
}

function openAddDialForm() {
    document.getElementById('addDialForm').style.display = 'block';
}

function closeAddDialForm() {
    document.getElementById('addDialForm').style.display = 'none';
}

function addSpeedDial() {
    const name = document.getElementById('dialName').value;
    const url = document.getElementById('dialUrl').value;

    if (name && url) {
        speedDials.push({ name, url });
        displaySpeedDials();
        closeAddDialForm();
    }
}

window.onload = displaySpeedDials;