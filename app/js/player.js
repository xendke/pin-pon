class Player {
	constructor(ws) {
		this.registerKeyboardHandler();
		this.side = '';
		this.ws = ws;
	}
	registerKeyboardHandler() {
		if(document.onkeydown) console.log('onkeydown exists?');

		document.onkeydown = (e) => {
			const data = {
				type: 'move',
				direction: '',
				side: this.side,
			}

			if (e.keyCode == '38') {
				data.direction = 'UP';
			} else if (e.keyCode == '40') {
				data.direction = 'DOWN';
			}
			if(data.direction !== ''){
				this.ws.send(JSON.stringify(data));
			}
		}
	}
	setSide(side) {
		this.side = side;
	}
}

export default Player;