class Blobbo {
  constructor() {
    // lets set up the blobbo
    this.numOfPoints = 500
    this.time = 0
  }
  
  wave(num, amp, freq, speed) {
    return amp * sin(freq * TWO_PI * num / this.numOfPoints + this.time * speed)
  }
  
  draw() {
    noStroke()
    fill("#FFFFFF")
    beginShape()
    
    // lets draw the egg blobbo
    for (let num = 0; num < this.numOfPoints; num = num + 1) {
      
      let angle = TWO_PI * num / this.numOfPoints
      let r = 250 
      	+ this.wave(num, 20, 3, 1) 
      	+ this.wave(num, 15, 7, 3) 
      	+ this.wave(num, 5, 9, 0) 
      	+ this.wave(num, 2, 13, -5)
      			
      let x = (windowWidth / 2) + r * cos(angle)
      let y = (windowHeight / 2) + r * sin(angle)
      
      vertex(x, y)
    }
    
    endShape()
    this.time = this.time + 0.008

    

    fill("#FFEB45")

    circle(random (windowWidth/ 2 - 1, windowWidth/ 2 + 1), windowHeight/ 2, 200)

  }
}