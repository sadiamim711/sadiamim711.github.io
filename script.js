// Type out the role once
const roleText = "Aspiring AI Engineer";
const typed = document.getElementById("typed");
let c = 0;

function type() {
    typed.textContent = roleText.slice(0, c);
    if (c < roleText.length) { c++; setTimeout(type, 80); }
}
type();

// Code-rain background
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");
const chars = "01<>/{}();=+$#";
let drops = [];

function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array(Math.floor(canvas.width / 18)).fill(0).map(() => Math.random() * -50);
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

function rain() {
    ctx.fillStyle = "rgba(13, 17, 23, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#7cfc98";
    ctx.font = "15px monospace";
    drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
        drops[i] = y * 18 > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(rain, 70);
}

// Reveal sections + count-up numbers
function countUp(el) {
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target / 50));
    const timer = setInterval(() => {
        n = Math.min(target, n + step);
        el.textContent = n;
        if (n === target) clearInterval(timer);
    }, 25);
}

const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        e.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(e.target);
    });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Glow that follows the mouse on cards
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const b = card.getBoundingClientRect();
        card.style.setProperty("--x", e.clientX - b.left + "px");
        card.style.setProperty("--y", e.clientY - b.top + "px");
    });
});

// Highlight current nav link
const links = document.querySelectorAll(".links a");
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => { if (scrollY >= s.offsetTop - 140) current = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});