const canvasElement = document.getElementById('gameCanvas');
const scoresElement = document.getElementById('scores');
const gameView = document.getElementById('gameView');
const introView = document.getElementById('introView');
const joinView = document.getElementById('joinView');
const joinButton = document.getElementById('joinGameButton');
const showJoinViewButton = document.getElementById('showJoinViewButton');
const createButton = document.getElementById('createGameButton');
const roomIdInput = document.getElementById('roomIdInput');

if(!canvasElement) throw "canvasElement does not exits.";
if(!scoresElement) throw "scoresElement does not exits.";
if(!gameView) throw "gameView does not exits.";
if(!introView) throw "introView does not exits.";

const getCanvasContext = () => {
	return canvasElement.getContext("2d");
}

const updateScore = (data) => {
	const template = `<span>${data.p1.score}</span><span>VS</span><span>${data.p2.score}</span>`
	if(scoresElement.innerHTML !== template) {
		scoresElement.innerHTML = template;
	}
}

const updateView = (newView) => {
	switch(newView) {
		case 'game':
			introView.style.display = 'none';
			joinView.style.display = 'none';
			gameView.style.display = 'flex';
			break;
		case 'join':
			introView.style.display = 'none';
			gameView.style.display = 'none';
			joinView.style.display = 'flex';
			break;
		default:
			break;
	}
}

export {
	canvasElement,
	gameView,
	introView,
	joinView,
	joinButton,
	showJoinViewButton,
	createButton,
	getCanvasContext,
	scoresElement,
	updateScore,
	updateView,
	roomIdInput
};