let app = {
    body: null,
    nameBx: null,
    container: null,
    playerOneBx: null,
    playerTwoBx: null,
    board: null,
    form: null,
    firstLabel: null,
    firstInputBx: null, 
    firstInput: null,
    secondInputBx: null,
    secondLabel: null,
    secondInput: null,
    submitBtn: null,
    winMessage:null,

    playerOne: {
        name: '', 
        symbol: 'cross',
        getsToPlay: true,
        cellSequence: [],
    },
    playerTwo: {
        name: '',
        symbol: 'circle',
        getsToPlay: false,
        cellSequence: [],
    },

    click: 0,

    cellIndex: [],

    wins: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    init(){
        app.createPlayerBx();
        app.submitBtnHandler();
    },

    createPlayerBx(){
        app.body = document.querySelector('.body');
        app.nameBx = document.querySelector('.nameBx');
        app.container = document.querySelector('.container');

        app.form = document.createElement('form');
        app.form.classList.add('form');

        app.firstInputBx = document.createElement('div');
        app.firstInputBx.classList.add('inputBx');
        
        app.firstLabel = document.createElement('label');
        app.firstLabel.textContent = 'Joueur 1';
        app.firstLabel.classList.add('label');

        app.firstInput = document.createElement('input');
        app.firstInput.classList.add('input');
        app.firstInput.type = 'text';
        app.firstInput.name = 'playerOne';

        app.secondInputBx = document.createElement('div');
        app.secondInputBx.classList.add('inputBx');
        
        app.secondLabel = document.createElement('label');
        app.secondLabel.textContent = 'Joueur 2';
        app.secondLabel.classList.add('label');

        app.secondInput = document.createElement('input');
        app.secondInput.classList.add('input');
        app.secondInput.type = 'text';
        app.secondInput.name = 'playerTwo';

        app.submitBtn = document.createElement('button');
        app.submitBtn.textContent = 'Valider';
        app.submitBtn.classList.add('button');
        app.submitBtn.type = 'button';
        app.submitBtn.value = 'submit';

        app.displayNameBx();
    },

    displayNameBx(){
        app.body.insertBefore(app.nameBx, app.container);
        app.nameBx.append(app.form);
        app.form.append(app.firstInputBx);
        app.firstInputBx.append(app.firstLabel, app.firstInput);
        app.form.append(app.secondInputBx);
        app.secondInputBx.append(app.secondLabel, app.secondInput);
        app.form.append(app.submitBtn);
    },

    submitBtnHandler(){
        app.submitBtn.addEventListener('click', app.getPlayersName);
    },

    getPlayersName(event){
        event.preventDefault();
        let firstInput = document.querySelector('input[name=playerOne]');
        let secondInput = document.querySelector('input[name=playerTwo]');
        app.playerOne.name = firstInput.value;
        app.playerTwo.name = secondInput.value;

        app.createBoard();
        app.displayPlayerNames();
        
    },

    displayPlayerNames(){
        app.playerOneBx = document.createElement('div');
        app.playerOneBx.classList.add('playerBx');
        app.playerTwoBx = document.createElement('div');
        app.playerTwoBx.classList.add('playerBx');

        app.container.insertBefore(app.playerOneBx, app.board);
        app.container.insertBefore(app.playerTwoBx, app.board.nextSibling);
        
        let playerOneName = document.createElement('h3');
        playerOneName.classList.add('playerNames');
        playerOneName.textContent = `Player One : ${app.playerOne.name}`;
        app.playerOneBx.append(playerOneName);

        let playerTwoName = document.createElement('h3');
        playerTwoName.classList.add('playerNames');
        playerTwoName.textContent = `Player Two: ${app.playerTwo.name}`;
        app.playerTwoBx.append(playerTwoName);
    },

    createBoard(){
        app.board = document.querySelector('.board');
        app.board.classList.add('c-morpion');
        let row = 3;
        let cells = 3;
        let nCell = -1;

        for(let rowIndex = 0; rowIndex < row; rowIndex++){
            let nRow = document.createElement('div');
            nRow.classList.add('row');
            app.board.append(nRow);

            for(let xCell = 0; xCell < cells; xCell++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.isChecked = false;
                nCell += 1;
                cell.value = nCell;
                nRow.append(cell);
                app.cellIndex.push(cell);
            }    
        }
        app.displayBoard();
    },
    
    displayBoard(){
        app.container.append(app.board);

        app.cellClickHandler();
    },


    createCross(){
        let crossEl = document.createElement('div');
        crossEl.classList.add('cross');
        return crossEl;
    },

    createCircle(){
        let circleEl = document.createElement('div');
        circleEl.classList.add('circle');
        return circleEl;
    },

    cellClickHandler(){
        app.cellIndex.forEach(el => {
            el.addEventListener('click', app.turns);
        });
    },

    turns(event){
        let cell = event.target;
        if(cell.isChecked === false){
            if(app.playerOne.getsToPlay === true){
                let cross = app.createCross();
                cell.append(cross);
                cell.isChecked = true;
                //compteur d'interaction
                app.click += 1;
                app.playerOne.cellSequence.push(cell.value);
                
                app.playerOne.getsToPlay = false;
                app.playerTwo.getsToPlay = true;
            }
            else{
                let circle = app.createCircle();
                cell.append(circle);

                cell.isChecked = true;
                app.playerTwo.cellSequence.push(cell.value);

                app.playerOne.getsToPlay = true;
                app.playerTwo.getsToPlay = false;
            }
            //calcul condition victoire si joueur 1 à fait au moins 2 mouvements
            if(app.click > 2){
                //lance l'évaluation de la victoire à la fin du tour du joueur
                if(app.playerOne.getsToPlay === false){
                    app.youWin(app.playerOne.name, app.playerOne.cellSequence);
                }
                else if(app.playerTwo.getsToPlay === false){
                    app.youWin(app.playerTwo.name, app.playerTwo.cellSequence);
                }
            }
        }
    },

    youWin(player, playerSeq){
        var winCheck = app.wins.some(function(ar) {
            return ar.every(function(el) {
                return playerSeq.indexOf(el) != -1;
            });
        });
        if (winCheck === true){
            console.log(`${player} Wins !`);
            let winner = player;
            app.displayWinMessage(winner);
            let replay = confirm('Voulez-vous rejouer?');
            if(replay === true){
                app.gameOver();
            }
        }
    },

    displayWinMessage(player){
        app.winMessage = document.createElement('h3');
        app.winMessage.textContent = `${player} wins !`;
        app.winMessage.classList.add('winMessage');
        app.body.insertBefore(app.winMessage, app.container);
    },
    
    gameOver(){
        app.playerOne.cellSequence = [];
        app.playerTwo.cellSequence = [];
        app.redrawBoard();
        app.createBoard();
        app.container.insertBefore(app.board, app.playerTwoBx);
    },

    redrawBoard(){
        app.board.textContent = '';
        app.winMessage.textContent = '';
    },
};

document.addEventListener('DOMContentLoaded', app.init());