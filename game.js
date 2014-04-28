/*
 * author: Andrei Ro
 */


var canvas, ctx,iL = 0;

var isToRight = true;

var monsters         = new Array();
var bullets          = new Array();
var mbullets         = new Array();
var meteorites       = new Array();
var bonus            = new Bonus();
var bulletDamage = 10;
var level = 0;
var nms = 0, nme = 0;
var spaceship = new Spaceship(30,30,100);
var img = 0;
var up = false, down = false, right = false, left = false, fire = false;

var sImage,bImage,meImage,msImage,zImage,sImage2,sImage3,baImage, lImage,daImage,deImage,hImage;
var lsImage, lsImage2, lsImage3;

sImage = new Image();
sImage.src = 'img/spaceship.png';
bImage = new Image();
bImage.src = 'img/bullet.png';
meImage = new Image();
meImage.src = 'img/meteorite.png';
msImage = new Image();
msImage.src = 'img/monster1.png';
cImage = new Image();
cImage.src = 'img/crash.png';
zImage = new Image();
zImage.src = 'img/zerg.png';
sImage2 = new Image();
sImage2.src = 'img/spaceship2.png';
sImage3 = new Image();
sImage3.src = 'img/spaceship3.png';
baImage = new Image();
baImage.src = 'img/background.png';
lImage = new Image();
lImage.src = 'img/load.JPG';
daImage = new Image();
daImage.src = 'img/damage.png';
deImage = new Image();
deImage.src = 'img/death.png';
hImage = new Image();
hImage.src = 'img/health.png';
lsImage = new Image();
lsImage.src = 'img/lspaceship.png';
lsImage2 = new Image();
lsImage2.src = 'img/lspaceship2.png';
lsImage3 = new Image();
lsImage3.src = 'img/lspaceship3.png';

function launchNewBullet() {
	var x = spaceship.x + spaceship.procent();
	if(bullets.length < 15) {
		var speed = 10;
		if(!isToRight) {
			speed = -speed;
			x = spaceship.x - 15;
		}
		var bullet = new Bullet(x,spaceship.y + 15,speed,0,17);
		bullets.push(bullet);
	}
}




