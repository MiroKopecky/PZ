// fullscreen canvas
const canvas = document.querySelector("canvas");

const resize = () => {
  canvas.width = window.innerWidth-2;
  canvas.height = window.innerHeight-22;
}

resize();
window.addEventListener('resize', resize);

// drawing
window.addEventListener('load', function () {
  // get the canvas element and its context
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'green'; //set start line color
  context.lineWidth = 1; //set line width
  var isIdle = true;
  var newLine = [] //array to store (x,y) of current line
  var newLineCol = [];

  function isTransparent(x, y) {
    //get colors
    r = context.getImageData(x, y, 1, 1).data[0]; //red
    g = context.getImageData(x, y, 1, 1).data[1]; //green
    b = context.getImageData(x, y, 1, 1).data[2]; //blue
    a = context.getImageData(x, y, 1, 1).data[3]; //transparent
    var bool = a === 0; //check if transparent pixel
    //check if pixel is red
    // if((r > 0 && g <= 50 && b <= 50)) {       
    //     bool = true;
    // }
    //console.log(r,g,b,a,context.getImageData(x, y, 1, 1).data[3] === 0); // 4th byte is alpha
    newLine.push([x,y,bool])
  }

  function checkLine(line) {
    var startLine = line[0];
    var endLine = line[line.length - 1];
    var startLineTransparent = startLine[2];
    var endLineTransparent = endLine[2];

    if (startLineTransparent == false && endLineTransparent == false) {
      //console.log(line[0], line[line.length - 1]);
      //console.log(leafCoordinates);
      leaf = 0;
      if (startLine[0] > leafCoordinates[0] && startLine[1] > leafCoordinates[1] && startLine[0] < leafCoordinates[0] + leafCoordinates[2] && startLine[1] < leafCoordinates[1] + leafCoordinates[3]) {
        leaf = 1;
      }
      else if (endLine[0] > leafCoordinates[0] && endLine[1] > leafCoordinates[1] && endLine[0] < leafCoordinates[0] + leafCoordinates[2] && endLine[1] < leafCoordinates[1] + leafCoordinates[3]) {
        leaf = 2;
      }
      else {
        startLineTransparent = true;
        endLineTransparent = true;
      }

      if (leaf == 1) {
        console.log(endLine[0] > ladybug2Coordinates[0] && endLine[1] > ladybug2Coordinates[1] && endLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && endLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3]);
        console.log(ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[0] + ladybug2Coordinates[2], ladybug2Coordinates[1] + ladybug2Coordinates[3]);
        console.log(endLine[0], endLine[1]);
        if (
          (endLine[0] > ladybug1Coordinates[0] && endLine[1] > ladybug1Coordinates[1] && endLine[0] < ladybug1Coordinates[0] + ladybug1Coordinates[2] && endLine[1] < ladybug1Coordinates[1] + ladybug1Coordinates[3]) ||
          (endLine[0] > ladybug2Coordinates[0] && endLine[1] > ladybug2Coordinates[1] && endLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && endLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3])        
        ) {
          console.log("inside box")
        }
        else {
          endLineTransparent = true;
        }
      }

      if (leaf == 2) {
        console.log(startLine[0] > ladybug2Coordinates[0] && startLine[1] > ladybug2Coordinates[1] && startLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && startLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3]);
        console.log(ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[0] + ladybug2Coordinates[2], ladybug2Coordinates[1] + ladybug2Coordinates[3]);
        if (
          (startLine[0] > ladybug1Coordinates[0] && startLine[1] > ladybug1Coordinates[1] && startLine[0] < ladybug1Coordinates[0] + ladybug1Coordinates[2] && startLine[1] < ladybug1Coordinates[1] + ladybug1Coordinates[3]) ||
          (startLine[0] > ladybug2Coordinates[0] && startLine[1] > ladybug2Coordinates[1] && startLine[0] < ladybug2Coordinates[0] + ladybug2Coordinates[2] && startLine[1] < ladybug2Coordinates[1] + ladybug2Coordinates[3])        
        ) {
          console.log("inside box")
        }
        else {
          endLineTransparent = true;
        }
      }

      console.log(leaf);
    }
    

    if (startLineTransparent == true || endLineTransparent == true) {
      context.strokeStyle = 'red';
      for (i = 0; i < line.length; i++) {
        //context.strokeStyle = 'rgba('+ newLineCol[i][0] +','+ newLineCol[i][1] +','+ newLineCol[i][2] +','+ newLineCol[i][3] + ')';
        context.moveTo(line[i][0], line[i][1]);
        context.lineTo(line[i][0], line[i][1]);
        context.stroke();
      }
    }
  }

  function drawstart(event) {
    context.beginPath();
    context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    isIdle = false;
  }
  function drawmove(event) {
    if (isIdle) return;
    // r = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[0]; //red
    // g = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[1]; //green
    // b = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[2]; //blue
    // a = context.getImageData(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 1, 1).data[3]; //transparent
    // console.log(r,g,b,a)
    // newLineCol.push([r,g,b,a])
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    isTransparent(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
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

  


  // print images
  var demoCoordinates = [10, 10, canvas.width*0.2, canvas.height*0.2];
  var ladybug1Coordinates = [canvas.width*0.1, canvas.height*0.7, canvas.width*0.17, canvas.height*0.2];
  var ladybug2Coordinates = [canvas.width*0.7, canvas.height*0.2, canvas.width*0.17, canvas.height*0.2];
  var leafCoordinates = [canvas.width*0.4, canvas.height*0.4, canvas.width*0.3, canvas.height*0.3];

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
    context.strokeRect(ladybug1Coordinates[0], ladybug1Coordinates[1], ladybug1Coordinates[2], ladybug1Coordinates[3]);
  };
  ladybug1.src = 'assets/pl1/ladybug1.png';
  
  // ladybug2
  var ladybug2 = new Image();
  ladybug2.onload = function() {
    context.drawImage(ladybug2, ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[2], ladybug2Coordinates[3]);
    context.strokeRect(ladybug2Coordinates[0], ladybug2Coordinates[1], ladybug2Coordinates[2], ladybug2Coordinates[3]);
  };
  ladybug2.src = 'assets/pl1/ladybug2.png';
  
  // leaf
  var leaf = new Image();
  leaf.onload = function() {
    context.drawImage(leaf, leafCoordinates[0], leafCoordinates[1], leafCoordinates[2], leafCoordinates[3]);
    context.strokeRect(leafCoordinates[0], leafCoordinates[1], leafCoordinates[2], leafCoordinates[3]);
  };
  leaf.src = 'assets/pl1/leaf.png';

}, false); // end window.onLoad

document.addEventListener("orientationchange", function(event){
  location.reload();
});