let hophop = require('./hophop.js');

class Cloud{
  constructor(x,y){
    this.clouds = [];
    this.numClouds = 10;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 50;
  }

  createClouds(){
    for (let i = 0; i < this.numClouds; i++){
      let randX = Math.random() * width;
      let randY = Math.random() * height;
      this.clouds[i] = new Cloud(randX, randY);
    }
  }

  updateClouds(newX, newY){
    for (let i = 0; i < this.numClouds; i++) {
      if (this.clouds[i].y - 50 > height){
        this.clouds[i].x = Math.random() * width;
        this.clouds[i].y = Math.random() * height;
      } else {
        this.clouds[i].x += Math.random() * -newX;
        this.clouds[i].y = Math.random() * newY;

      }
    }
  }

  draw(){
    let that = this;
    let cloudImage = new Image();
    cloudImage.src = './assets/images/cloud.png';
    ctx.drawImage(cloudImage, that.x, that.y, that.width, that.height);
  }
}


module.exports = Cloud;
