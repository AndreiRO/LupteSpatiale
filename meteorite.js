/*
* Author: Andrei Ro
*/
function Meteorite(xAxis,yAxis,hh) {

this.x      = xAxis;
this.y      = yAxis;
this.health = hh;
this.xx =  - ((Math.random() * 100) % level);
this.yy =  - ((Math.random() * 100) % level);

this.n = 40;
}

Meteorite.prototype.damage = function() { 
this.health -= bulletDamage;
}

Meteorite.prototype.move   = function() {
this.x += this.xx;
this.y += this.yy;

if(this.x > 560) {
	this.x = 560;
	this.xx = -this.xx;
}

if(this.y > 560) {
	this.y = 560;
	this.yy = - this.yy;
}
if(this.x < 0) { 
	this.x = 15;
	this.xx = - this.xx;
}
if(this.y < 0) {
	this.y = 15
	this.yy = -this.yy;
}
}

Meteorite.prototype.procent = function() {
if(this.health > 50)
return 40;
else if (this.health > 30)
return 30;
else
return 20;
}
