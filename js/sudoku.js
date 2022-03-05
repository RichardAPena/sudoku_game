/*

When a move is made such that one of the following condition holds, all conflicting cells will be highlighted usign the `error` CSS class:

- another of the same digit is present elsewhere in the same row
- another of the same digit is present elsewhere in the same column
- another of the same digit is present elsewhere in the same 3x3 block

_**Note**: Be sure to handle the case where the `x` and `y` values are identical.  That would not be a conflict._

*/

function sameBlock(x1, y1, x2, y2) {
   let firstRow = Math.floor(y1 / 3) * 3;
   let firstCol = Math.floor(x1 / 3) * 3;
   return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

function sameRow(x1, y1, x2, y2) {
   return y1 == y2;
}

function sameColumn(x1, y1, x2, y2) {
   return x1 == x2;
}

let selectedNumber = -1;
let lastMoveRow = -1;
let lastMoveCol = -1;

let arrayBoard = [
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1, -1, -1]
];

let hardcodedArrayBoard = [
   [ -1,  1, -1, -1, -1, -1, -1,  9, -1 ],
   [ -1, -1,  4, -1, -1, -1,  2, -1, -1 ],
   [ -1, -1,  8, -1, -1,  5, -1, -1, -1 ],
   [ -1, -1, -1, -1, -1, -1, -1,  3, -1 ],
   [  2, -1, -1, -1,  1, -1,  4, -1, -1 ],
   [ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
   [ -1, -1,  1,  8, -1, -1,  6, -1, -1 ],
   [ -1,  3, -1, -1, -1, -1, -1,  8, -1 ],
   [ -1, -1,  6, -1, -1, -1, -1, -1, -1 ]  
];

function generateBoard(table, data) {
   for (let i=0; i<data.length; i++) {
      let row = table.insertRow();
      for (let j=0; j<data[i].length; j++) {
         let cell = row.insertCell();
         if (data[i][j] == -1) continue;
         let text = document.createTextNode(data[i][j]);
         cell.appendChild(text);
      }
   }
}

let table = document.getElementById("sudoku-board");
let data = hardcodedArrayBoard;
generateBoard(table, data);

let numPalette = document.getElementById("num-palette");
let gameBoard = document.getElementById("sudoku-board");

for (var i = 0; i < numPalette.rows.length; i++) {
   for (var j = 0; j < numPalette.rows[i].cells.length; j++)
      numPalette.rows[i].cells[j].onclick = function () {
      selectNumber(this);
   };
}

for (var i = 0; i < gameBoard.rows.length; i++) {
   for (var j = 0; j < gameBoard.rows[i].cells.length; j++) {
      let cellRow = i;
      let cellCol = j;
      gameBoard.rows[i].cells[j].onclick = function () {
         sudokuCell(this, cellRow, cellCol);
      };
   }
}

function sudokuCell(tableCell, row, col) {
   console.log("Row: " + row + " Col: " + col);
   if (selectedNumber != -1 && tableCell.innerHTML == "") {
      for (let i=0; i<9; i++) {
         for (let j=0; j<9; j++) {
            if (i == row && j == col) continue;
            if (sameBlock(i, j, row, col) || sameColumn(i, j, row, col) || sameRow(i, j, row, col)) {
               return;
            }
         }
      }
      // update the table in the code
      hardcodedArrayBoard[row][col] = selectedNumber;
      tableCell.innerHTML = selectedNumber;
      lastMoveRow = row;
      lastMoveCol = col;

   }
   console.log("Selected cell: " + tableCell.innerHTML);
}

function selectNumber(tableCell) {
   console.log("Selected number: " + tableCell.innerHTML);
   if (tableCell.innerHTML != '<img src="images\\undo.png" class="img-fluid">') {
      selectedNumber = tableCell.innerHTML;
   } else {
      // TODO: do something with this
      gameBoard.rows[lastMoveRow].cells[lastMoveCol].innerHTML = "";
      hardcodedArrayBoard[lastMoveRow][lastMoveCol] = -1;
      console.log("Clicked undo");
   }
}



window.onload = function() {
   console.log("hi");
   // console.log(sudokuBoard);
   console.log(hardcodedArrayBoard[0][0]);
   console.log(hardcodedArrayBoard[0][1]);
   console.log(hardcodedArrayBoard[0][2]);   
};