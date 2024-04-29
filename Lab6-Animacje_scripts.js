function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function Zegar(){
    var canvas = document.getElementById("Zegar");
    var context = canvas.getContext("2d");

    var clock;
    function InitAnimation(){
        clock = {
            area: { x: 0, y: 0, width: canvas.width,
            height: canvas.height },
            //rozmiar tarczy
            radius: 200,
            //gradient dla tarczy
            startColor: "#F8FCFF"
            , stopColor: "#A1CCEE"
            ,
            //aktualny stan zegara
            hour: 0, minute: 0, second: 0, milisecond: 0,
            //Czcionka do wyświetlania godzin
            fontProperty: { font: "32pt Calibri"
            ,
            fillStyle: "#024F8C"
            ,
            textAlign: "center"
            ,
            textBaseLine: "middle"
            }
        };
        window.setInterval(drawAnimation, 1000);
    }

    function drawAnimation(){
        context.clearRect(0,0, canvas.width, canvas.height);
        var date = new Date();
        // przepisanie danych do zegara z uwzględnieniem wpływu //poszczególnych wskazówek (zmiana minut powoduje
        // przemieszczenie wskazówki godzin + clock.second/60
        clock.second = date.getSeconds();
        clock.minute = date.getMinutes() + clock.second / 60;
        clock.hour = date.getHours() + clock.minute / 60;
        // przeliczenie czasu 24h -> 12h
        if (clock.hour > 12) clock.hour -= 12;


        
        //Tarcza Zegara
        context.save(); //(1)
        // Środek dostępnego obszaru
        context.translate(clock.area.width / 2, clock.area.height / 2);
        context.save(); //(save -> 2)
        // Tarcza zegara
        context.beginPath();
        context.arc(0, 0, clock.radius, 0, Math.PI * 2);
        //Gradient wypełnienia
        var grd = context.createLinearGradient(-clock.radius, -clock.radius, clock.radius, clock.radius);
        grd.addColorStop(0, clock.startColor);
        grd.addColorStop(1, clock.stopColor);
        context.fillStyle = grd;
        context.fill();
        context.closePath();
        context.restore(); //(restore <- 2)
        context.save();
        

        //Wyświetlanie Godzin zegara
        context.save(); // (save -> 2)
        context.font = clock.fontProperty.font;
        context.fillStyle = clock.fontProperty.fillStyle;
        context.textAlign = clock.fontProperty.textAlign;
        context.textBaseline = clock.fontProperty.textBaseLine;
        for (var n = 1; n <= 12; n++){
            var theta = (n - 3) * (Math.PI * 2) / 12;
            //Poruszanie po okręgu zgodnie z równaniem okręgu
            var x = clock.radius * 0.8 * Math.cos(theta);
            var y = clock.radius * 0.8 * Math.sin(theta);
            context.strokeText(n, x, y); context.fillText(n, x, y);
        }
        context.restore();// (restore <- 2) } 


        //Wskazówka minutowa
        context.save(); //(save -> 2)
        context.fillStyle = "#009939";
        var theta = (clock.minute - 15) * 2 * Math.PI / 60;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę
        // obracając układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.7, 1);
        context.lineTo(clock.radius * 0.7, -1);
        context.fill();
        context.restore(); //(restore <- 2)


        //Sekundowa
        context.save(); //(save -> 2)
        context.fillStyle = "#909099";
        var theta = (clock.second - 15) * 2 * Math.PI / 60;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę
        // obracając układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.8, 1);
        context.lineTo(clock.radius * 0.8, -1);
        context.fill();
        context.restore();


        //Wskazówka godzinowa
        context.save(); //(save -> 2)
        context.fillStyle = "#009999";
        var theta = (clock.hour - 3) * 2 * Math.PI / 12;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę obracając
        // układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.6, 1);
        context.lineTo(clock.radius * 0.6, -1);
        context.fill();
        context.restore(); //(restore <- 2)
        //……


        context.restore();context.restore();context.restore();context.restore();


    }
    InitAnimation();
}


