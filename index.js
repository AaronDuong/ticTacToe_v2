let board
const playerO = "O"
const playerX = "X"
let currPlayer = playerO
let gameOver = false

board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
]

for (let r = 0; r < 3; r++) {
	for (let c = 0; c < 3; c++) {
		let tile = document.createElement("div")
		tile.id = `${r}-${c}`
		tile.classList.add("tile")

		if (r === 1 || r === 0) {
			tile.classList.add("horizontal-line")
		}
		if (c === 1 || c === 0) {
			tile.classList.add("vertical-line")
		}
		document.getElementById("board").appendChild(tile)
		tile.addEventListener("click", setTile)
	}
}

function setTile() {
	if (gameOver) {
		return
	}
	let [r, c] = this.id.split("-")
	if (board[r][c] === "") {
		board[r][c] = currPlayer
		this.innerText = currPlayer
	} else {
		return
	}

	currPlayer === playerO ? (currPlayer = playerX) : (currPlayer = playerO)

	checkWinner()
}

function checkWinner() {
	// horizontally
	for (let r = 0; r < 3; r++) {
		if (
			board[r][0] === board[r][1] &&
			board[r][1] === board[r][2] &&
			board[r][0] !== ""
		) {
			for (let i = 0; i < 3; i++) {
				let tile = document.getElementById(`${r}-${i}`)
				tile.classList.add("winner")
			}
			gameOver = true
			showWinner()
			return
		}
	}
	//vertically
	for (let c = 0; c < 3; c++) {
		if (
			board[0][c] === board[1][c] &&
			board[1][c] === board[2][c] &&
			board[0][c] !== ""
		) {
			for (let i = 0; i < 3; i++) {
				let tile = document.getElementById(`${i}-${c}`)
				tile.classList.add("winner")
			}
			gameOver = true
			showWinner()
			return
		}
	}
	//diagonally
	if (
		board[0][0] === board[1][1] &&
		board[1][1] === board[2][2] &&
		board[0][0] !== ""
	) {
		for (let i = 0; i < 3; i++) {
			let tile = document.getElementById(`${i}-${i}`)
			tile.classList.add("winner")
		}
		gameOver = true
		showWinner()
		return
	}
	if (
		board[0][2] === board[1][1] &&
		board[1][1] === board[2][0] &&
		board[0][2] !== ""
	) {
		for (let i = 0; i < 3; i++) {
			let tile = document.getElementById(`${i}-${2 - i}`)
			tile.classList.add("winner")
		}
		gameOver = true
		showWinner()
		return
	}
}

function showWinner() {
	let winner = document.querySelector(".winningText")
	currPlayer === playerO ? (currPlayer = playerX) : (currPlayer = playerO)

	winner.innerText = `${currPlayer} wins!`
	let winningModal = document.querySelector("#winningModal")
	winningModal.classList.add("show")

	let resetButton = document.querySelector("#restartButton")
	resetButton.addEventListener("click", resetGame)
}

function resetGame() {
	let winningModal = document.querySelector("#winningModal")
	winningModal.classList.remove("show")
	let tiles = document.querySelectorAll(".tile")
	tiles.forEach((tile) => {
		tile.innerText = ""
		tile.classList.remove("winner")
	})
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]
	gameOver = false
}
