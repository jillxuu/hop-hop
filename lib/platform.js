class Platform {
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.numPlatforms = 7;
    this.platforms = [];
    this.width = 80;
    this.height = 20;
    this.isMoving = Math.floor((Math.random() * 2));
    this.direction = Math.floor((Math.random() * 2)) ? -1 : 1;
  }

  createPlatforms(){
    let yPos = 0;
    for (let i = 0; i < this.numPlatforms; i++){
      let type = Math.floor(Math.random() * 10);
      if (yPos < height - this.height) {
        yPos += height / this.numPlatforms;
      }
      this.platforms.push(new Platform(Math.random() * (width-this.width), yPos, type));
    }
  }

  draw(){
    ctx.beginPath();
    let gradient = ctx.createRadialGradient(this.x + (this.width/2), this.y + (this.height/2), 20, this.x + (this.width/2), this.y + (this.height/2), 45);
    if (this.type === 1){
      gradient.addColorStop(0,'#FF0000');
      gradient.addColorStop(1,"#CD5C5C");
    } else {
      gradient.addColorStop(0,'#FFA500');
      gradient.addColorStop(1,"#FFD700");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.fill();
  }

  checkCollision(){
    this.platforms.map((p,idx)=> {
      if ((naruto.isFalling) && (naruto.x < p.x + this.width) &&
        (naruto.x + naruto.width > p.x) &&
        (naruto.y + naruto.height > p.y) &&
        (naruto.y + naruto.height < p.y + this.height)
      ) {
        p.onCollide();
      }
    });
  }

  onCollide(){
    naruto.stopFall();
    if (this.type === 1) {
      jump2.play();
      setTimeout(()=> {
        jump2.pause();
        jump2.load();
      }, 2000);
      naruto.jumpVelocity = 40;
      this.points += 20;
    }
  }
}
