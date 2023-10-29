let blob
// var cnv;

// function centerCanvas() {
//   var x = 0
//   var y = 0
//   cnv.position(x, y);
// }

function setup() {
  // var cnv = createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  // cnv.style('display', 'block');
  // cnv.parent = 'sketch'
  // cnv.position = 
  blob = new Blobbo()

}

function draw() {
  background(232, 253, 255)

    stroke(113, 160, 179, 19);
    strokeWeight(25)
  
    for(var x=0; x <= width; x+=50) {
      for(var y=0; y <= height; y+=50)  {
      line(x, 0, x, height);
      line(0, y, width, y);      }
    }

  noStroke();
  blob.draw()
}