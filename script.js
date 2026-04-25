document.addEventListener("click", () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
});

let frameCounter = 0;
let nextChange = getRandomFrames();
let percent = 0;

function getRandomFrames() {
    return Math.floor(Math.random() * 867) + 30; // between 30–150 frames
}

let start = 0xE052;
let end = 0xE0CB;
let current = start;

function nextChar() {
    const char = String.fromCharCode(current);

    current++;

    if (current > end) {
        current = start; // wrap back
    }

    return char;
}

function update() {
    frameCounter++;

    if (frameCounter >= nextChange) {
        percent++; // or whatever change you want

        frameCounter = 0;
        nextChange = getRandomFrames(); // new random delay
    }

    const percentSpans = document.querySelectorAll("span.update-text-line-percent");
    percentSpans.forEach(span => {
        span.textContent = percent + "%";
    })

    if (frameCounter % 5 == 0) {
        const windowsUpdateIconSpans = document.querySelectorAll("span.windows-update-icon");
        windowsUpdateIconSpans.forEach(span => {
            span.textContent = nextChar();
        })
    }

    requestAnimationFrame(update);
}

update();
