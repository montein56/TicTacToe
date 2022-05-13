const Player = (name, choice, score) => {
    const getName = () => name;
    const getChoice = () => choice;
    const getScore = score;
    let gameboard = Array(9).fill("");

    const clearBoard = () => {
        let cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
        };
        gameboard = Array(9).fill("");
        const listenMain = document.getElementById("main");
        listenMain.outerHTML = listenMain.outerHTML;
    }

    const display = () => {
        let cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = gameboard[i];
        };
    };

    const play = P2 => {
        document.getElementById("main").addEventListener("click", (test) => {
            let index = Array.prototype.indexOf.call(test.target.parentNode.children, test.target);
            let mark = "";
            //CHECK ARRAY FOR # OF BLANKS [INDICATES WHETHER X OR O IS NEXT]
            if (gameboard.filter(String).length % 2 == 0) {
                mark = choice;
            } else {
                mark = P2.getChoice();
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
                const listenMain = document.getElementById("main");
                listenMain.outerHTML = listenMain.outerHTML;
                //FIGURE OUT WHO IS WINNER
                let winner = "";
                if (mark == choice) {
                    winner = name;
                    score += 1;
                    document.getElementById("P1").innerHTML = `${winner} :\nScore = ${score}`;
                } else {
                    winner = P2.getName();
                    P2.getScore += 1;
                    document.getElementById("P2").innerHTML = `${winner} :\nScore = ${P2.getScore}`;
                }
                if (score > P2.getScore) {
                    document.getElementById("P1").style.backgroundColor = "blue";
                    document.getElementById('P1').style.boxShadow = '0 0 6px 6px #0ff';

                    document.getElementById("P2").style.backgroundColor = "red";
                } else if (P2.getScore > score) {
                    document.getElementById("P2").style.backgroundColor = "blue";
                    document.getElementById("P1").style.backgroundColor = "red";
                    document.getElementById('P2').style.boxShadow = '0 0 6px 6px #0ff';
                } else if (P2.getScore == score) {
                    document.getElementById("P1").style.backgroundColor = "green";
                    document.getElementById("P2").style.backgroundColor = "green";

                    document.getElementById('P1').style.boxShadow = '';
                    document.getElementById('P2').style.boxShadow = '';
                };
                //ANNOUNCE WINNER
                setTimeout(function () {
                    //CHECK FOR SCORE = 5
                    if (score >= 5 || P2.getScore >= 5) {
                        alert(`GAME OVER\nThe winner is ${winner} with 5 points\nTo play again hit "START" button`);
                        score = P2.getScore = 0;
                        display();
                        reset();
                    } else {
                        let confirmAction = confirm(`"${winner} has a point"\nSelect OK to continue playing`);
                        if (confirmAction) {
                            clearBoard();
                            play(P2);
                        } else {
                            clearBoard();
                            document.getElementById("start").disabled = false;
                            document.getElementById("P1").innerHTML = `PLAYER 1`;
                            document.getElementById("P2").innerHTML = `PLAYER 2`;
                        };
                    };
                }, 10);

            } else {//CHECK FOR TIE
                if (gameboard.filter(String).length > 8) {
                    setTimeout(function () {
                        let confirmAction = confirm(`TIE GAME\n Select OK to continue playing`);
                        if (confirmAction) {
                            clearBoard();
                            document.getElementById("start").disabled = true;
                            play(P2);
                            // document.getElementById("main").addEventListener("click", listeningFunc);
                        } else {
                            document.getElementById("P1").innerHTML = `PLAYER 1`;
                            document.getElementById("P2").innerHTML = `PLAYER 2`;
                            clearBoard();
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
    const Pl1 = prompt("FIRST TO SCORE 5 POINTS WINS THE GAME\nPlayer 1:\nYou are 'X'\nEnter Your Name", "PLAYER 1");
    const player1 = Player(Pl1, "X", 0);
    const Pl2 = prompt("Player 2:\nYou are 'O'\nEnter Your Name", "PLAYER 2");
    const player2 = Player(Pl2, "O", 0);

    // P1.innerHTML = P1;
    P1.innerHTML = Pl1;
    P2.innerHTML = Pl2;
    const start = document.getElementById("start");
    const reset = document.getElementById("reset");
    start.disabled = true;
    start.classList.remove("blink");
    start.style.cursor = "not-allowed";
    start.classList.remove("btn");
    reset.style.cursor = "pointer";
    reset.disabled = false;
    reset.classList.add("btn");

    player1.play(player2);
}

function reset() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    };
    gameboard = Array(9).fill("");
    const listenMain = document.getElementById("main");
    listenMain.outerHTML = listenMain.outerHTML;
    // const P1 = document.getElementById("P1");
    P1.innerHTML = "Player 1";
    P1.style.boxShadow = '';
    P1.style.backgroundColor = "#456bab";
    // const P2 = document.getElementById("P2");
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