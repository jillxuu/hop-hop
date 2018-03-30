class Naruto {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = 70;
    this.height = 70;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
    this.image = new Image();
    this.image.src = './assets/images/Narutobig.gif';
  }

  setPosition(newX, newY){
    this.x = newX;
    this.y = newY;
  }

  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump(){
    if (this.isFalling === false && this.isJumping === false) {
      this.isJumping = true;
      this.jumpVelocity = 20;
      this.fallVelocity = 0;
    }
  }

  checkJump(){
    if (this.y > height / 2){
      this.setPosition(this.x, this.y-this.jumpVelocity);
    } else {
      if (this.jumpVelocity > 10){
        points ++;
      }
      platform.platforms.map((p, idx)=>{
        p.y += this.jumpVelocity;
        if (p.y > height){
          let type = Math.floor(Math.random() * 10);
          platform.platforms[idx] = new Platform(Math.random() * (width - p.width), p.y - height, type);
        }
      });
    }
    this.jumpVelocity -= 1;
    if (this.jumpVelocity === 0){
      this.isJumping = false;
      this.isFalling = true;
      this.fallVelocity = 1;
    }
  }


  checkFall(){
    if (this.y + this.height < height){
      this.setPosition(this.x, this.y+this.fallVelocity);
      this.fallVelocity ++;
    } else {
      this.stopFall();
    }
  }

  stopFall(){
    this.isFalling = false;
    this.isJumping = false;
    this.fallVelocity = 0;
    this.jump();
  }

  left(){
    if (this.x > 0){
      this.x -= 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.width;
      this.setPosition(this.x, this.y);
    }
    // naruto.image.src = './assets/images/narutoLeft.png';
  }

  right(){
    if (this.x + this.width < width){
      this.x += 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.x - this.width;
      this.setPosition(this.x, this.y);
    }
    // naruto.image.src = './assets/images/narutoRight.png';
  }

  reset(){
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
  }
}
