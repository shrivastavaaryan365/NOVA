// function newNova(){
//     let fNova = document.getElementById('fNova');
//     fNova.textContent = "Innovation"
// }

// let fNova = document.getElementById('fNova');

// fNova.addEventListener('click', newNova);

let btn = document.getElementById('fNova');

btn.addEventListener("click", () => {
    if (btn.textContent === "NOVA") {
        btn.textContent = "Innovation";
    } else {
        btn.textContent = "NOVA";
    }
});
function goToSection() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });
}

// Give the hero's decorative dot field a soft response to pointer movement.
const hero = document.querySelector(".hero");
const dotCanvas = document.querySelector(".hero-dots-canvas");

if (hero && dotCanvas) {
    const context = dotCanvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spacing = 34;
    const pointer = { x: -1000, y: -1000, active: false, movedAt: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;

    function resizeDotCanvas() {
        if (!context) return;
        const bounds = hero.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        width = bounds.width;
        height = bounds.height;
        dotCanvas.width = Math.round(width * pixelRatio);
        dotCanvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        drawDots();
    }

    function drawDots() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        const columns = Math.ceil(width / spacing);
        const rows = Math.ceil(height / spacing);
        const startX = (width - (columns - 1) * spacing) / 2;
        const startY = (height - (rows - 1) * spacing) / 2;
        const elapsed = performance.now() - pointer.movedAt;
        const rippleRadius = (elapsed * 0.22) % 190;
        const rippleFade = pointer.active && !reducedMotion.matches
            ? Math.max(0, 1 - elapsed / 850)
            : 0;

        for (let row = 0; row <= rows; row += 1) {
            for (let column = 0; column <= columns; column += 1) {
                const x = startX + column * spacing;
                const y = startY + row * spacing;
                const distance = Math.hypot(x - pointer.x, y - pointer.y);
                const influence = pointer.active ? Math.max(0, 1 - distance / 145) : 0;
                const ripple = rippleFade * Math.exp(-Math.pow(distance - rippleRadius, 2) / 520);
                const radius = 1.55 + influence * 2.6 + ripple * 1.5;
                const alpha = Math.min(.82, .24 + influence * .56 + ripple * .34);

                context.beginPath();
                context.arc(x, y, radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(235, 239, 248, ${alpha})`;
                context.fill();
            }
        }

        if (pointer.active && !reducedMotion.matches && elapsed < 850) {
            frame = requestAnimationFrame(drawDots);
        } else {
            frame = 0;
        }
    }

    hero.addEventListener("pointermove", (event) => {
        const bounds = hero.getBoundingClientRect();
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
        pointer.active = true;
        pointer.movedAt = performance.now();
        if (!frame) frame = requestAnimationFrame(drawDots);
    });

    hero.addEventListener("pointerleave", () => {
        pointer.active = false;
        pointer.x = -1000;
        pointer.y = -1000;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        drawDots();
    });

    window.addEventListener("resize", resizeDotCanvas);
    resizeDotCanvas();
}
