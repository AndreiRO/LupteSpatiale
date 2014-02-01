/*
* Author: Andrei Ro
*/
function Spaceship(xAxis,yAxis,h) {
this.x      = xAxis;
this.y      = yAxis;
this.health = h;

}


Spaceship.prototype.damage = function () {
this.health -= level*30;
}

Spaceship.prototype.addX = function(speed) {
this.x += speed;
}

Spaceship.prototype.addY = function(speed) {
this.y += speed;
}

Spaceship.prototype.procent = function() {
return 40;
}
