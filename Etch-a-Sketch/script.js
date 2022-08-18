function fillBoard(size) {
  let grid = document.querySelector(".grid");

  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i <= size * size; i++) {
    let square = document.createElement("div");
    square.style.backgroundColor = "white";
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "black";
    });
    grid.insertAdjacentElement("beforeend", square);
  }
}
fillBoard(16);

function boardSize(input) {
  if (input <= 100 && input >= 2) fillBoard(input);
  else alert("please enter a number between 2 to 100");
}

let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  let grid = document.querySelector(".grid");
  let sqaures = grid.querySelectorAll("div");
  sqaures.forEach((div) => (div.style.backgroundColor = "white"));
});
