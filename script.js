const startValues = {
	spotWidth: 30,
	speed: 3000,
	minSpotWidth: 5,
	minSpeed: 600,
	score: 0,
};

const values = {
	spotWidth: startValues.spotWidth,
	speed: startValues.speed,
	minSpotWidth: startValues.minSpotWidth,
	score: startValues.score,
	minSpeed: startValues.minSpeed,
};

const spot = document.querySelector(".spot");
const pointer = document.querySelector(".pointer");
const scoreContainer = document.querySelector(".score");

var n = 0;
var active = true;

const checkPos = () => {
	leftBound = spot.getBoundingClientRect().left;
	rightBound = spot.getBoundingClientRect().right;
	pointerLeft = pointer.getBoundingClientRect().left + 10;
	if (pointerLeft >= leftBound && pointerLeft <= rightBound) {
		spotWidth = rightBound - leftBound;
		pointerPos = pointerLeft - leftBound;
		if (pointerPos < spotWidth / 2) {
			newScore = 20 + Math.floor((pointerPos / (spotWidth / 2)) * 80);
		} else {
			pointerPos -= spotWidth / 2;
			newScore = 100 - Math.floor((pointerPos / (spotWidth / 2)) * 80);
		}
		return { valid: true, newScore: newScore };
	}
	return { valid: false, newScore: 0 };
};

const increaseScore = (score) => {
	values.score += score;
	console.log(values.score);
	scoreContainer.innerHTML = values.score;
};

const generateSpot = () => {
	var pos = Math.random() * 100;

	if (pos > 50) {
		spot.style.right = 100 - pos + "%";
		spot.style.left = null;
	} else {
		spot.style.left = pos + "%";
		spot.style.right = null;
	}
	spot.style.width = values.spotWidth + "%";
	pointer.style.setProperty("--speed", values.speed + "ms");
	if (n % 2 != 0) {
		updateValues();
	}
	n++;
};

const updateValues = () => {
	values.speed -= 200;
	values.spotWidth -= 1;
	if (values.spotWidth < values.minSpotWidth) {
		values.spotWidth = values.minSpotWidth;
	}
	if (values.speed < values.minSpeed) {
		values.speed = values.minSpeed;
	}
};

const reset = () => {
	values.spotWidth = startValues.spotWidth;
	values.speed = startValues.speed;
	values.score = startValues.score;
	scoreContainer.innerHTML = values.score;
	pointer.style.animationPlayState = "running";
	generateSpot();
};

const stopPointer = () => {
	pointer.style.animationPlayState = "paused";
	checkData = checkPos();
	valid = checkData.valid;
	newScore = checkData.newScore;
	if (valid) {
		active = false;
		increaseScore(newScore);
		setTimeout(() => {
			active = true;
			generateSpot();
			pointer.style.animationPlayState = "running";
		}, 100);
	} else {
		reset();
		alert("Game Over");
	}
};

generateSpot();

document.onkeydown = function (e) {
	if (e.code == "Space" && active) {
		stopPointer();
	}
};
