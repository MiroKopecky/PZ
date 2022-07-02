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
  context.translate(1, 1);
  context.strokeStyle = 'green'; //set start line color
  context.lineWidth = 3; //set line width
  var isIdle = true;
  var newLine = [] //array to store (x,y) of current line
  var newLineCol = [];
  var ladybug1Connected = false;
  var ladybug2Connected = false;
  var ladybug3Connected = false;
  var ladybug4Connected = false;
  var ladybug5Connected = false;
  var ladybug6Connected = false;
  var goodLines = [];
  var startLineTransparent = true;
  var endLineTransparent = true;

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
    }

    var startLine = line[0];
    var endLine = line[line.length - 1];
    var temp = isTransparent(startLine[0],startLine[1]);

    if (startLineTransparent == false && endLineTransparent == false) {
      leafConnected = 0;
      if (startLine[0] > leafCoordinates[0] && startLine[1] > leafCoordinates[1] && startLine[0] < leafCoordinates[0] + leafCoordinates[2] && startLine[1] < leafCoordinates[1] + leafCoordinates[3]) {
        leafConnected = 1;
      }
      else if (endLine[0] > leafCoordinates[0] && endLine[1] > leafCoordinates[1] && endLine[0] < leafCoordinates[0] + leafCoordinates[2] && endLine[1] < leafCoordinates[1] + leafCoordinates[3]) {
        leafConnected = 2;
      }
      else {
        startLineTransparent = true;
        endLineTransparent = true;
      }

      if (leafConnected == 1) {

        if (endLine[0] > ladybug1Coordinates[0] && endLine[1] > ladybug1Coordinates[1] && endLine[0] < ladybug1Coordinates[0] + ladybug1Coordinates[2] && endLine[1] < ladybug1Coordinates[1] + ladybug1Coordinates[3]) {
          goodLines.push(line);
          ladybug1Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > ladybug2Coordinates[0] && endLine[1] > ladybug2Coordinates[1] && endLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && endLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3]) {
          goodLines.push(line);
          ladybug2Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > ladybug3Coordinates[0] && endLine[1] > ladybug3Coordinates[1] && endLine[0] < ladybug3Coordinates[0] + ladybug3Coordinates[2] && endLine[1] < ladybug3Coordinates[1] + ladybug3Coordinates[3]) {
          goodLines.push(line);
          ladybug3Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > ladybug4Coordinates[0] && endLine[1] > ladybug4Coordinates[1] && endLine[0] < ladybug4Coordinates[0] + ladybug4Coordinates[2] && endLine[1] < ladybug4Coordinates[1] + ladybug4Coordinates[3]) {
          goodLines.push(line);
          ladybug4Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > ladybug5Coordinates[0] && endLine[1] > ladybug5Coordinates[1] && endLine[0] < ladybug5Coordinates[0] + ladybug5Coordinates[2] && endLine[1] < ladybug5Coordinates[1] + ladybug5Coordinates[3]) {
          goodLines.push(line);
          ladybug5Connected = true;
          console.log("inside box")
        }
        else if (endLine[0] > ladybug6Coordinates[0] && endLine[1] > ladybug6Coordinates[1] && endLine[0] < ladybug6Coordinates[0] + ladybug6Coordinates[2] && endLine[1] < ladybug6Coordinates[1] + ladybug6Coordinates[3]) {
          goodLines.push(line);
          ladybug6Connected = true;
          console.log("inside box")
        }
        else {
          endLineTransparent = true;
        }
        
      }

      if (leafConnected == 2) {

        if (startLine[0] > ladybug1Coordinates[0] && startLine[1] > ladybug1Coordinates[1] && startLine[0] < ladybug1Coordinates[0] + ladybug1Coordinates[2] && startLine[1] < ladybug1Coordinates[1] + ladybug1Coordinates[3]) {
          goodLines.push(line);
          ladybug1Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > ladybug2Coordinates[0] && startLine[1] > ladybug2Coordinates[1] && startLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && startLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3]) {
          goodLines.push(line);
          ladybug2Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > ladybug3Coordinates[0] && startLine[1] > ladybug3Coordinates[1] && startLine[0] < ladybug3Coordinates[0] + ladybug3Coordinates[2] && startLine[1] < ladybug3Coordinates[1] + ladybug3Coordinates[3]) {
          goodLines.push(line);
          ladybug3Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > ladybug4Coordinates[0] && startLine[1] > ladybug4Coordinates[1] && startLine[0] < ladybug4Coordinates[0] + ladybug4Coordinates[2] && startLine[1] < ladybug4Coordinates[1] + ladybug4Coordinates[3]) {
          goodLines.push(line);
          ladybug4Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > ladybug5Coordinates[0] && startLine[1] > ladybug5Coordinates[1] && startLine[0] < ladybug5Coordinates[0] + ladybug5Coordinates[2] && startLine[1] < ladybug5Coordinates[1] + ladybug5Coordinates[3]) {
          goodLines.push(line);
          ladybug5Connected = true;
          console.log("inside box")
        }
        else if (startLine[0] > ladybug6Coordinates[0] && startLine[1] > ladybug6Coordinates[1] && startLine[0] < ladybug6Coordinates[0] + ladybug6Coordinates[2] && startLine[1] < ladybug6Coordinates[1] + ladybug6Coordinates[3]) {
          goodLines.push(line);
          ladybug6Connected = true;
          console.log("inside box")
        }
        else {
          startLineTransparent = true;
        }
      }

      if (ladybug1Connected && ladybug2Connected && ladybug3Connected && ladybug4Connected && ladybug5Connected && ladybug6Connected) {
        document.getElementById('spoj').innerText = "SPOJ: pre všetky lienky nakresli cestičku k listu ✅"
      }
      console.log(leaf);
      checkLine([[1,1],[2,2]]); //blur lines on all images
    }
    

    if (startLineTransparent == true || endLineTransparent == true) {
      // bad line dissapear
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
      context.drawImage(demo, demoCoordinates[0], demoCoordinates[1], demoCoordinates[2], demoCoordinates[3]);
      context.drawImage(ladybug1, ladybug1Coordinates[0], ladybug1Coordinates[1], ladybug1Coordinates[2], ladybug1Coordinates[3]);
      context.drawImage(ladybug2, ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[2], ladybug2Coordinates[3]);
      context.drawImage(ladybug3, ladybug3Coordinates[0], ladybug3Coordinates[1], ladybug3Coordinates[2], ladybug3Coordinates[3]);
      context.drawImage(ladybug4, ladybug4Coordinates[0], ladybug4Coordinates[1], ladybug4Coordinates[2], ladybug4Coordinates[3]);
      context.drawImage(ladybug5, ladybug5Coordinates[0], ladybug5Coordinates[1], ladybug5Coordinates[2], ladybug5Coordinates[3]);
      context.drawImage(ladybug6, ladybug6Coordinates[0], ladybug6Coordinates[1], ladybug6Coordinates[2], ladybug6Coordinates[3]);
      context.drawImage(svabik, svabikCoordinates[0], svabikCoordinates[1], svabikCoordinates[2], svabikCoordinates[3]);
      context.drawImage(leaf, leafCoordinates[0], leafCoordinates[1], leafCoordinates[2], leafCoordinates[3]);
      for (i = 0; i < goodLines.length; i++) {
        for (j = 0; j < goodLines[i].length-1; j++) {
          context.beginPath();
          context.moveTo(goodLines[i][j][0], goodLines[i][j][1]);
          context.lineTo(goodLines[i][j+1][0], goodLines[i][j+1][1]);
          context.stroke();
        }
      }
      
      // bad line red
      // context.strokeStyle = 'red';
      // for (i = 0; i < line.length; i++) {
      //   //context.strokeStyle = 'rgba('+ newLineCol[i][0] +','+ newLineCol[i][1] +','+ newLineCol[i][2] +','+ newLineCol[i][3] + ')';
      //   context.moveTo(line[i][0], line[i][1]);
      //   context.lineTo(line[i][0], line[i][1]);
      //   context.stroke();
      // }
    }
  }

  function drawstart(event) {
    context.beginPath();
    context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    startLineTransparent = a < 255;
    console.log("start",event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, a)
    newLine.push([event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop]);
    isIdle = false;
  }
  function drawmove(event) {
    if (isIdle) return;
    
    r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    console.log("move",event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, a)
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
    r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    endLineTransparent = a < 255;
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
  var ladybug1Coordinates = [canvas.width*0.1, canvas.height*0.4, canvas.width*0.13, canvas.height*0.16];
  var ladybug2Coordinates = [canvas.width*0.7, canvas.height*0.2, canvas.width*0.13, canvas.height*0.16];
  var ladybug3Coordinates = [canvas.width*0.4, canvas.height*0.1, canvas.width*0.13, canvas.height*0.16];
  var ladybug4Coordinates = [canvas.width*0.8, canvas.height*0.7, canvas.width*0.12, canvas.height*0.16];
  var ladybug5Coordinates = [canvas.width*0.5, canvas.height*0.8, canvas.width*0.09, canvas.height*0.18];
  var ladybug6Coordinates = [canvas.width*0.2, canvas.height*0.7, canvas.width*0.09, canvas.height*0.18];
  var svabikCoordinates = [canvas.width*0.85, canvas.height*0.45, canvas.width*0.08, canvas.height*0.17];
  var leafCoordinates = [canvas.width*0.4, canvas.height*0.4, canvas.width*0.21, canvas.height*0.23];

  if (canvas.height * 1.85 < canvas.width) {
    demoCoordinates = [10, 10, canvas.width*0.12, canvas.height*0.17];
    ladybug1Coordinates = [canvas.width*0.1, canvas.height*0.4, canvas.width*0.12, canvas.height*0.2];
    ladybug2Coordinates = [canvas.width*0.7, canvas.height*0.2, canvas.width*0.12, canvas.height*0.2];
    ladybug3Coordinates = [canvas.width*0.4, canvas.height*0.1, canvas.width*0.12, canvas.height*0.2];
    ladybug4Coordinates = [canvas.width*0.8, canvas.height*0.7, canvas.width*0.12, canvas.height*0.2];
    ladybug5Coordinates = [canvas.width*0.5, canvas.height*0.75, canvas.width*0.1, canvas.height*0.22];
    ladybug6Coordinates = [canvas.width*0.2, canvas.height*0.7, canvas.width*0.1, canvas.height*0.23];
    svabikCoordinates = [canvas.width*0.85, canvas.height*0.45, canvas.width*0.08, canvas.height*0.21];
    leafCoordinates = [canvas.width*0.4, canvas.height*0.4, canvas.width*0.16, canvas.height*0.23];
  }

  // demo img
  var demo = new Image();
  demo.onload = function() {
    context.drawImage(demo, demoCoordinates[0], demoCoordinates[1], demoCoordinates[2], demoCoordinates[3]);
  };
  demo.src = 'assets/pl1/demo.png';
  
  // ladybug1
  var ladybug1 = new Image();
  ladybug1.onload = function() {
    context.drawImage(ladybug1, ladybug1Coordinates[0], ladybug1Coordinates[1], ladybug1Coordinates[2], ladybug1Coordinates[3]);
  };
  ladybug1.src = 'assets/pl1/ladybug1.png';
  
  // ladybug2
  var ladybug2 = new Image();
  ladybug2.onload = function() {
    context.drawImage(ladybug2, ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[2], ladybug2Coordinates[3]);
  };
  ladybug2.src = 'assets/pl1/ladybug2.png';

  // ladybug3
  var ladybug3 = new Image();
  ladybug3.onload = function() {
    context.drawImage(ladybug3, ladybug3Coordinates[0], ladybug3Coordinates[1], ladybug3Coordinates[2], ladybug3Coordinates[3]);
  };
  ladybug3.src = 'assets/pl1/ladybug3.png';
  
  // ladybug4
  var ladybug4 = new Image();
  ladybug4.onload = function() {
    context.drawImage(ladybug4, ladybug4Coordinates[0], ladybug4Coordinates[1], ladybug4Coordinates[2], ladybug4Coordinates[3]);
  };
  ladybug4.src = 'assets/pl1/ladybug4.png';

  // ladybug5
  var ladybug5 = new Image();
  ladybug5.onload = function() {
    context.drawImage(ladybug5, ladybug5Coordinates[0], ladybug5Coordinates[1], ladybug5Coordinates[2], ladybug5Coordinates[3]);
  };
  ladybug5.src = 'assets/pl1/ladybug5.png';
  
  // ladybug6
  var ladybug6 = new Image();
  ladybug6.onload = function() {
    context.drawImage(ladybug6, ladybug6Coordinates[0], ladybug6Coordinates[1], ladybug6Coordinates[2], ladybug6Coordinates[3]);
  };
  ladybug6.src = 'assets/pl1/ladybug6.png';

  // svabik
  var svabik = new Image();
  svabik.onload = function() {
    context.drawImage(svabik, svabikCoordinates[0], svabikCoordinates[1], svabikCoordinates[2], svabikCoordinates[3]);
  };
  svabik.src = 'assets/pl1/svabik.png';
  
  // leaf
  var leaf = new Image();
  leaf.onload = function() {
    context.drawImage(leaf, leafCoordinates[0], leafCoordinates[1], leafCoordinates[2], leafCoordinates[3]);
    checkLine([[1,1],[2,2]]); //blur lines on all images
  };
  leaf.src = 'assets/pl1/leaf.png';

}, true); // end window.onLoad

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