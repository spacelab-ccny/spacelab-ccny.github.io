/*
 * Starfield background, drawn on a canvas fixed behind the page (styled by .starfield in site.css).
 * Load with <script src="/stars.js" defer></script>.
 *
 * Credit to https://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas
 */
(function () {
    var SKY_PER_STAR = 500; // square CSS pixels of sky per star (the old full-page canvas averaged about this on the homepage)
    var COLOR = 'hsla(193deg, 43%, 67%, 50%)'; // Nord frost (#88c0d0) at half opacity

    var canvas = document.createElement('canvas');
    canvas.className = 'starfield';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    var context = canvas.getContext('2d');

    // Stars are placed once and kept, so resizing the window reveals or hides them instead of reshuffling.
    var stars = [];
    var skyW = 0;
    var skyH = 0;

    function scatter(x0, y0, x1, y1) {
        var n = Math.round((x1 - x0) * (y1 - y0) / SKY_PER_STAR);
        for (var i = 0; i < n; i++) {
            stars.push({
                x: x0 + Math.random() * (x1 - x0),
                y: y0 + Math.random() * (y1 - y0),
                r: Math.random() * 1.2
            });
        }
    }

    function draw() {
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
        var dpr = window.devicePixelRatio || 1;

        // Grow the sky to cover the new size: a strip on the right, then one along the bottom.
        if (w > skyW) scatter(skyW, 0, w, Math.max(h, skyH));
        if (h > skyH) scatter(0, skyH, skyW, h);
        skyW = Math.max(skyW, w);
        skyH = Math.max(skyH, h);

        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.fillStyle = COLOR;
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            if (s.x > w || s.y > h) continue;
            context.beginPath();
            context.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            context.fill();
        }
    }

    var queued = false;
    window.addEventListener('resize', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
            queued = false;
            draw();
        });
    });

    draw();
})();
