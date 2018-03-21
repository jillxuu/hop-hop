class Platform {
  constructor(game,x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 40;
    this.height = 15;
  }

  draw(){
    if (this.type === 0){
      ctx.fillStyle = "#738b2a";
    } else {
      ctx.fillStyle = "#ac1406";
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

export default Platform;
