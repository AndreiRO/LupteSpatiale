/*
* Author: Andrei Ro
*/
function Bullet(xAxis,yAxis,speedXAxis,speedYAxis,pro){

this.x 		 = xAxis;
this.y 		 = yAxis;
this.xx = speedXAxis;
this.yy = speedYAxis;
this.proc = pro;

}

Bullet.prototype.move = function() {

this.x += this.xx;
this.y += this.yy;

}

Bullet.prototype.procent = function() {
return this.proc;
}
