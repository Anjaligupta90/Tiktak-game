const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".gameinfo");
const newgamebtn = document.querySelector(".btn");

let currentplayer;
let gamegrid;

const winningposition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initializegame() {
    currentplayer = "x";
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        box.classList.remove("win"); // Remove winning class on new game
        box.style.pointerEvents = "auto"; // Enable clicks on boxes
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText = `Current player: ${currentplayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    });
});

function handleclick(index) {
    if (gamegrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        if (!checkgameover()) { // Only change player if the game is not over
            changeplayer();
        }
    }
}

function changeplayer() {
    currentplayer = currentplayer === "x" ? "o" : "x";
    gameinfo.innerText = `Current player: ${currentplayer}`;
}

function checkgameover() {
    let ans = "";
    winningposition.forEach((position) => {
        if ( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")&&(gamegrid[position[0]] ===gamegrid[position[1]])&&(gamegrid[position[1]]===gamegrid[position[2]]) )
             {
            ans = gamegrid[position[0]];

            // Disable further clicks
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            // Highlight winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (ans !== "") {
        gameinfo.innerText = `Winner is: ${ans}`;
        newgamebtn.classList.add("active");
        return true;

    }

    // Check for draw
    if (!gamegrid.includes("")) {
        gameinfo.innerText = "It's a draw!";
        newgamebtn.classList.add("active");
        return true;
    }
    return false;
}

newgamebtn.addEventListener("click", () => {
    initializegame();
});

// Function call
initializegame();