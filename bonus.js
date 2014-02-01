/*
* Author: Andrei Ro
*/
var proc = 40;

function Bonus() {
this.x = 0;
this.y = 0;
this.visible = 0;
this.type = 0;
}

Bonus.prototype.newBonus = function() {
console.log('bonus: ' + this);
if(this.visible === 0) {
this.x = (Math.random() * 1000) % (600 - proc);
this.y = (Math.random() * 1000) % (600 - proc); 
this.visible = 1;
this.type = ((Math.random() * 1000) | 0); 
console.log(this.type);
this.type = this.type % 3;
var _this = this;
setTimeout(function() {_this.kicked();},3500);

}
}



Bonus.prototype.kicked = function() {
if(this.visible === 1) { 

this.visible = 0;
var _this = this;
setTimeout(function() {_this.newBonus();},1 / level * 1000 + 3000);
}
}

Bonus.prototype.start = function() {
var _this = this;
setTimeout(function(){_this.newBonus();},7000);
}

Bonus.prototype.procent = function() {
return proc;
}
