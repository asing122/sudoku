import { Sudoku } from "./logic/Sudoku";
import SudokuBoard, { Board } from "./display/SudokuBoard";

export default function Main() {
  let sudoku = new Sudoku();
  let board: number[][] = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
    let box = sudoku.mat.filter((item) => item.box == value).map((x) => x.num);
    board.push(box);
  });

  let initial: Board[][] = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
    let box = sudoku.mat.filter((item) => item.box == value);
    initial.push(box);
  });
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      let number = Math.floor(Math.random() * 2);
      if (number != 1) {
        initial[x][y].num = 0;
      }
    }
  }

  return <SudokuBoard originalBoard={board} initialBoard={initial} />;
}
