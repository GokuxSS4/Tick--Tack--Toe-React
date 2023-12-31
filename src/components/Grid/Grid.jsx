import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true);
  const [grid, setGrid] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function isWin() {
    const possibility = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibility.length; i++) {
      if (
        grid[possibility[i][0]] != "" &&
        grid[possibility[i][0]] == grid[possibility[i][1]] &&
        grid[possibility[i][0]] == grid[possibility[i][2]]
      ) {
        return grid[possibility[i][0]]
      }
    }
    return null
  }

  function play(index) {
    if (turn) {
      grid[index] = "O";
    } else {
      grid[index] = "X";
    }
    const winner = isWin();
    if(winner){
      setWinner(winner);
      toast.success(`Congrats Player:${winner} win!!`);
    }
    setGrid([...grid]);
    setTurn(!turn);
  }

  function resetGame(){
    setTurn(true);
    setWinner(null);
    setGrid(Array(numberOfCards).fill(""));
  }
  return (
    <>
      {winner ? (
        <>
        <h1 className="turn-header">Winner is:{winner}</h1>
        <button className="reset" onClick={resetGame}>Reset Game</button>
        <ToastContainer />
        </>
        
      ) : (
        <h1 className="turn-header">Current Turn:{turn ? "O" : "X"}</h1>
      )}
      <div className="grid">
        {grid.map((value, index) => (
          <Card key={index} onPlay={play} player={value} index={index} gameEnd={winner?true:false} />
        ))}
      </div>
    </>
  );
}