function Arkanoid(){
    var canvas = document.getElementById("Arkanoid");
    var context = canvas.getContext("2d");

    brick = {width: 48, height: 18, 
            fillStyles: ["green", "blue", "yellow", "red"],
            strokeStyle: "black"
            };

    bricks = [ 
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [ 0 , 3 , 3 , 0 , 0 , 0 , 0 , 3 , 3 , 0 ],
                [ 0 , 0 , 0 , 3 , 3 , 3 , 3 , 0 , 0 , 0 ] ,
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
                [ 0 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 ] ,
                [ 0 , 0 , 2 , 2 , 2 , 2 , 2 , 2 , 0 , 0 ] ,
                [ 0 , 103 , 102 , 203 , 2 , 203 , 2 , 101 , 103 , 0 ] ,
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
             ];

    var last_time = 0;
    var stop = false;
    var ball = {}; //obiekt piłka
    var area = {}; //obiekt obszar poruszania
    var plate = {};
    var drawGameOver = false;
    var score = 0;
    var level = 8;

    var ball = { x: canvas.width/2, y: canvas.height/2, r: 10, vx: 100, vy: -150 };
    var area = { x: 0, y: 0, width: canvas.width, height: canvas.height };
    plate = { x: area.width / 2.0, y: area.height - 20,
        width: 100, height: 7, vx:0, vy:0, fillStyle: "green"
        ,strokeStyle: "black" };    

        
    function GenerujPoziom(){
        var maxPositive = level * 2 + 1;
        var maxNegative = level * 3 - 4;
        var currPositive = 0;
        var currNegative = 0;
        for (var i = 1; i < 9; i++){
            for (var j = 2; j < 10; j++){
                bricks[j][i] = Math.floor(Math.random()*4)
                if(Math.random()*100 < 100 - 10*level){ bricks[j][i] = 0;}
                if(bricks[j][i]){
                    if(currPositive < maxPositive){
                        if(Math.random()*(100*level/2) < level*(10 +currNegative - currPositive)){
                            bricks[j][i] += 200;
                             currPositive++;
                            continue;
                        }
                    }
                    if(currNegative < maxNegative){
                        if(Math.random()*(100*level/2) < level*(10 +currPositive - currNegative)){
                            bricks[j][i] += 100;
                            currNegative++;
                            continue;
                        } 
                    }
                }
            }
        }
        plate.height = 7;
        plate.width = 100;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.vx = 100;
        ball.vy = -150;

    }

    GenerujPoziom();
    
        function InitAnimation(){
            document.onkeydown = ("keydown", function(evt) {
                switch (evt.keyCode) {
                    case 65: //Strzałka w lewo
                        plate.vx = -300; //Zmiana kierunku (-300 pikseli/s)
                        break;
    
                    case 68: //Strzałka w prawo
                        plate.vx = 300; //Zmiana kierunku
                        break;
    
                }
            });  
            document.onkeyup = ("keyup", function(evt) {
                switch (evt.keyCode) {
                    case 65: //Strzałka w lewo
                        plate.vx = 0; //Zmiana kierunku (-300 pikseli/s)
                        break;
    
                    case 68: //Strzałka w prawo
                        plate.vx = 0; //Zmiana kierunku
                        break;
    
                }
            });  
        var date = new Date();
        last_time = date.getTime() + date.getMilliseconds() / 1000;
        //Ustawienie stanu początkowego płótna
        context.fillStyle ="white";
        context.strokeStyle ="black";
        //Ustalenie stanu początkowego piłki
        
        //vx oraz vx – to oczywiście początkowa prędkość oraz
        //kierunek ruchu piłki
        
         
        
        window.setInterval(drawAnimation, 1000/60);
        //drawAnimation();
    }



    function drawAnimation(){
        context.clearRect(0,0, canvas.width, canvas.height);

        var existingBricks = false;
        for(var i = 0; i<10; i++){
            for(var j = 0; j<10; j++){
                if(bricks[j][i]){existingBricks = true;}
            }
        }
        if(!existingBricks){
        level++;
        GenerujPoziom();
        }

        if (!drawGameOver) {
        var date = new Date();
        var time_interval = date.getTime() - last_time;
        last_time = date.getTime();
        // 3.1. Wyznaczenie nowego stanu rysowanych obiektów
        context.save();
        // 4. Rysowanie obiektów:
        context.save();
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = "black";
        context.moveTo(0,0);
        context.rect(0,0,canvas.width, canvas.height);
        context.stroke();
        context.closePath();
        context.restore();

        for(var i = 0; i<10; i++){
            for(var j = 0; j<10; j++){
                if(bricks[j][i]>0){
                    context.beginPath();
                    if(bricks[j][i] == 100 || bricks[j][i] == 200){ bricks[j][i] = 0;}
                    if(bricks[j][i] > 200){
                        context.fillStyle=brick.fillStyles[bricks[j][i]-200];                
                    }
                    
                    else if(bricks[j][i] > 100){
                        context.fillStyle=brick.fillStyles[bricks[j][i]-100];
                    }
                    else{
                        context.fillStyle=brick.fillStyles[bricks[j][i]];
                    }
                    
                    context.fillRect(i * (brick.width + 2), j * (brick.height + 2), brick.width, brick.height);
                    context.strokeRect(i * (brick.width+2), j*(brick.height+2), brick.width, brick.height);
                    if(bricks[j][i] > 200){
                        context.fillStyle="black";
                        context.font = "10px Arial";
                        context.fillText("<___>",i * (brick.width + 2)+ brick.width/2-10,j * (brick.height + 2)+ brick.height/2+2);
                    }
                    else if(bricks[j][i] > 100){
                        context.fillStyle="black";
                        context.font = "10px Arial";
                        context.fillText(">_<",i * (brick.width + 2)+ brick.width/2-10,j * (brick.height + 2)+ brick.height/2+2);
                    }
                    context.stroke();    
                    context.closePath();
                }
            }
        }
        // 4.1 Zapamiętanie stanu płótna
        // Wyświetlenie animowanych obiektów
        
        // 3. wyznaczenie upływu czasu od ostatniej klatki
        // 3.1. Wyznaczenie nowego stanu rysowanych obiektów
        // Wyznaczenie przesunięcia piłki (dx, dy)
        var dx = ball.vx * time_interval / 1000; //1000 – time_interval - [ms]
        var dy = ball.vy * time_interval / 1000;


        

        if ((ball.x + dx + ball.r >= area.width)|| (ball.x - ball.r + dx <= 0))
        {
        //Zmiana kierunku i odbicie
        ball.vx = -ball.vx;
        //Ponowne wyznaczenie przemieszczenia
        dx = ball.vx * time_interval / 1000;
        }
        ball.x += dx; //Poruszanie

        //Dla osi OY
        if (ball.y + dy + ball.r >= area.height | ball.y - ball.r + dy <= 0)
        {
        //Zmiana kierunku i odbicie
        ball.vy = -ball.vy;
        dy = ball.vy * time_interval / 1000;
        }
        ball.y += dy;

        //Detekcja kolizji z cegiełką
        for (var i = 0; i < 10; i++){ //po szerokości okna
            for (var j = 0; j < 10; j++){ //po wysokości
                if (bricks[j][i] > 0){ //to detekcja kolizji
                    //wyznaczenie położenia każdej cegły
                    var brick_coords = {x: (i*(brick.width+2)), y: (j*(brick.height+2))};

                    context.save();
                    context.beginPath();
                    context.stroke();
                    context.restore();
                    //sprawdzenie warunków kolizji
                    if (brick_coords.x < ball.x+ball.r && ball.x-ball.r < brick_coords.x+brick.width && brick_coords.y < ball.y+ball.r && ball.y-ball.r < brick_coords.y+brick.height){

                        ball.vy = -ball.vy;
                        bricks[j][i] = bricks[j][i] - 1;
                        score += 10;
                        if(bricks[j][i]==0){score+=30;}
                        if(bricks[j][i] == 200){
                            plate.width += 10;
                            bricks[j][i] = 0;
                            score+=20;
                        }
                        else if(bricks[j][i] == 100){
                            plate.width -= 10;
                            bricks[j][i] = 0;
                            score+=50;
                        }
                    }
                }
            }
        }

        
        
        var pdx = plate.vx * time_interval / 1000;
        // Poruszanie paletki (sprawdzenie warunków granicznych)
        // Tym razem poruszanie w prawo i w lewo
        if ( plate.x + pdx >= area.x+3 && plate.x + pdx + plate.width <= area.width-3) {
        // To poruszaj
        plate.x += pdx;
        console.log(plate.x);
        }
        else
        {
        plate.vx = 0; // zatrzymanie paletki
        }

        if (ball.y + ball.r >= plate.y){ //odbicie piłki od paletki
            if (ball.x >= plate.x && ball.x <= plate.x + plate.width){ //odbicie
                var plate_center = plate.x + plate.width/2.0;
                ball.vx = ball.vx - 4*(plate_center - ball.x); //zmiana kąta odbicia
                ball.vy = -ball.vy; //odbicie po osi OY
            }else{
                drawGameOver = true; //koniec gry
            }
        }

        // Rysowanie paletki
        context.beginPath();
        context.fillStyle = plate.fillStyle;
        context.strokeStyle = plate.strokeStyle;
        context.fillRect(plate.x, plate.y, plate.width, plate.height);
        context.strokeRect(plate.x, plate.y, plate.width, plate.height);
        context.closePath();

        //rysowanie Pilki
        context.save();
        context.beginPath();
        context.fillStyle ="blue";
        context.strokeStyle ="black";
        context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();

        //Rysowanie score
        context.save();
        context.fillStyle="black";
        context.font = "10px Arial";
        context.fillText("Score: " + score,canvas.width-100, 30);
        context.restore();
        //Rysowanie level
        context.save();
        context.fillStyle="black";
        context.font = "10px Arial";
        context.fillText("Level: " + level,30, 30);
        context.restore();

        // 4.2 Odtworzenie stanu płótna
        context.restore();

        
        // 5. Ponowne wywołanie pętli animacji
        
        //if (!stop) window.requestAnimationFrame(drawAnimation);
    }
        else //Wyświetlanie napisu koniec gry
        {
        context.save();
        context.clearRect(0, 0, 500, 500);
        context.fillStyle =
        "black";
        context.font =
        "50pt Calibri";
        context.textAlign =
        "center";
        context.textBaseline =
        "middle";
        context.fillText("Game over", area.width / 2.0, area.height / 4.0);
        context.fillText("Score: " + score, area.width / 2.0, area.height / 2.0);

        context.restore();
        }
    }
    InitAnimation();
}
