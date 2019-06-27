const canvasElement = document.getElementById('gameCanvas');
if(!canvasElement) throw "canvas does not exits.";

const getCanvasContext = () => {
	return canvasElement.getContext("2d");
}

const scoresElement = document.getElementById('scores');
if(!scoresElement) throw "canvas does not exits.";

const updateScore = (data) => {
	if(scoresElement.innerHTML !== `Player One: ${data.p1.score} || Player Two: ${data.p2.score}`) {
		scoresElement.innerHTML = `Player One: ${data.p1.score} || Player Two: ${data.p2.score}`;
	}
}

export {
	canvasElement,
	getCanvasContext,
	scoresElement,
	updateScore
};