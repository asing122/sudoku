import { useState } from "react";
import "../../styles/board.css";
import Answers from "./Answers";
import Board from "./BoardDisplay";
import BoardDisplay from "./BoardDisplay";

export type Board = {
  num: number;
  box: number;
  row: number;
  col: number;
};

export type BoardProps = {
  originalBoard: number[][];
  initialBoard: Board[][];
};

export const colors = [
  "#DAB49D",
  "#FD9E72",
  "#F2D492",
  "#A9C5A0",
  "#9DCBBA",
  "#779FA1",
  "#92817A",
  "#96939B",
  "#BFBFBF",
];

export default function SudokuBoard({
  originalBoard,
  initialBoard,
}: BoardProps) {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  return (
    <div className="body" style={{ height: window.innerHeight }}>
      {showAnswers ? (
        <Answers board={originalBoard} />
      ) : (
        <div className="display-items">
          <BoardDisplay initial={initialBoard} />
          <button className="show-answers" onClick={() => setShowAnswers(true)}>
            Show answers
          </button>
        </div>
      )}
    </div>
  );
}
