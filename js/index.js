import { Game } from './Game.js';
console.log('Using TypeScript');
const gameBoard = document.querySelector('section#game');
const cells = Array.from(gameBoard.children);
const playerOne = document.querySelector('div.pone');
const playerTwo = document.querySelector('div.ptwo');
const resetBtn = document.querySelector('button.reset_btn');
let newGame = null;
console.log(playerOne, playerTwo);
document.addEventListener('DOMContentLoaded', (event) => {
    event.stopPropagation();
    newGame = new Game({
        element: playerOne,
        image: `
            <svg viewBox="0 0 329 329">
               <use href="#X"></use>
            </svg>
         `
    }, {
        element: playerTwo,
        image: `
            <svg viewBox="0 0 367.969 367.969">
               <use href="#O"></use>
            </svg>
         `
    }, gameBoard, cells);
    newGame.init();
});
if (resetBtn) {
    resetBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!newGame)
            return;
        newGame.reset();
    };
}
