const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Bird properties
let birdX = 50;
let birdY = canvas.height / 2;
let birdRadius = 20;
let gravity = 1.5;
let velocity = 0;
let jump = -25;

// Pipe properties
let pipes = [];
let pipeWidth = 50;
let pipeGap = 200;
let pipeFrequency = 150;
let pipeSpeed = 5;

// Score
let score = 0;

// Event listener for jump
document.addEventListener('keydown', () => {
    velocity = jump;
});

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();

    // Draw pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);

        // Detect collision
        if (
            birdX + birdRadius > pipe.x && birdX - birdRadius < pipe.x + pipeWidth &&
            (birdY - birdRadius < pipe.top || birdY + birdRadius > pipe.top + pipeGap)
        ) {
            alert(`Game Over! Your Score: ${score}`);
            location.reload();
        }

        // Increase score
        if (birdX === pipe.x + pipeWidth) {
            score++;
        }
    });

    // Draw score
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Update bird position
    birdY += velocity;
    velocity += gravity;

    // Generate pipes
    if (frame % pipeFrequency === 0) {
        let pipeTopHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({ x: canvas.width, top: pipeTopHeight });
    }

    // Move pipes
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });

    // Remove pipes that are out of canvas
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

    // Request animation frame
    requestAnimationFrame(draw);
}

// Start the game
draw();
