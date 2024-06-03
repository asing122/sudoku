import { colors } from "./SudokuBoard";

type BoardProps = {
  initial: number[][];
};
export default function Board({ initial }: BoardProps) {
  return (
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
                defaultValue={cell != 0 ? cell : ""}
                onChange={(e) => {
                  let numberValue = Number.parseInt(e.target.value);
                  if (
                    numberValue <= 9 &&
                    numberValue >= 1 &&
                    e.target.value.match(/^\d+$/) != null
                  ) {
                    initial[index][cellIndex] = Number.parseInt(e.target.value);
                  } else if (
                    (numberValue >= 9 ||
                      e.target.value.match(/^\d+$/) == null) &&
                    e.target.value.match(/\b/) != null &&
                    initial[index][cellIndex] != 0
                  ) {
                    e.target.value = initial[index][cellIndex].toString();
                  } else {
                    e.target.value = "";
                  }
                }}
                className="input-cell"
                readOnly={cell != 0}
                style={cell != 0 ? { cursor: "default" } : {}}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
