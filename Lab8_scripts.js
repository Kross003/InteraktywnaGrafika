function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function Funkcja1(){
    var x = [];
    var y = [];
    for(var i = -5; i<=5; i+=0.2){
        x.push(i.toFixed(1));
        y.push((i^2 - 10 * Math.cos(2 * Math.PI*i))+10)
    }
    var data = {
        "y" : {
           "data" : [
             y
           ],
           "smps" : x,
           "vars" : ['funkcja 1']
        }
     }

     var config = {
        "graphOrientation": "vertical","graphType": "DotLine",
        "legendBackgroundColor": false,
        "legendBox": true,
        "legendColumns": 2,
        "blockContrast":"true",
        "legendPosition": "bottom","lineThickness": 2,
        "lineType": "spline",
        "showShadow": false,
        "smpLabelRotate": 45,
        "title": "Funkcja 1",
        "xAxisTickColor": "rgb(0,0,0)"
      }
    
    var cX = new CanvasXpress("Funkcja1", data, config);
}



function Funkcja2a(){
    var x = [];
    var y = [];
    var z = [];
    
    for(var i = -10; i<=10; i+=0.2){
        var a = 0;
        var b = 1;
        x.push(i.toFixed(1));
        z.push(i.toFixed(1));
        for(var j=1; j<=2; j++){
            a += (i*i)/4000;
            b *= Math.cos(i/Math.sqrt(Math.abs(i)));
        }
        y.push(a-b+1);
    }
    var data = [x,y,z]
    var layout = {
        plot_bgcolor:"black",
        paper_bgcolor:"#ADD8E6"
    }
    Plotly.newPlot('Funkcja2a', [{
        type: 'scatter3d',
        mode: 'points',
        x: data[0],
        y: data[1],
        z: data[2],
        line: {
            width: 4,
            color: data[2],
            colorscale: "Viridis"},
        marker: {
            size: 3,
            color: data[2],
            colorscale: "reds",
            cmin: -10,
            cmax: 10
        }},                  
        ], layout);
}

function IrisFunction() {
    fetch("https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv")
        .then((res) => res.text())
        .then((text) => {
            var setosa_X = [];
            var setosa_Y = [];
            var setosa_Z = [];
            var setosa_K = [];
            var setosa_R = [];
            var versicolor_X = [];
            var versicolor_Y = [];
            var versicolor_Z = [];
            var versicolor_K = [];
            var versicolor_R = [];
            var virginica_X = [];
            var virginica_Y = [];
            var virginica_Z = [];
            var virginica_K = [];
            var virginica_R = [];

            var lines = text.split('\n');
            var line = [];
            for (var i = 1; i < lines.length; i++) {
                line = lines[i].split(',');
                console.log(line);
                if (line[4] == "\"Setosa\"") {
                    setosa_X.push(parseFloat(line[0]));
                    setosa_Y.push(parseFloat(line[1]));
                    setosa_Z.push(parseFloat(line[2]));
                    setosa_K.push(parseFloat(line[3]));
                    setosa_R.push(parseFloat(line[3]) * 10);
                } else if (line[4] == "\"Versicolor\"") {
                    versicolor_X.push(parseFloat(line[0]));
                    versicolor_Y.push(parseFloat(line[1]));
                    versicolor_Z.push(parseFloat(line[2]));
                    versicolor_K.push(parseFloat(line[3]));
                    versicolor_R.push(parseFloat(line[3]) * 10);
                } else {
                    virginica_X.push(parseFloat(line[0]));
                    virginica_Y.push(parseFloat(line[1]));
                    virginica_Z.push(parseFloat(line[2]));
                    virginica_K.push(parseFloat(line[3]));
                    virginica_R.push(parseFloat(line[3]) * 10);
                }
            }

            var setosa = {
                x: setosa_X, y: setosa_Y, z: setosa_Z,
                text: setosa_K,
                hovertemplate: 'sepal_length: %{x}' +
                    '<br>sepal_width: %{y}<br>' +
                    'petal_length: %{z}<br>' +
                    'petal_width: %{text}',

                mode: 'markers',
                color: 'red',
                marker: {
                    size: setosa_R,
                    color: 'red',
                    width: 0.5,
                },
                type: 'scatter3d',
                name: 'Setosa'
            };

            var versicolor = {
                x: versicolor_X, y: versicolor_Y, z: versicolor_Z,
                text: versicolor_K,
                hovertemplate: 'sepal_length: %{x}' +
                    '<br>sepal_width: %{y}<br>' +
                    'petal_length: %{z}<br>' +
                    'petal_width: %{text}',

                mode: 'markers',
                color: 'green',
                marker: {
                    size: versicolor_R,
                    color: 'green',
                    width: 0.5,
                },
                type: 'scatter3d',
                name: 'Versicolor'
            };

            var virginica = {
                x: virginica_X, y: virginica_Y, z: virginica_Z,
                text: virginica_K,
                hovertemplate: 'sepal_length: %{x}' +
                    '<br>sepal_width: %{y}<br>' +
                    'petal_length: %{z}<br>' +
                    'petal_width: %{text}',

                mode: 'markers',
                color: 'blue',
                marker: {
                    size: virginica_R,
                    color: 'blue',
                    width: 0.5,
                },
                type: 'scatter3d',
                name: 'Virginica'
            };

            data = [setosa, versicolor, virginica];

            var layout = {
                plot_bgcolor: "black",
                paper_bgcolor: "#ADD8E6",
                scene: {
                    xaxis: {
                        title: {
                            text: "Sepal Length",
                        },
                    },
                    yaxis: {
                        title: {
                            text: "Sepal Width",
                        }
                    },
                    zaxis: {
                        title: {
                            text: "Petal Length",
                        }
                    },
                }
            };
            Plotly.newPlot('Iris', data, layout);
        });
}



