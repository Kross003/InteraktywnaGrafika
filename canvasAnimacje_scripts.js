function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function Wykres1(){
    var canvas = document.getElementById("wykres1");
    var context = canvas.getContext("2d");
    
    var rect = { x: 0, y: 0, width: 980, height: 480 };
    var cs = {bx: 10, by: 120,sx: 1, sy: -1};
    //Transformacja układu wsp.
    context.translate(cs.bx, cs.by);
    context.scale(cs.sx, cs.sy);
    //Rysowanie osi
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.beginPath();
    
    //OX
    context.moveTo(0, 0);
    context.lineTo(480, 0);
    //OY
    context.moveTo(0, 0);
    context.lineTo(0, 150);
    context.stroke(); 

    
    var y;
    var N = 200;
    context.lineWidth = 1;
    context.strokeStyle = "blue";
    context.beginPath();
    context.scale(2,2);
    context.translate(0,5);
    for(var x = 0; x<=N; x++){
        y = Math.sin(x) + 0.5*x - 5;
        context.lineTo(x, y);
    }
    context.stroke();
}




function AnimacjaPilki(){
    var canvas = document.getElementById("AnimacjaPilki");
    var context = canvas.getContext("2d");

    
    var last_time, stop, linear_speed;

    var kierunekX = 4, kierunekY = 3, radius = 7, pozycjaX = 20, pozycjaY = 20;
    function InitAnimation(){
        stop = false;
        var date = new Date();
        last_time = date.getTime();

        window.requestAnimationFrame(drawAnimation);
    }

    function drawAnimation(){
        context.clearRect(0,0, canvas.width, canvas.height);

        pozycjaX += kierunekX;
        pozycjaY += kierunekY;
        if(pozycjaX + radius > canvas.width-5 || pozycjaX - radius < 5){
            kierunekX = -kierunekX;
        }
        if(pozycjaY + radius > canvas.height-5 || pozycjaY - radius < 5){
            kierunekY = -kierunekY;
        }
        


        context.beginPath();
        context.arc(pozycjaX, pozycjaY, radius, 0, Math.PI*2);
        context.fillStyle = "red";
        context.fill();
        context.closePath();

        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = "black";
        context.moveTo(0,0);
        context.rect(0,0,canvas.width, canvas.height);
        context.stroke();
        context.closePath();
        

        if(!stop) window.requestAnimationFrame(drawAnimation);
    }
    InitAnimation();

}



function PieChartAnimacja(){

    var tab = [10, 30, 50, 120];
    var canvas = document.getElementById("PieChartAnimacja");
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
    var colors = [];
    for(var i = 0; i < tab.length*2; i++){
        colors.push(getRandomColor());
    }
    var procentKola = 1;

    var last_time, stop, linear_speed;
    function InitAnimation(){

        //var animacja = setInterval(drawAnimation, 1000/30);
        setInterval(drawAnimation, 1000/30);
    }

    

    function drawAnimation(){
        context.clearRect(0,0, canvas.width, canvas.height);
        var startAngle = 0;
        var endAngle = 0;
        if(procentKola < 100){procentKola++;}
        for (var i = 0; i < tab.length; i++) {
            var obecnyTotal = 0;
            for(var j = 0; j<=i; j++){
                obecnyTotal += tab[j];
            }
            var  obecnyTotalProcent = (obecnyTotal/total)*100;
            
            if (procentKola >= obecnyTotalProcent) var percentage = (tab[i] / total);
            else if (procentKola < obecnyTotalProcent - tab[i] / total*100) var percentage = 0;
            else {
                var percentage = (tab[i] / total) / (( obecnyTotalProcent - (obecnyTotalProcent - tab[i] / total*100)) / (procentKola - (obecnyTotalProcent - tab[i] / total*100)));
            }
            endAngle = startAngle + (percentage * Math.PI * 2);
            
            var gradient = context.createLinearGradient(centerX, centerY, centerX + Math.cos(startAngle) * radius, centerY + Math.sin(startAngle) * radius);
            gradient.addColorStop(0, colors[i*2]);
            gradient.addColorStop(1, colors[i*2+1]);

            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, startAngle, endAngle);
            context.fillStyle = gradient;
            context.fill();

            if(percentage >= (tab[i] / total)){startAngle = endAngle;}
            //if (procentKola >= 50) clearInterval(animacja);
        }
    }
    InitAnimation();
}





function SlupkowyAnimacja(){

    var fps = 60;
    var dane_wykresu = {
        serie: [[10, 30, 45, 24, 79], [24, 15, 33, 34, 50], [16]],
        etykiety: ["label1", "label2", "label3", "label4", "label5",],
        tytul: "Animowany wykres slupkowy",
        type: "wykres_slupkowy"
        };

    var canvas = document.getElementById("SlupkowyAnimacja");
    var context = canvas.getContext("2d");
    context.translate(10,0);

    var last_time, stop;
    function InitAnimation(){
        stop = false;
        var date = new Date();
        last_time = date.getTime();

        setInterval(drawAnimation, 1000/fps);
        //drawAnimation();
    }
    var maxSlupkow = 0;
    for(var i = 0; i < dane_wykresu.serie.length; i++){
        for(var j = 0; j < dane_wykresu.serie[i].length; j++){
            if(maxSlupkow < dane_wykresu.serie[i][j]) maxSlupkow = dane_wykresu.serie[i][j];
        }
    }
    var slupekKolor = [];
    for(var i = 0; i < dane_wykresu.serie[0].length; i++){
        slupekKolor.push(getRandomColor());
    }

    var obecnySlupek;
    var slupekAnimacja = 0;
    var wysSlupek = canvas.height*0.7 / maxSlupkow;
    
    function drawAnimation(){
        context.save();
        context.clearRect(0,0, canvas.width, canvas.height);
        //context.font = "50px Arial";
        //context.fillText("Hello World",10,80);
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(0,canvas.height*0.9);
        context.lineTo(canvas.width,canvas.height*0.9);
        context.stroke();
        context.font = "26px Arial";
        context.fillText(dane_wykresu.tytul,20,28);
        context.stroke();
        context.closePath();
        context.translate(0,canvas.height*0.9);
        context.moveTo(canvas.height*0.9, 0);

        
        for(var i = 0.25; i<=1; i+=0.25){
            context.translate(0,-maxSlupkow*wysSlupek*0.25);
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(canvas.width,0);
            context.stroke();
            context.font = "8px Arial";
            context.fillText(maxSlupkow*i,1,-3);
            context.closePath();
        }

        
        

        context.translate(0,maxSlupkow*wysSlupek)
        
        for(var i = 0; i < dane_wykresu.serie[0].length; i++){
            for(var j = 0; j < dane_wykresu.serie.length; j++){
                obecnySlupek = dane_wykresu.serie[j][i]
                context.translate(25,0);
                context.beginPath();
                if(slupekAnimacja < obecnySlupek){
                    context.rect(0,0,20,-slupekAnimacja*wysSlupek);
                }
                else context.rect(0,0,20,-obecnySlupek*wysSlupek);
                //context.rect(0,0,20,-20);
                context.fillStyle = slupekKolor[i];
                context.fill();
                context.closePath();
            }
            context.font = "12px Arial";
            context.fillText(dane_wykresu.etykiety[i],-20,15);
            context.translate(15,0);
        }

        
        

        
        
        slupekAnimacja += maxSlupkow/2.5/fps;
        context.restore();

    }

    InitAnimation();
}









