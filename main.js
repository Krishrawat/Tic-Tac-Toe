"use strict";

let playerChoice="X";
const gameBoard = (() => {
  let board = [];
  let count = 0;
  let flag = false;
  for (let i = 0; i < 3; i++) {
    let temp = ["", "", ""];
    board.push(temp);
  }
  
  const check = () => {
    let ok = false;
    for (let i = 0; i < 3; i++) {
      ok |=
        board[i][1] === board[i][0] &&
        board[i][1] === board[i][2] &&
        board[i][1] !== "";
      ok |=
        board[1][i] === board[0][i] &&
        board[1][i] === board[2][i] &&
        board[1][i] !== "";
    }
    ok |=
      board[1][1] === board[0][0] &&
      board[1][1] === board[2][2] &&
      board[1][1] !== "";
    ok |=
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[1][1] !== "";

    /*---using set timeout to not immediately execute stuff and erase-----*/
    setTimeout(() => {
      if (ok || count === 9) {
        let result = " ";
        if (ok) {
          result = `Player ${count & 1 ? "X" : "O"} wins!`;
        } else {
          result = "It's a Draw!";
        }
        const resultDiv = document.querySelector(".result");
        resultDiv.innerHTML = result;
        const div = document.querySelector(".outer-body");
        div.className += " blur";
        resultDiv.className = "show-result";
        const body = document.querySelector("body");

        flag = true; // to not add anything on box now!

        /*---reset on clicking anywhere----*/
        body.addEventListener("click", () => {
          const checkIfExist = document.querySelector(".blur");
          if (checkIfExist != null) {
            div.classList.toggle("blur");
            resultDiv.className = "result";
            resultDiv.innerHTML = "";
            erase();
            flag = false;
          }
        });
      }
    });
  };
  const display = (a, b) => {
    const div = document.querySelector(`#col-${a * 10 + b}`);
    div.innerHTML = board[a - 1][b - 1];
  };
  const mark = (a, b) => {
    if (board[a][b] === "" && !flag) {
      board[a][b] = count & 1 ? "O" : "X";
      display(a + 1, b + 1);
      count++;
      check();
    }
  };

  const erase = () => {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        board[i - 1][j - 1] = "";
        display(i, j);
      }
    }
    count = 0;
  };

  const autoMark=()=>{
    let a=Math.floor(Math.random()*3);
    let b=Math.floor(Math.random()*3);
    console.log(a,b);
    mark(a,b);
  }

  return {
    autoMark,
    mark,
    erase,
  };
})();
const box = document.querySelector(".board");
box.addEventListener("click", (e) => {
  if (e.target.className === "box") {
    let id = e.target.id;
    let a = id[id.length - 2];
    let b = id[id.length - 1];
    gameBoard.mark(a - 1, b - 1);
  }
});
const erase = document.querySelector(".restart");
erase.addEventListener("click", (e) => {
  gameBoard.erase();
});
const options = document.querySelector(".options");
options.addEventListener("click", (e) => {
  let divClassName=e.target.className;
  if(divClassName==="option-X" && playerChoice==="O"){
    gameBoard.erase();
    playerChoice="X";
  }
  else if(divClassName==="option-O" && playerChoice==="X"){
    gameBoard.erase();
    gameBoard.autoMark();
    playerChoice="O"
  }
});