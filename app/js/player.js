class Player {
	constructor(ws) {
		this.bindKeyboardControls();
		this.bindButtonControls();
		this.side = '';
		this.ws = ws;
	}
	bindKeyboardControls() {
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
	bindButtonControls() {
		const upButton = document.getElementById('upButton');;
		const downButton = document.getElementById('downButton');;
	
		upButton.onclick = () => {
			this.ws.send(JSON.stringify({
				type: 'move',
				direction: 'UP',
				side: this.side,
			}));	
		}
		downButton.onclick = () => {
			this.ws.send(JSON.stringify({
				type: 'move',
				direction: 'DOWN',
				side: this.side,
			}));	
		}
	}
	setSide(side) {
		this.side = side;
	}
}

export default Player;