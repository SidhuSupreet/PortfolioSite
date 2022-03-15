console.log('Its working');
/*
	For snake game
*/
const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let velX = 0;
let velY = 0;

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

function drawGame(){
	clearScreen();
	changeSnakePosition();
	drawSnake();
	setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
	console.log("hey");
	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake(){
	ctx.fillStyle = 'green'
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
	headX = headX + velX;
	headY = headY + velY;
}

document.body.addEventListener('keydown', keyDown);
//stops arrow keys from scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function keyDown(event){
	//up
	if(event.keyCode == 38){
		if (velY == 1)
			return;
		velY = -1;
		velX = 0;
	}
	//down
	if(event.keyCode == 40){
		if (velY == -1)
			return;
		velY = 1;
		velX = 0;
	}
	//down
	if(event.keyCode == 37){
		if (velX == 1)
			return;
		velY = 0;
		velX = -1;
	}
	//down
	if(event.keyCode == 39){
		if (velX == -1)
			return;
		velY = 0;
		velX = 1;
	}
}

drawGame();