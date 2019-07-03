const canvasElement = document.getElementById('gameCanvas');
if(!canvasElement) throw "canvas does not exits.";

const getCanvasContext = () => {
	return canvasElement.getContext("2d");
}

const scoresElement = document.getElementById('scores');
if(!scoresElement) throw "canvas does not exits.";

const updateScore = (data) => {
	const template = `<span>${data.p1.score}</span><span>VS</span><span>${data.p2.score}</span>`
	if(scoresElement.innerHTML !== template) {
		scoresElement.innerHTML = template;
	}
}

export {
	canvasElement,
	getCanvasContext,
	scoresElement,
	updateScore
};