/*
* Author: Andrei Ro
*/
function Monster(xx,yy,h) {

this.x      = xx;
this.y      = yy;
this.health = h;
this.xx =  - ((Math.random() * 100) % level);
this.yy =  - ((Math.random() * 100) % level);
this.b = 1000 / level;
this.b = (this.b< 100) ? 100 : this.b;
this.l = this.b;
this.n = 50;

}

Monster.prototype.move  = function() {

this.l -= 10;
if(this.l <= 0) {
this.l = this.b;
var bullet;
if(spaceship.x < this. x)
bullet = new Bullet(this.x,this.y+15,this.xx - 2*level,0,10);
else
bullet = new Bullet(this.x + 30,this.y+15,this.xx + 2*level,0,10);
mbullets.push(bullet);

}

this.x += this.xx;
this.y += this.yy;

if(this.x >= 555) {
	this.x = 555;
	this.xx = -this.xx;
}

if(this.y >= 550) {
	this.y = 550;
	this.yy = - this.yy;
}
if(this.x <= 0) { 
	this.x = 15;
	this.xx = - this.xx;
}
if(this.y <= 0) {
	this.y = 15
	this.yy = -this.yy;
}


}

Monster.prototype.damage = function() {
this.health -= bulletDamage;
}


Monster.prototype.procent = function() {
if(this.health > 50)
return 50;
else if (this.health > 30)
return 40;
else
return 30;
}


