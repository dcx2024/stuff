// Countdown Timer
const birthdayDate = new Date("April 10, 2025 00:00:00").getTime();
const countdown = setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = birthdayDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "🎉 It's Ninu's Birthday! 🎂";
        startConfetti(); // Start animation on birthday
    }
}, 1000);

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.style.display = "block";

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const particles = [];
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 10 + 5,
            d: Math.random() * 40 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 5,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        update();
    }

    function update() {
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.y += Math.cos(p.d) + 1 + p.r / 2;
            p.x += Math.sin(p.d) * 2;
            if (p.y > H) {
                p.y = -10;
                p.x = Math.random() * W;
            }
        }
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
}
