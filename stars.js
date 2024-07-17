/* Credit to https://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas */
window.addEventListener("load", function () {
    var canvas = document.getElementById("starfield"),
        context = canvas.getContext("2d"),
        stars = 2500;
    if (document.documentElement.offsetHeight < window.innerHeight)
        canvas.height = window.innerHeight;
    else
        canvas.height = document.documentElement.offsetHeight;
    canvas.width = document.documentElement.offsetWidth;

    for (var i = 0; i < stars; i++) {
        x = Math.random() * canvas.offsetWidth;
        y = Math.random() * canvas.offsetHeight;
        radius = Math.random() * 1.2;
        context.beginPath();
        context.arc(x, y, radius, 0, 360);
        context.fillStyle = "hsla(232deg, 97%, 85%, 50%)";
        context.fill();
    }
}, false);