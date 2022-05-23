let form = document.getElementById("formInfo");
form.style.display = "none";

const Player = (name, choice, score) => {
    const getName = name;
    const getChoice = choice;
    const getScore = score;
    let gameboard = Array(9).fill("");
    let cells = document.getElementsByClassName("cell");

    const clearBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
        };
        gameboard = Array(9).fill("");
        const listenMain = document.getElementById("board");
        listenMain.outerHTML = listenMain.outerHTML;
    }

    const display = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = gameboard[i];
        };
    };

    const play = P2 => {
        document.getElementById("board").addEventListener("click", (test) => {
            const index = Array.prototype.indexOf.call(test.target.parentNode.children, test.target);
            let mark = "";
            //CHECK ARRAY FOR # OF BLANKS [INDICATES WHETHER X OR O IS NEXT]
            if (gameboard.filter(String).length % 2 == 0) {
                mark = choice;
            } else {
                mark = P2.getChoice;
            };
            //IF BLANK SQUARE WAS CLICKED...
            if (gameboard[index] == "") {
                //...SET IT TO X or O
                gameboard[index] = mark.toUpperCase();
            };

            if (
                ((gameboard[0] !== "") && (gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2])) ||
                ((gameboard[3] !== "") && (gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5])) ||
                ((gameboard[6] !== "") && (gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8])) ||
                ((gameboard[0] !== "") && (gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6])) ||
                ((gameboard[1] !== "") && (gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7])) ||
                ((gameboard[2] !== "") && (gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8])) ||
                ((gameboard[0] !== "") && (gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8])) ||
                ((gameboard[2] !== "") && (gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6]))
            ) {
                //IF A WIN, DISABLE FURTHER CLICKS IN GRID
                const listenMain = document.getElementById("board");
                listenMain.outerHTML = listenMain.outerHTML;
                let play1 = document.getElementById("P1");
                let play2 = document.getElementById("P2");
                //FIGURE OUT WHO IS WINNER & DISPLAY IT
                let winner = "";
                if (mark == choice) {
                    winner = name;
                    score += 1;
                    play1.innerHTML = `<b>${winner}: "${choice}"</b><br>Score = ${score}`;
                } else {
                    winner = P2.getName;
                    P2.getScore += 1;
                    play2.innerHTML = `<b>${winner}: "${P2.getChoice}"</b><br>Score = ${P2.getScore}`;
                }//DECORATE THE WINNER BOXES, BLUE FOR LEADER, RED FOR TRAILER, GREEN FOR TIE
                if (score > P2.getScore) {
                    play1.style.backgroundColor = "blue";
                    play1.style.boxShadow = '0 0 6px 6px #0ff';
                    play2.style.backgroundColor = "red";
                } else if (P2.getScore > score) {
                    play2.style.backgroundColor = "blue";
                    play1.style.backgroundColor = "red";
                    play2.style.boxShadow = '0 0 6px 6px #0ff';
                } else if (P2.getScore == score) {
                    play1.style.backgroundColor = "green";
                    play2.style.backgroundColor = "green";
                    play1.style.boxShadow = '';
                    play2.style.boxShadow = '';
                };
                //ANNOUNCE WINNER
                setTimeout(function () {
                    //CHECK FOR SCORE = 5
                    if (score >= 5 || P2.getScore >= 5) {
                        play2.innerHTML = `The winner is ${winner} with 5 points.<br><br>To play again hit "RESET" & "START" buttons`;
                        play1.innerHTML = `GAME OVER`;
                        score = P2.getScore = 0;
                        display();
                    }//IF BOTH SCORES < 5 PLAY ON
                    else {
                        clearBoard();
                        play(P2);
                    };
                }, 200);

            } else {//CHECK FOR TIE : GAMEBOARD IS FULL BUT NO WINNER
                if (gameboard.filter(String).length > 8) {
                    setTimeout(function () {
                        let confirmAction = confirm(`TIE GAME<br>Select OK to continue playing`);
                        if (confirmAction) {
                            clearBoard();
                            play(P2);
                        } else {
                            resume();
                        };
                    }, 10);
                }
            }
            display();
        });
    };
    return { play, getName, getChoice, getScore };
}

function startGame() {
    let board = document.getElementById("board");
    form.style.display = "grid";
    board.style.display = "none";
    const start = document.getElementById("start");
    const reset = document.getElementById("reset");
    start.disabled = true;
    reset.disabled = false;
    start.style.cursor = "not-allowed";
    reset.style.cursor = "pointer";
    start.classList.remove("btn");
    reset.classList.add("btn");
    start.classList.remove("blink");
    P1.style.display = "grid";
    P2.style.display = "grid";
}
//FORM: AUTO SET PLAYER 2 GAME PIECE BASED ON PLAYER 1'S CHOICE
let Pl1XO = document.getElementById("Pl1XO");
let Pl2XO = document.getElementById("Pl2XO");
Pl1XO.addEventListener("change", () => {
    if (Pl1XO.value.toUpperCase() == "X") {
        Pl2XO.innerHTML = "O";
    } else {
        Pl2XO.innerHTML = "X";
    }
    Pl2XO.disabled = true;
});

function formSave() {
    //GET VALUES FROM FORM
    let playerName1 = document.getElementById("playerName1").value;
    let playerName2 = document.getElementById("playerName2").value;
    let Pl1XO = document.getElementById("Pl1XO").value.toUpperCase();
    let Pl2XO = document.getElementById("Pl2XO");
    Pl2XO = "";

    if (playerName1 == "" || (Pl1XO != "X" && Pl1XO != "O")) {
        alert("PLAYER 1\nName and/or choice is missing/incorrect");
        return;
    }
    if (playerName2 == "") {
        alert("Player 2 - Please enter your name");
        return;
    }
    if (Pl1XO == "X") {
        Pl2XO = "O";
    } else {
        Pl2XO = "X";
    }//POPULATE THE ANNOUNCE BOARDS WITH PLAYER NAME AND CHOICE
    P1.innerHTML = `${playerName1} <br><br> "${Pl1XO}"`;
    P2.innerHTML = `${playerName2} <br><br> "${Pl2XO}"`;
    form.style.display = "none";
    board.style.display = "grid";
    const player1 = Player(playerName1, Pl1XO, 0);
    const player2 = Player(playerName2, Pl2XO, 0);

    player1.play(player2);
}

function resume() {
    form.style.display = "none";
    board.style.display = "grid";
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    };
    gameboard = Array(9).fill("");
    const listenMain = document.getElementById("board");
    listenMain.outerHTML = listenMain.outerHTML;
    P1.innerHTML = "Player 1";
    P1.style.boxShadow = '';
    P1.style.backgroundColor = "#456bab";
    P2.innerHTML = "Player 2";
    P2.style.boxShadow = '';
    P2.style.backgroundColor = "#456bab";
    start.disabled = false;
    start.classList.add("blink");
    start.style.cursor = "pointer";
    const reset = document.getElementById("reset");
    reset.style.cursor = "not-allowed";
    reset.disabled = true;
    reset.classList.remove("btn");
}