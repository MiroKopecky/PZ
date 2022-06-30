// fullscreen canvas
const canvas = document.querySelector("canvas");

const resize = () => {
  canvas.width = window.innerWidth-2;
  canvas.height = window.innerHeight-44;
}

resize();
window.addEventListener('resize', resize);

// drawing
window.addEventListener('load', function () {
  // get the canvas element and its context
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'green'; //set start line color
  context.lineWidth = 3; //set line width
  var isIdle = true;
  var newLine = [] //array to store (x,y) of current line
  var newLineCol = [];
  var flower1Connected = false;
  var flower2Connected = false;
  var flower3Connected = false;
  var goodLines = [];

  function isTransparent(x, y) {
    //get colors
    r = context.getImageData(x, y, 1, 1).data[0]; //red
    g = context.getImageData(x, y, 1, 1).data[1]; //green
    b = context.getImageData(x, y, 1, 1).data[2]; //blue
    a = context.getImageData(x, y, 1, 1).data[3]; //transparent
    bool = a < 255; //check if transparent pixel
    //check if pixel is white
    if (r == 255 && g == 255 && b == 255) {
      bool = false;
    }
    console.log(r,g,b,a,bool)
    return bool;
  }

  function checkSvabik(x,y) {
    if (x > svabikCoordinates[0] && y > svabikCoordinates[1] && x < svabikCoordinates[0] + svabikCoordinates[2] && y < svabikCoordinates[1] + svabikCoordinates[3]) {
      document.getElementById('svabik').innerText = "NÁJDI ŠVÁBIKA: klikni naň prštekom ✅";
    }
  }

  function checkLine(line) {
    //svabik touched
    if (line.length == 1) {
      checkSvabik(line[0][0],line[0][1]);
      return;
    }

    var startLine = line[0];
    var endLine = line[line.length - 1];
    var startLineTransparent = isTransparent(startLine[0], startLine[1]);
    var endLineTransparent = isTransparent(endLine[0], endLine[1]);

    //check if line is going only down or only up
    var lineDown = true;
    for (i = 1; i < line.length; i++) {
      if (line[0][1] < line[1][1]) {
        if (line[i][1] < line [i-1][1]) lineDown = false;
      }
      else {
        if (line[i][1] > line [i-1][1]) lineDown = false;
      }
    }

    //check if line is not horizontal
    for (i = 10; i < line.length; i++) {
      if (Math.abs(line[i][0] - line[i-10][0]) > 25) {
        lineDown = false;
      }
    }

    if (startLineTransparent == false && endLineTransparent == false && lineDown == true) {
      groundConnected = 0;
      if (startLine[0] > groundCoordinates[0] && startLine[1] > groundCoordinates[1] && startLine[0] < groundCoordinates[0] + groundCoordinates[2] && startLine[1] < groundCoordinates[1] + groundCoordinates[3]) {
        groundConnected = 1;
      }
      else if (endLine[0] > groundCoordinates[0] && endLine[1] > groundCoordinates[1] && endLine[0] < groundCoordinates[0] + groundCoordinates[2] && endLine[1] < groundCoordinates[1] + groundCoordinates[3]) {
        groundConnected = 2;
      }
      else {
        startLineTransparent = true;
        endLineTransparent = true;
      }

      if (groundConnected == 1) {

        if (endLine[0] > flower1Coordinates[0] && endLine[1] > flower1Coordinates[1] && endLine[0] < flower1Coordinates[0] + flower1Coordinates[2] && endLine[1] < flower1Coordinates[1] + flower1Coordinates[3]) {
          if (!flower1Connected) {goodLines.push(line);}
          flower1Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > flower2Coordinates[0] && endLine[1] > flower2Coordinates[1] && endLine[0] < flower2Coordinates[0] + flower2Coordinates[2] && endLine[1] < flower2Coordinates[1] + flower2Coordinates[3]) {
          if (!flower2Connected) {goodLines.push(line);}
          flower2Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > flower3Coordinates[0] && endLine[1] > flower3Coordinates[1] && endLine[0] < flower3Coordinates[0] + flower3Coordinates[2] && endLine[1] < flower3Coordinates[1] + flower3Coordinates[3]) {
          if (!flower3Connected) {goodLines.push(line);}
          flower3Connected = true;
          console.log("inside box")
        }
        else {
          endLineTransparent = true;
        }
        
      }

      if (groundConnected == 2) {

        if (startLine[0] > flower1Coordinates[0] && startLine[1] > flower1Coordinates[1] && startLine[0] < flower1Coordinates[0] + flower1Coordinates[2] && startLine[1] < flower1Coordinates[1] + flower1Coordinates[3]) {
          if (!flower1Connected) {goodLines.push(line);}
          flower1Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > flower2Coordinates[0] && startLine[1] > flower2Coordinates[1] && startLine[0] < flower2Coordinates[0] + flower2Coordinates[2] && startLine[1] < flower2Coordinates[1] + flower2Coordinates[3]) {
          if (!flower2Connected) {goodLines.push(line);}
          flower2Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > flower3Coordinates[0] && startLine[1] > flower3Coordinates[1] && startLine[0] < flower3Coordinates[0] + flower3Coordinates[2] && startLine[1] < flower3Coordinates[1] + flower3Coordinates[3]) {
          if (!flower3Connected) {goodLines.push(line);}
          flower3Connected = true;
          console.log("inside box")
        }
        else {
          startLineTransparent = true;
        }
      }

      if (flower1Connected && flower2Connected && flower3Connected) {
        document.getElementById('spoj').innerText = "SPOJ: nakresli čiarky tak, aby kvietky vyrástli z trávičky ✅";
      }
      console.log(groundConnected);
    }
    

    if (startLineTransparent == true || endLineTransparent == true || lineDown == false || flower1Connected || flower2Connected || flower3Connected) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
      context.drawImage(demo, demoCoordinates[0], demoCoordinates[1], demoCoordinates[2], demoCoordinates[3]);
      context.drawImage(flower1, flower1Coordinates[0], flower1Coordinates[1], flower1Coordinates[2], flower1Coordinates[3]);
      context.drawImage(flower2, flower2Coordinates[0], flower2Coordinates[1], flower2Coordinates[2], flower2Coordinates[3]);
      context.drawImage(flower3, flower3Coordinates[0], flower3Coordinates[1], flower3Coordinates[2], flower3Coordinates[3]);
      context.drawImage(svabik, svabikCoordinates[0], svabikCoordinates[1], svabikCoordinates[2], svabikCoordinates[3]);
      context.drawImage(ground, groundCoordinates[0], groundCoordinates[1], groundCoordinates[2], groundCoordinates[3]);
      for (i = 0; i < goodLines.length; i++) { 
        for (j = 0; j < goodLines[i].length-1; j++) {
          context.beginPath();
          context.moveTo(goodLines[i][j][0], goodLines[i][j][1]);
          context.lineTo(goodLines[i][j+1][0], goodLines[i][j+1][1]);
          context.stroke();
        }
      }
    }
  }

  function drawstart(event) {
    context.beginPath();
    context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    console.log("start",event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop)
    newLine.push([event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop]);
    isIdle = false;
  }
  function drawmove(event) {
    if (isIdle) return;
    r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    console.log("move",event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop)
    newLineCol.push([r,g,b,a])
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    newLine.push([event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop]);
    context.stroke();
  }
  function drawend(event) {
    if (isIdle) return;
    drawmove(event);
    isIdle = true;
    if (newLine.length > 1) {
      newLine.pop(-1);
    }
    checkLine(newLine);
    context.strokeStyle = 'green';
    newLine = [];
  }

  function touchstart(event) {
    drawstart(event.changedTouches[0])
  }
  function touchmove(event) {
    drawmove(event.changedTouches[0])
    event.preventDefault();
  }
  function touchend(event) {
    drawend(event.changedTouches[0])
  }

  canvas.addEventListener('touchstart', touchstart, false);
  canvas.addEventListener('touchmove', touchmove, false);
  canvas.addEventListener('touchend', touchend, false);


  // images size
  var demoCoordinates = [10, 10, canvas.width*0.17, canvas.height*0.17];
  var flower1Coordinates = [canvas.width*0.22, canvas.height*0.25, canvas.width*0.2, canvas.height*0.3];
  var flower2Coordinates = [canvas.width*0.55, canvas.height*0.1, canvas.width*0.2, canvas.height*0.3];
  var flower3Coordinates = [canvas.width*0.75, canvas.height*0.35, canvas.width*0.2, canvas.height*0.3];
  var svabikCoordinates = [canvas.width*0.1, canvas.height*0.55, canvas.width*0.08, canvas.height*0.17];
  var groundCoordinates = [canvas.width*0.05, canvas.height*0.94, canvas.width*0.9, canvas.height*0.03];

  if (canvas.height * 1.85 < canvas.width) {
    demoCoordinates = [10, 10, canvas.width*0.13, canvas.height*0.17];
    flower1Coordinates = [canvas.width*0.22, canvas.height*0.25, canvas.width*0.15, canvas.height*0.3];
    flower2Coordinates = [canvas.width*0.55, canvas.height*0.1, canvas.width*0.15, canvas.height*0.3];
    flower3Coordinates = [canvas.width*0.75, canvas.height*0.35, canvas.width*0.15, canvas.height*0.3];
    svabikCoordinates = [canvas.width*0.1, canvas.height*0.55, canvas.width*0.08, canvas.height*0.17];
    groundCoordinates = [canvas.width*0.05, canvas.height*0.94, canvas.width*0.9, canvas.height*0.03];
  }

  // demo img
  var demo = new Image();
  demo.onload = function() {
    context.beginPath();
    context.drawImage(demo, demoCoordinates[0], demoCoordinates[1], demoCoordinates[2], demoCoordinates[3]);
    context.stroke();
  };
  demo.src = 'assets/pl2/demo.png';
  
  // flower1
  var flower1 = new Image();
  flower1.onload = function() {
    context.drawImage(flower1, flower1Coordinates[0], flower1Coordinates[1], flower1Coordinates[2], flower1Coordinates[3]);
  };
  flower1.src = 'assets/pl2/flower1.png';
  
  // flower2
  var flower2 = new Image();
  flower2.onload = function() {
    context.drawImage(flower2, flower2Coordinates[0], flower2Coordinates[1], flower2Coordinates[2], flower2Coordinates[3]);
  };
  flower2.src = 'assets/pl2/flower2.png';

  // flower3
  var flower3 = new Image();
  flower3.onload = function() {
    context.drawImage(flower3, flower3Coordinates[0], flower3Coordinates[1], flower3Coordinates[2], flower3Coordinates[3]);
  };
  flower3.src = 'assets/pl2/flower3.png';

  // svabik
  var svabik = new Image();
  svabik.onload = function() {
    context.drawImage(svabik, svabikCoordinates[0], svabikCoordinates[1], svabikCoordinates[2], svabikCoordinates[3]);
  };
  svabik.src = 'assets/pl2/svabik.png';
  
  // ground
  var ground = new Image();
  ground.onload = function() {
    context.drawImage(ground, groundCoordinates[0], groundCoordinates[1], groundCoordinates[2], groundCoordinates[3]);
    checkLine([[1,1],[2,2]]); //blur lines on all images
  };
  ground.src = 'assets/pl2/ground1.png';
  

}, false); // end window.onLoad

console.log(screen.height);
console.log(screen.width);

window.addEventListener('load', function () {
  if (screen.height > screen.width) {
    document.getElementById("fadeMe").style.visibility = "visible";
    document.getElementById('fadeText').innerText = "Pre zobrazenie obsahu, otočte zariadenie na šírku.";
  }
  else if (screen.height <= screen.width && screen.height < 450) {
    document.getElementById("fadeMe").style.visibility = "visible";
    document.getElementById('fadeText').innerText = "Vaše zariadenie nemá dostatočne veľkú obrazovku pre zobrazenie obsahu.";
  }
  else {
    document.getElementById("fadeMe").style.visibility = "hidden";
  }
});

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);