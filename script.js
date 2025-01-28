var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cw = c.width = window.innerWidth,
    cx = cw / 2;
var ch = c.height = window.innerHeight,
    cy = ch / 2;

var rad = Math.PI / 180;
var stopped = true;
var howMany = 100;
var Circles = [];
ctx.strokeStyle = "red";
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.globalAlpha = .75;

function Circle() {

    this.R = randomIntFromInterval(50, 200);
    this.X = randomIntFromInterval(this.R, cw - this.R);
    this.Y = randomIntFromInterval(this.R, ch - this.R);
    this.iX = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1); //positive or negative
    this.iY = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1); //positive or negative

    this.r = randomIntFromInterval(5, 50);
    this.r1 = randomIntFromInterval(this.R / 2, this.R);

    this.a = ~~(Math.random() * 360) + 1;
    this.x = this.X + this.r1 * Math.cos(this.a * rad);
    this.y = this.Y + this.r1 * Math.sin(this.a * rad);
    this.l = randomIntFromInterval(50, 80);
}

for (var i = 0; i < howMany; i++) {
    var circle = new Circle();
    Circles.push(circle);
}

function Draw() {
    ctx.fillRect(0, 0, cw, ch);

    for (var i = 0; i < Circles.length; i++) {
        var p = Circles[i];
        if (p.X < p.R || p.X > cw - p.R || p.Y < p.R || p.Y > ch - p.R) {
            p.iX *= -1;
            p.iY *= -1;
        }

        p.X += p.iX;
        p.Y += p.iY;
        p.a += 1;
        p.x = p.X + p.r1 * Math.cos(p.a * rad);
        p.y = p.Y + p.r1 * Math.sin(p.a * rad);
        p.gx = p.x + p.r * Math.cos(p.a * rad);
        p.gy = p.y + p.r * Math.sin(p.a * rad);

        /*ctx.beginPath();
        ctx.arc(p.X,p.Y,p.R, 0,2*Math.PI);
        ctx.stroke();*/
        ctx.save();

        ctx.fillStyle = Grd(p.gx, p.gy, p.r, p.l);

        heart(p.x, p.y, p.r, p.a);
        ctx.restore();
    }
    requestId = window.requestAnimationFrame(Draw);
}

function randomIntFromInterval(mn, mx) {
    return ~~(Math.random() * (mx - mn + 1) + mn);
}

function Grd(x, y, r, l) {
    grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, 'hsla(0, 99%,' + l + '%,.9)');
    grd.addColorStop(1, 'hsla(0, 99%,' + l + '%, 0.1)');
    return grd;
}

function heart(x, y, r, a) {

    ctx.beginPath();
    var x1 = x + r * Math.cos(a * rad);
    var y1 = y + r * Math.sin(a * rad);
    var cx1 = x + r * Math.cos((a + 22.5) * rad);
    var cy1 = y + r * Math.sin((a + 22.5) * rad);

    var cx2 = x + r * Math.cos((a - 22.5) * rad);
    var cy2 = y + r * Math.sin((a - 22.5) * rad);
    var chord = 2 * r * Math.sin(22.5 * rad / 2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
    ctx.lineTo(x, y);
    ctx.moveTo(x1, y1);
    ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
    ctx.lineTo(x, y);
    ctx.fill();
}

function start() {
    requestId = window.requestAnimationFrame(Draw);
    stopped = false;
}

function stopAnim() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    stopped = true;
}

window.addEventListener("load", start(), false);
c.addEventListener("click", function () {
    stopped == true ? start() : stopAnim();
}, false);

const btn = document.getElementById('btn');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const msgYes = document.getElementById('msgYes');
const messages = document.querySelectorAll('.message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

let currentMessage = 0;

btn.addEventListener('click', () => {
    messageTitle.classList.add('hide');
    messageText.classList.add('hide');
    btn.classList.add('hide');
    showNextMessage();
});

function showNextMessage() {
    if (currentMessage < messages.length) {
        const currentElement = messages[currentMessage];
        currentElement.style.display = 'block';
        currentElement.classList.add('show');
        currentMessage++;

        setTimeout(() => {
            if (currentMessage > 0) {
                const prevElement = messages[currentMessage - 1];
                prevElement.classList.remove('show');
                prevElement.style.display = 'none';
            }
            showNextMessage();
        }, 2500);
    } else {
        msgYes.style.display = 'block';
        msgYes.classList.add('show');
        btnYes.style.display = 'inline-block';
        btnNo.style.display = 'inline-block';
    }
}

btnYes.addEventListener('click', () => {
    window.location.href = './firework/index.html';
});

btnNo.addEventListener('click', () => {
    moveButtonRandomly(btnNo);
});

function moveButtonRandomly(button) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.random() * (screenWidth - button.offsetWidth);
    const randomY = Math.random() * (screenHeight - button.offsetHeight);

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

setInterval(() => {
    btn.classList.add('shake');

    setTimeout(() => {
        btn.classList.remove('shake');
    }, 500);
}, 2000); 

