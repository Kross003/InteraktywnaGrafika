
function PrzebiegProstokatny(){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var x = 20, y = 20;
    var width = 30;
    var height = 50;
    var N = 26;
    context.lineWidth = 2;
    context.strokeStyle = "blue";
    context.moveTo(x,y);
    for (var i = 0; i < N; i++){
        if (i%2 == 0) x+= width;
        else {
            y += height;
            height = -height;
        }
        context.lineTo(x,y);
    }
    context.stroke();
}
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function PieChart(){
    var tab = [10, 30, 50, 120];
    var canvas = document.getElementById("PieChart");
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var radius = Math.min(canvasWidth, canvasHeight) / 2;

    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;

    var total = 0;
    tab.forEach(element => {
        total += element;
    });

    var startAngle = 0;
    var endAngle = 0;
    

    for (var i = 0; i < tab.length; i++) {
        var percentage = (tab[i] / total);
        endAngle = startAngle + (percentage * Math.PI * 2);

        var gradient = context.createLinearGradient(centerX, centerY, centerX + Math.cos(startAngle) * radius, centerY + Math.sin(startAngle) * radius);
        gradient.addColorStop(0, getRandomColor());
        gradient.addColorStop(1, getRandomColor());

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.fillStyle = gradient;
        context.fill();

        startAngle = endAngle;
    }
}

function Prostokat(){
    var canvas = document.getElementById("Prostokat");
    var context = canvas.getContext("2d");

    var width = 200;
    var height = 100;
    
    var cornerRadius = (width + height)/7;

    var gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());

    context.beginPath();
    context.moveTo(cornerRadius,0);
    context.arcTo(width, 0, width, cornerRadius, cornerRadius);
    context.arcTo(width, height, width-cornerRadius, height, cornerRadius);
    context.arcTo(0, height, 0, height-cornerRadius, cornerRadius);
    context.arcTo(0, 0, cornerRadius, 0, cornerRadius);


    context.closePath();
    context.fillStyle = gradient;
    context.fill();
}



function KoloZebate(){
    var canvas = document.getElementById("KoloZebate");
    var context = canvas.getContext("2d");

    var cx = 130;          // center x
    var cy = 130;          // center y
    var notches = 12;      // num. of notches
    var radiusO = 110;     // outer radius
    var radiusI = 80;      // inner radius
    var taperO = 50;       // outer taper %
    var taperI = 35;       // inner taper %
    var radiusH = 40;
    // pre-calculate values for loop

    var pi2 = 2 * Math.PI;            // cache 2xPI (360deg)
    var angle = pi2 / (notches * 2);    // angle between notches
    var taperAI = angle * taperI * 0.005; // inner taper offset (100% = half notch)
    var taperAO = angle * taperO * 0.005; // outer taper offset
    var a = angle;                  // iterator (angle)
    var toggle = false;                  // notch radius level (i/o)
    var numHoles = 5;
    context.moveTo(cx + radiusO * Math.cos(taperAO), cy + radiusO * Math.sin(taperAO));

    for (; a <= pi2; a += angle) {

        if (toggle) {
            context.lineTo(cx + radiusI * Math.cos(a - taperAI),
                    cy + radiusI * Math.sin(a - taperAI));
            context.lineTo(cx + radiusO * Math.cos(a + taperAO),
                    cy + radiusO * Math.sin(a + taperAO));
        }

        else {
            context.lineTo(cx + radiusO * Math.cos(a - taperAO),
                    cy + radiusO * Math.sin(a - taperAO));
            context.lineTo(cx + radiusI * Math.cos(a + taperAI),
                    cy + radiusI * Math.sin(a + taperAI));
        }

        toggle = !toggle;
    }

    context.closePath();
    context.moveTo(cx + radiusH, cy);
    context.arc(cx, cy, radiusH, 0, pi2);

    // stroke
    context.lineWidth = 2;
    context.strokeStyle = '#000';
    context.stroke();

    for (var i = 0; i < numHoles; i++) {
        var holeAngle = (Math.PI * 2 / numHoles) * i;
        var holeX = cx + Math.cos(holeAngle) * (radiusH + radiusI)/2;
        var holeY = cy + Math.sin(holeAngle) * (radiusH + radiusI)/2;

        context.moveTo(holeX, holeY);
        context.arc(holeX, holeY, (radiusI - radiusH)/2 - 3, 0,  pi2);
    }
    context.fillStyle = 'red';
    context.fill("evenodd");
}