function draw() {
 
  if( spaceship.health <= 0) {
		monsters.splice(0,monsters.length);
		meteorites.splice(0,meteorites.length);
		bullets.splice(0,bullets.length);
		mbullets.splice(0,mbullets.length);	
		
		alert('Ai pierdut.... :(\nMacar ai ajuns pana la nivelul: ' + level+ ' ! ;)');
		window.location="site.html";
		return false;
	}	
  if(nms === 0 && nme === 0 && monsters.length === 0 && meteorites.length === 0)
		newLevel();
	
  moveSpaceship();
  
  ctx.fillStyle = "#ffffff";
  ctx.drawImage(baImage,0,0);
  ctx.fillRect(0,601,600,640);


  if(img < 5)	{

  	if(isToRight === true) {
	  ctx.drawImage(sImage,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
	}	else {
	  ctx.drawImage(lsImage,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
	}

	  img ++;
  }
  else if(img < 10)	{
 	
 	if(isToRight === true) {
 		ctx.drawImage(sImage2,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
 	}	else {
 		ctx.drawImage(lsImage2,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
 	}
	  
	  img ++;

  }
  else if(img < 15)	{
  	
  	if(isToRight === true) {
  		ctx.drawImage(sImage3,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());	
  	}	else {
  		ctx.drawImage(lsImage3,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
  	}
	  
	  img ++;

  }
  else {
	img = 0; 

	if (isToRight === true) {
		ctx.drawImage(sImage,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
	}	else {
		ctx.drawImage(lsImage,spaceship.x,spaceship.y,spaceship.procent(),spaceship.procent());
	}
    
  }


  // move bullets
  for(var i = 0;i < bullets.length;i++)
	{	
		if( bullets[i].x <=0 || bullets[i].x >= 600 || bullets[i].y <= 0 || bullets[i].y >= 600 ) {
			bullets.splice(i,1);
			continue;		
		}
		ctx.drawImage(bImage,bullets[i].x,bullets[i].y);	
        bullets[i].move();
	}
	for(var f = 0;f < mbullets.length;f++)
	{	
		 mbullets[f].move();
		if( mbullets[f].x <=0 || mbullets[f].x >= 600 || mbullets[f].y <= 0 || mbullets[f].y >= 600 ) {
			mbullets.splice(f,1);
			continue;		
		}
		if((checkCollision(spaceship,mbullets[f]) === true)) {
			spaceship.damage();
			ctx.drawImage(cImage,spaceship.x,spaceship.y);
			mbullets.splice(f,1);
			continue;
		}
			
		ctx.drawImage(zImage,mbullets[f].x,mbullets[f].y);	
       
	}
	
	if(bonus.visible === 1) {

			if(bonus.type === 0)
				ctx.drawImage(hImage,bonus.x,bonus.y,bonus.procent(),bonus.procent());
			else if(bonus.type === 1)
				ctx.drawImage(daImage,bonus.x,bonus.y,bonus.procent(),bonus.procent());
			else 
				ctx.drawImage(deImage,bonus.x,bonus.y,bonus.procent(),bonus.procent());	
		

		if(checkCollision(spaceship,bonus) === true) { 
			if(bonus.type === 0)
				spaceship.health += 125 * level;
			else if(bonus.type === 1)
				bulletDamage += 5*level;
			else {
				monsters.splice(0,monsters.length);
				meteorites.splice(0,meteorites.length);
			}

			
		
			ctx.drawImage(cImage,bonus.x,bonus.y);					
   			bonus.kicked();
		}	else {
			; 
		}

		for(var g = 0; g < bullets.length; g++){
		if(checkCollision(bullets[g],bonus) === true) { 
			if(bonus.type === 0)
				spaceship.health += 100 * level;
			else if(bonus.type === 1)
				bulletDamage += 25;
			else {
				monsters.splice(0,monsters.length);
				meteorites.splice(0,meteorites.length);
			}

			
			ctx.drawImage(cImage,bonus.x,bonus.y);					
   			bonus.kicked();
			
 		}

	
		}

	
	
	}	

	if(nms > 0 && monsters.length <= 3) {
		var m = new Monster( 550 , ((Math.random()*1000) % 600)  ,(level)*30);
		monsters.push(m);
		nms --;		
	}

	if(nme > 0 && meteorites.length <= 3) {
		meteorites.push(new Meteorite( 550 , ((Math.random()*100) % 600)  ,(level/2)*20));	
		nme --;	
	}

  for(var i = 0;i < monsters.length;i++)
	{	
		if( monsters[i].health <= 0 ) {
			ctx.drawImage(cImage,monsters[i].x,monsters[i].y,monsters[i].procent(),monsters[i].procent());			
			monsters.splice(i,1);
			continue;
		}
		
        monsters[i].move();
		ctx.drawImage(msImage,monsters[i].x,monsters[i].y,monsters[i].procent(),monsters[i].procent());	
		
		

		for(var j = 0; j < bullets.length; j++){
			if(checkCollision(monsters[i],bullets[j]) === true) {
				bullets.splice(j,1);
				monsters[i].damage();
				ctx.drawImage(cImage,monsters[i].x,monsters[i].y,monsters[i].procent(),monsters[i].procent());
			}
		}

		if(checkCollision(spaceship,monsters[i]) === true) {
			for(var o = 0; o < (monsters[i].health) / 10 + 1; o++)
				spaceship.damage();
			ctx.drawImage(cImage,spaceship.x,spaceship.y);
			monsters.splice(i,1); 
		}

		
	}

	for(var k = 0; k <meteorites.length; k++) {

		if(meteorites[k].health <= 0) {
			ctx.drawImage(cImage,meteorites[k].x,meteorites[k].y,meteorites[k].procent(),meteorites[k].procent());			
			meteorites.splice(k,1);
			continue;
		}

		meteorites[k].move();		
		ctx.drawImage(meImage,meteorites[k].x,meteorites[k].y,meteorites[k].procent(),meteorites[k].procent());
		
		if(checkCollision(spaceship,meteorites[k]) === true) {
			spaceship.health -= meteorites[k].health;
			ctx.drawImage(cImage,spaceship.x,spaceship.y);
			meteorites.splice(k,1); 
			continue;
		}
		
		for(var t = 0; t < bullets.length; t++){
			if(checkCollision(meteorites[k],bullets[t]) === true) {
				bullets.splice(t,1);
				meteorites[k].damage();
				ctx.drawImage(cImage,meteorites[k].x,meteorites[k].y,meteorites[k].procent(),meteorites[k].procent());
			}

		}

	}

	ctx.fillStyle = "#000000";
	if(spaceship.health > 0)
		ctx.fillText('Viata: ' + spaceship.health + ' Nivel: ' + level + ' Gloante ramase: ' + (15 - bullets.length)
+ ' Monstri ramasi: ' + (nms + monsters.length) + ' Meteoriti ramasi: ' + (nme + meteorites.length),10,620);  
	else
		ctx.fillText('Viata: ' + 0 + ' Nivel: ' + level + ' Gloante ramase: ' + (15 - bullets.length)
+ ' Monstri ramasi: ' + monsters.length + ' Meteoriti ramasi: ' + meteorites.length,10,620); 

  setTimeout( draw, 50 );
}


function checkCollision(obj1,obj2) {
	var result = false;
	

	if(obj1.x < obj2.x && (obj1.x + obj1.procent()) > obj2.x) {
		if(obj1.y < obj2.y && (obj1.y + obj1.procent()) > obj2.y)
			result = true;
		else if(obj1.y > obj2.y && (obj1.y + obj1.procent()) < obj2.y)
			result =  true;

	}	

	if(obj2.x < obj1.x && (obj2.x + obj2.procent()) > obj1.x) {
		if(obj2.y < obj1.y && (obj2.y + obj2.procent()) > obj1.y)
			result =  true;
		else if(obj2.y > obj1.y && (obj2.y + obj2.procent()) < obj1.y)
			result = true;

	}


	return result;
}

function newLevel() {
level ++;
spaceship.x = 30;
spaceship.y = 30;
nms = nme = level;
bullets.splice(0,bullets.length);
mbullets.splice(0,mbullets.length);
bonus.kicked();

if(level !== 1) {
alert('Bravo! Ai trecut la nivelul:' + level +' !');
spaceship.health += level*20;
}
up = down = right = left = fire = false;
}






// ***** document#ready
$(document).ready(function(){ 
   canvas =	document.getElementById("gameCanvas");

   ctx    = canvas.getContext('2d');
   
sImage.addEventListener("load", function(){
          
iL++;

        }, false);
lsImage.addEventListener("load", function(){
          
iL++;

        }, false);
lsImage2.addEventListener("load", function(){
          
iL++;

        }, false);
lsImage3.addEventListener("load", function(){
          
iL++;

        }, false);
bImage.addEventListener("load", function(){
          
iL++;

        }, false);
meImage.addEventListener("load", function(){
            
iL++;

        }, false);
msImage.addEventListener("load", function(){
           
iL++;

        }, false);
cImage.addEventListener("load", function(){
           
iL++;

        }, false);
zImage.addEventListener("load", function(){
         
iL++;

        }, false);
sImage3.addEventListener("load", function(){
           
iL++;

        }, false);
baImage.addEventListener("load", function(){
         
iL++;

        }, false);
sImage2.addEventListener("load", function(){
       
iL++;

        }, false);
lImage.addEventListener("load", function(){
prepareGame();

        }, false);
daImage.addEventListener("load", function(){
iL ++;

        }, false);
deImage.addEventListener("load", function(){
iL ++;

        }, false);
hImage.addEventListener("load", function(){
iL ++;

        }, false);
  
canvas.onclick = function (e) {
	
	if((e.pageX >= 200 && e.pageX <= 320) && (e.pageY >= 500 && e.pageY <= 640) && iL >=14) {
		canvas.onclick = function () {};
		draw();
		bonus.start();
	}	

}

$(window).keypress (function(e) {
      	        if(e.charCode === 119 ) {
			up = true;
		}  
			
		if(e.charCode === 115) {
			down = true;		
		}
      
		if(e.charCode === 97) {
			left = true;
			isToRight = false;
		}

		if(e.charCode === 100 ) {
			right = true;
			isToRight = true;
		}	
		
		if(e.charCode === 32) {

			fire = true;

		}	
		e.preventDefault();

    });

$(document).keyup( function(e) {


	        if(e.keyCode === 87 ) {
			up = false;
		}  
			
		if(e.keyCode === 83) {
			down = false;		
		}
      
		if(e.keyCode === 65) {
			left = false;
		}

		if(e.keyCode === 68 ) {
			right = false;
		}	
		
		if(e.keyCode === 32) {
			fire = false;
		}

		e.preventDefault();

}

);

level = 0;

});

function moveSpaceship() {

	if(up === true && spaceship.y  > 0)
		spaceship.addY(-10);
	if(down === true && spaceship.y  < 540)
		spaceship.addY(10);
	if(right === true && spaceship.x  < 560)
		spaceship.addX(10);
	if(left === true && spaceship.x > 0)
		spaceship.addX(-10);
	if(fire === true)
		launchNewBullet();



}

function prepareGame() {
ctx.drawImage(lImage,0,0,600,640);
}
// **** document#ready end


