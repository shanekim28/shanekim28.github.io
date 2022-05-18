function BackgroundEffect() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    const points = []
    const pointSize = 1;
    numPoints = 200;

    function draw() {
        context.clearRect(0,0,window.outerWidth,window.outerHeight);
        for (let i = 0; i < numPoints; i++) {
            var point1 = points[i];
            point1.update();
            for (let j = 0; j < numPoints; j++) {
                if (i == j) continue;
                var point2 = points[j];
                if (distance(point1, point2) < 125) {
                    // Draw line between them
                    context.beginPath();
                    context.lineWidth = 0.5;
                    context.moveTo(point1.x,point1.y);
                    context.lineTo(point2.x,point2.y);
                    
                    var dist = Math.round(distance(point1, point2));
                    var opacity = 1-(dist/125);
                    
                    context.strokeStyle = 'rgb(88, 245, 151, ' + opacity + ')';
                    context.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    this.init = function () {
        context.canvas.width = window.outerWidth;
        context.canvas.height = window.outerHeight;
        for (let i = 0; i < numPoints; i++) {
            points.push(new Point(parseFloat(rand(0, canvas.clientWidth)), parseFloat(rand(0,  canvas.clientHeight))));
        }

        draw();
    }

    function Point(initialX, initialY) {
        var point = this;

        point.x = initialX;
        point.y = initialY;
        point.velocity = {
            x: rand(-75, 75) / 100,
            y: rand(-75, 75) / 100
        };

        this.update = function () {
            applyVelocity();
            constrainPosition();
            draw();
        }

        function constrainPosition() {
            if (point.x > context.canvas.width) {
                point.x = 0;
            } else if (point.x < 0) {
                point.x = context.canvas.width;
            }

            if (point.y > context.canvas.height) {
                point.y = 0;
            } else if (point.y < 0) {
                point.y = context.canvas.height;
            }
        }

        function applyVelocity() {
            point.x += point.velocity.x;
            point.y += point.velocity.y;
        }

        function draw() {
            context.beginPath();
	      	context.arc(point.x, point.y, pointSize, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgb(88, 245, 151)';
	      	context.fill();
        }
    }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}