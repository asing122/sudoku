import { colors } from "./SudokuBoard";

type AnswersProps = {
  board: number[][];
};

export default function Answers({ board }: AnswersProps) {
  return (
    <div className="board">
      {board.map((box, index) => (
        <div className="grid-box" id={index.toString()}>
          {box.map((cell, cellIndex) => (
            <div
              className="cell-item"
              id={cellIndex.toString()}
              style={{ backgroundColor: colors[index] }}
            >
              <input
                defaultValue={cell}
                className="input-cell"
                readOnly={true}
                style={{ cursor: "default" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
