import { Board } from "../display/SudokuBoard";
export class Sudoku {
  mat: Board[];
  constructor() {
    let sampleBoardItem: Board = {
      row: 0,
      col: 0,
      box: -1,
      num: 0,
    };
    this.mat = Array.from(
      {
        length: 9 * 9,
      },
      () => sampleBoardItem
    );
    this.fillDiagonal();
    this.fillRemaining(0, 3);
  }

  fillDiagonal() {
    for (let i = 0; i < 9; i += 4) {
      let numbers = shuffleArray(
        Array.from(Array(9).keys()).map((num) => num + 1)
      );
      for (let itemNumber = 0; itemNumber < 9; itemNumber++) {
        let sudokuItem = numbers.pop() || 8;
        let rowNumber = Math.floor(itemNumber / 3) + Math.floor(i / 3) * 3;
        let colNumber = (itemNumber % 3) + Math.floor(i / 3) * 3;
        let boxNumber = i;
        this.mat[rowNumber * 9 + colNumber] = {
          row: rowNumber,
          col: colNumber,
          box: boxNumber,
          num: sudokuItem,
        };
      }
    }
  }

  checkIfSafe(i: number, j: number, num: number) {
    return (
      this.noRowConflict(i, num) &&
      this.noColConflict(j, num) &&
      this.noBoxConflict(Math.floor(i / 3) * 3 + Math.floor(j / 3), num)
    );
  }

  noRowConflict(i: number, num: number) {
    return (
      this.mat.filter((item) => item.row == i && item.num == num).length == 0
    );
  }

  noColConflict(j: number, num: number) {
    return (
      this.mat.filter((item) => item.col == j && item.num == num).length == 0
    );
  }

  noBoxConflict(box: number, num: number) {
    return (
      this.mat.filter((item) => item.box == box && item.num == num).length == 0
    );
  }

  fillRemaining(i: number, j: number): boolean {
    if (i === 8 && j === 9) {
      return true;
    }

    if (j === 9) {
      i += 1;
      j = 0;
    }

    if (this.mat[i * 9 + j].num !== 0) {
      return this.fillRemaining(i, j + 1);
    }

    for (let num = 1; num <= 9; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.mat[i * 9 + j] = {
          row: i,
          col: j,
          box: Math.floor(i / 3) * 3 + Math.floor(j / 3),
          num: num,
        };
        if (this.fillRemaining(i, j + 1)) {
          return true;
        }
        this.mat[i * 9 + j] = {
          row: 0,
          col: 0,
          box: 0,
          num: 0,
        };
      }
    }

    return false;
  }
}

function shuffleArray(array: any[]): any[] {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
