// Game Module
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_winningPositions;
const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));
class Game {
    constructor(playerOne, playerTwo, gameBoard, cells) {
        // private data
        _Game_winningPositions.set(this, [
            ['c1', 'c2', 'c3'],
            ['c4', 'c5', 'c6'],
            ['c7', 'c8', 'c9'],
            ['c1', 'c4', 'c7'],
            ['c2', 'c5', 'c8'],
            ['c3', 'c6', 'c9'],
            ['c1', 'c5', 'c9'],
            ['c3', 'c5', 'c7']
        ]);
        this.playerOne = Object.assign(Object.assign({}, playerOne), { score: 0, moves: [] });
        this.playerTwo = Object.assign(Object.assign({}, playerTwo), { score: 0, moves: [] });
        this.currentPlayer = this.playerOne;
        this.gameBoard = gameBoard;
        this.cells = cells;
        this.playing = false;
    }
    init() {
        this.reset();
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (cell.innerHTML > '') {
                    return;
                }
                this.play(cell);
            }, false);
        });
    }
    play(element) {
        if (this.playing) {
            return;
        }
        if (element.innerHTML > '') {
            return;
        }
        this.playing = true;
        element.innerHTML = this.currentPlayer.image;
        this.currentPlayer.moves.push(element.id);
        sleep(200).then(() => {
            this.checkMove(this.currentPlayer);
            this.showCurrentPlayer();
            this.playing = false;
        });
    }
    softReset() {
        this.playing = false;
        this.updateUI();
        this.playerOne.moves = [];
        this.playerTwo.moves = [];
        this.currentPlayer = this.playerOne;
        this.clearBoard();
        this.showCurrentPlayer();
    }
    checkMove(player) {
        const cellsLeft = this.cells.find(cell => cell.innerHTML <= '');
        if (!cellsLeft) {
            this.softReset();
            return;
        }
        const booleanArray = [];
        __classPrivateFieldGet(this, _Game_winningPositions, "f").forEach((position) => {
            const presentArray = [];
            position.forEach((cell) => {
                player.moves.indexOf(cell) !== -1 ? presentArray.push(true) : presentArray.push(false);
            });
            const present = presentArray.reduce((acc, current) => acc && current);
            booleanArray.push(present);
        });
        const correct = booleanArray.reduce((acc, current) => acc || current);
        if (!correct) {
            this.togglePlayer();
            return;
        }
        this.currentPlayer.score += 1;
        this.softReset();
    }
    // Reset Players 
    reset() {
        this.playing = false;
        this.playerOne.score = 0;
        this.playerTwo.score = 0;
        this.playerOne.moves = [];
        this.playerTwo.moves = [];
        this.currentPlayer = this.playerOne;
        this.clearBoard();
        this.updateUI();
        this.showCurrentPlayer();
    }
    clearBoard() {
        this.cells.forEach(cell => cell.innerHTML = '');
    }
    // toggling the current player
    togglePlayer() {
        this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
        this.showCurrentPlayer();
    }
    // Show Active Player
    showCurrentPlayer() {
        if (this.currentPlayer === this.playerOne) {
            this.playerOne.element.classList.add('active');
            this.playerTwo.element.classList.remove('active');
        }
        else {
            this.playerOne.element.classList.remove('active');
            this.playerTwo.element.classList.add('active');
        }
    }
    // updating Score UI
    updateUI() {
        this.playerOne.element.querySelector('span').innerHTML = String(this.playerOne.score);
        this.playerTwo.element.querySelector('span').innerHTML = String(this.playerTwo.score);
    }
}
_Game_winningPositions = new WeakMap();
export { Game };
