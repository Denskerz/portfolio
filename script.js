const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
let speed = 2;

// Инициализация звезд
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    stars = [];
    for (let i = 0; i < 1000; i++) {
        stars.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width
        });
    }
}

// Главный цикл отрисовки
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    stars.forEach(s => {
        s.z -= speed;
        if (s.z <= 0) s.z = width;

        const x = s.x / (s.z / width);
        const y = s.y / (s.z / width);
        const size = (1 - s.z / width) * 3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${1 - s.z / width})`;
        ctx.fill();
    });

    ctx.restore();
    requestAnimationFrame(animate);
}

// Функции управления
function setSpeed(newSpeed) {
    speed = newSpeed;
    document.getElementById('speed-display').innerText = newSpeed;
}

function emergencyJump() {
    speed = 100;
    setTimeout(() => speed = 2, 1000);
}

window.addEventListener('resize', init);
init();
animate();
