class Hopper {
  constructor(game){
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 60;
    this.height = 80;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
  }

  draw(){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(180, 500, 20, 0, 2 * Math.PI);
    ctx.stroke();
  }

  setPosition(x,y){
    this.x = x;
    this.y = y;
  }

  jump(){
    if (!this.isJumping && !this.isFalling) {
      this.isJumping = true;
      this.jumpVelocity = 10;
      this.fallVelocity = 0;
    }
  }

  stopFall(){
    this.isFalling = false;
    this.fallVelocity = 0;
    this.jump();
  }

  checkFall(){
    if (this.y < 600 - this.height) {
      this.setPosition(this.x, this.y + this.fallVelocity);
      this.fallVelocity++;
    } else {
      if (this.game.points === 0) {
        this.stopFall();
      } else {
        this.game.gameOver();
      }
    }
  }

  left(){
    if (this.x > 0){
      this.setPosition(this.x - 5, this.y);
    }
  }

  right(){
    if (this.x + this.width < 400){
      this.setPosition(this.x + 5, this.y);
    }
  }

}

export default Hopper;
