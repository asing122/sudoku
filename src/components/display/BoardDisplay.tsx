import { useEffect, useState } from "react";
import { colors } from "./SudokuBoard";
import { Board } from "./SudokuBoard";

type BoardProps = {
  initial: Board[][];
};
export default function BoardDisplay({ initial }: BoardProps) {
  const [done, setDone] = useState(false);
  function boardFilled() {
    let completedBoard =
      initial.filter((box) => box.filter((item) => item.num == 0).length > 0)
        .length == 0;

    let flattenBoard: Board[] = [];
    initial.map((box) => box.map((item) => flattenBoard.push(item)));
    if (completedBoard) {
      let allNumbers = Array.from(Array(9).keys())
        .map((item) => item + 1)
        .sort();
      let conflict = false;
      Array.from(Array(9).keys()).map((val) => {
        let rowConflict =
          flattenBoard
            .filter((item) => item.row == val)
            .map((item) => item.num)
            .sort()
            .toString() !== allNumbers.toString();
        let colConflict =
          flattenBoard
            .filter((item) => item.col == val)
            .map((item) => item.num)
            .sort()
            .toString() !== allNumbers.toString();
        let boxConflict =
          flattenBoard
            .filter((item) => item.box == val)
            .map((item) => item.num)
            .sort()
            .toString() !== allNumbers.toString();
        if (rowConflict || colConflict || boxConflict) {
          conflict = true;
        }
      });
      if (!conflict) {
        setDone(true);
      }
    }
  }

  return (
    <>
      {done && (
        <div className="popup">
          <p>Congrats! You finished the game!</p>
        </div>
      )}
      <div className="board">
        {initial.map((box, index) => (
          <div className="grid-box" id={index.toString()}>
            {box.map((cell, cellIndex) => (
              <div
                className="cell-item"
                id={cellIndex.toString()}
                style={{ backgroundColor: colors[index] }}
              >
                <input
                  defaultValue={cell.num != 0 ? cell.num : ""}
                  onChange={(e) => {
                    let numberValue = Number.parseInt(e.target.value);
                    if (
                      numberValue <= 9 &&
                      numberValue >= 1 &&
                      e.target.value.match(/^\d+$/) != null
                    ) {
                      initial[index][cellIndex].num = Number.parseInt(
                        e.target.value
                      );
                    } else if (
                      (numberValue >= 9 ||
                        e.target.value.match(/^\d+$/) == null) &&
                      e.target.value.match(/\b/) != null &&
                      cell.num != 0
                    ) {
                      e.target.value = cell.num.toString();
                    } else {
                      e.target.value = "";
                    }
                    boardFilled();
                  }}
                  className="input-cell"
                  readOnly={initial[index][cellIndex].num != 0}
                  style={
                    initial[index][cellIndex].num != 0
                      ? { cursor: "default" }
                      : {}
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
