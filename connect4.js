/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
	constructor(height, width, player1, player2) {
		this.HEIGHT = height;
		this.WIDTH = width;
		this.currPlayer = player1;
		this.otherPlayer = player2;
		this.board = [];
		this.makeBoard();
		this.makeHtmlBoard();
	}
	makeBoard() {
		for (let y = 0; y < this.HEIGHT; y++) {
			const row = [];
			for (let x = 0; x < this.WIDTH; x++) {
				row.push(null);
			}
			this.board.push(row);
		}
	}
	makeHtmlBoard() {
		// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
		const htmlBoard = document.querySelector('#board');
		// TODO: add comment for this code
		// Dynamically create the column tops
		const top = document.createElement('tr');
		top.setAttribute('id', 'column-top');
		top.addEventListener('click', this.handleClick.bind(this));

		for (let x = 0; x < this.WIDTH; x++) {
			const headCell = document.createElement('td');
			headCell.setAttribute('id', x);
			top.append(headCell);
		}
		htmlBoard.append(top);

		// TODO: add comment for this code
		// Dynamically create the HTML Table
		for (let y = 0; y < this.HEIGHT; y++) {
			const row = document.createElement('tr');
			for (let x = 0; x < this.WIDTH; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				row.append(cell);
			}
			htmlBoard.append(row);
		}
	}
	findSpotForCol(x) {
		// TODO: write the real version of this, rather than always returning 0
		for (let y = this.HEIGHT - 1; y >= 0; y--) {
			if (this.board[y][x] === null) {
				return y;
			} else {
				continue;
			}
		}
		return null;
	}
	placeInTable(y, x) {
		// TODO: make a div and insert into correct table cell
		const chip = document.createElement('div');
		chip.style.backgroundColor = this.currPlayer.color;
		chip.classList.add('piece');
		const cell = document.getElementById(`${y}-${x}`);
		console.log(chip);
		cell.append(chip);
		this.board[y][x] = this.currPlayer.color;
		console.log(this.currPlayer.color);
	}
	endGame(msg) {
		// TODO: pop up alert message
		alert(msg);
	}
	handleClick(evt) {
		// check for Game already won
		if (this.checkForWin()) {
			return this.endGame.bind(this, `Game is already won!`);
		}

		// get x from ID of clicked cell
		const x = +evt.target.id;
		// get next spot in column (if none, ignore click)
		const y = this.findSpotForCol(x);
		if (y === null) {
			return;
		}

		// place piece in board and add to HTML table
		// TODO: add line to update in-memory board
		this.placeInTable(y, x);

		// check for win
		if (this.checkForWin()) {
			return this.endGame(`Player ${this.currPlayer} won!`);
		}
		// check for tie
		// TODO: check if all cells in board are filled; if so call, call endGame
		const checkFull = () => {
			return this.board.every(function(value) {
				return value.every(function(spot) {
					return spot !== null;
				});
			});
		};
		if (checkFull()) {
			this.endGame('BOARD IS FULL!');
		}
		// switch players
		// TODO: switch currPlayer 1 <-> 2
		[ this.currPlayer, this.otherPlayer ] = [ this.otherPlayer, this.currPlayer ];
	}
	checkForWin() {
		console.log(this);
		const _win = (cells) => {
			// Check four cells to see if they're all color of current player
			//  - cells: list of four (y, x) cells
			//  - returns true if all are legal coordinates & all match currPlayer
			return cells.every(([ y, x ]) => {
				return (
					y >= 0 && y < this.HEIGHT && x >= 0 && x < this.WIDTH && this.board[y][x] === this.currPlayer.color
				);
			});
		};

		// TODO: read and understand this code. Add comments to help you.

		for (let y = 0; y < this.HEIGHT; y++) {
			for (let x = 0; x < this.WIDTH; x++) {
				// for each item in the table, get a list of that items coordinates and the next three in the horiz, vert, diagR and diagL direction
				const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
				const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
				const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
				const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];
				// check if any of these directional lists of four coordinates constitutes a win using the _win function
				if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
					return true;
				}
			}
		}
	}
}
class Player {
	constructor(color) {
		this.color = color;
	}
}

const startButton = document.querySelector('#start');

startButton.addEventListener('click', function() {
	const firstColor = document.querySelector('#p1').value;
	console.log(firstColor);
	const secondColor = document.querySelector('#p2').value;

	const firstPlayer = new Player(firstColor);
	const secondPlayer = new Player(secondColor);
	const table = document.querySelector('#board');
	table.innerHTML = `<table id="board"></table>`;

	new Game(6, 7, firstPlayer, secondPlayer);
});
