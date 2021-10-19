import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { render } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.1 }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let i = 0; i < nrows; i++) {
			let col = [];
			for (let j = 0; j < ncols; j++) {
				col.push(Math.random() <= chanceLightStartsOn);
			}
			initialBoard.push(col);
		}
		console.log(initialBoard);
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		for (let i = 0; i < nrows; i++) {
			if (!board[i].every((flipped) => flipped)) return false;
		}
		return true;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);

			const flipCell = (row, col, boardCopy) => {
				// if this coord is actually on board, flip it

				if (col >= 0 && col < ncols && row >= 0 && row < nrows) {
					boardCopy[row][col] = !boardCopy[row][col];
				}

				if (col - 1 >= 0 && col - 1 < ncols && row >= 0 && row < nrows) {
					boardCopy[row][col - 1] = !boardCopy[row][col - 1];
				}

				if (col + 1 >= 0 && col + 1 < ncols && row >= 0 && row < nrows) {
					boardCopy[row][col + 1] = !boardCopy[row][col + 1];
				}

				if (col >= 0 && col < ncols && row - 1 >= 0 && row - 1 < nrows) {
					boardCopy[row - 1][col] = !boardCopy[row - 1][col];
				}

				if (col >= 0 && col < ncols && row + 1 >= 0 && row + 1 < nrows) {
					boardCopy[row + 1][col] = !boardCopy[row + 1][col];
				}

				// return boardCopy;
				return boardCopy;
			};

			// TODO: Make a (deep) copy of the oldBoard
			let newBoard = [...oldBoard];
			// TODO: in the copy, flip this cell and the cells around it
			newBoard = flipCell(y, x, newBoard);

			// TODO: return the copy
			return newBoard;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon())
		return (
			<div>
				<h1>You Won!</h1>
			</div>
		);
	// TODO

	// make table board
	return (
		<table>
			<tbody>
				{board.map((row, i) => {
					return (
						<tr key={`row-${i}`}>
							{row.map((cell, j) => {
								return (
									<Cell
										flipCellsAroundMe={(evt) => flipCellsAround(`${i}-${j}`)}
										isLit={cell}
										key={`${i}-${j}`}
									/>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
	// TODO
}

export default Board;
