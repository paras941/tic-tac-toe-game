const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function handleClick(e) {
  const cell = e.target;

  
  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    document.querySelector(".header").innerHTML = `🎉 Player <span style="color:rgb(236,79,79)">${currentPlayer}</span> wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    document.querySelector(".header").textContent = "It's a Draw 😅";
    gameActive = false;
    return;
  }


  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.querySelector(".header").innerHTML = `It's <span style="color:rgb(236,79,79)">${currentPlayer}</span>'s turn`;
}


function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}


function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}


function resetGame() {
  setTimeout(() => {
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    currentPlayer = "X";
    gameActive = true;
    document.querySelector(".header").innerHTML = `l e t ' s &nbsp p l a y &nbsp <span style="color:rgb(236,79,79)">T i c T a c T o e </span> ☺️`;
  }, 2000);
}

cells.forEach(cell => {
  cell.addEventListener("click", e => {
    handleClick(e);
    if (!gameActive) resetGame();
  });
});
