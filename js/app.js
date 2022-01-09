let app = {
    body: null,
    nameBx: null,
    container: null,
    board: null,
    form: null,
    firstLabel: null,
    firstInputBx: null, 
    firstInput: null,
    secondInputBx: null,
    secondLabel: null,
    secondInput: null,
    submitBtn: null,

    playerOne: {
        name: '', 
        symbol: 'cross',
        getsToPlay: true,
        cellSequence: [],
        click: 0,
    },
    playerTwo: {
        name: '',
        symbol: 'circle',
        getsToPlay: false,
        cellSequence: [],
        click: 0,
    },

    cellIndex: [],

    wins: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    init(){
        app.createPlayerBx();
        app.submitBtnHandler();
        app.displayMorpion();
        app.createBoard();
        app.cellClickHandler();
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
        app.displayPlayerNames();
    },

    displayPlayerNames(){
        let playerOneBx = document.createElement('div');
        playerOneBx.classList.add('playerBx');
        let playerTwoBx = document.createElement('div');
        playerTwoBx.classList.add('playerBx');

        app.container.insertBefore(playerOneBx, app.board);
        app.container.insertBefore(playerTwoBx, app.board.nextSibling);
        
        let playerOneName = document.createElement('h3');
        playerOneName.classList.add('playerNames');
        playerOneName.textContent = `Player One : ${app.playerOne.name}`;
        playerOneBx.append(playerOneName);

        let playerTwoName = document.createElement('h3');
        playerTwoName.classList.add('playerNames');
        playerTwoName.textContent = `Player Two: ${app.playerTwo.name}`;
        playerTwoBx.append(playerTwoName);
        
    },

    createBoard(){
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
    },
    
    displayMorpion(){
        app.board = document.querySelector('.c-morpion');
        app.container.append(app.board);
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
                app.playerOne.click += 1;
                cell.hasCross = true;
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
            if(app.playerOne.click > 2){
                if(app.playerOne.getsToPlay === false){
                    app.youWin(1, app.playerOne.cellSequence);
                }
                else if(app.playerTwo.getsToPlay === false){
                    app.youWin(2, app.playerTwo.cellSequence);
                }
            }
        }
    },

    youWin(nPlayer, playerSeq){
        var result = app.wins.some(function(ar) {
            return ar.every(function(el) {
                return playerSeq.indexOf(el) != -1;
            });
        });
        if (result === true){
            alert(`Player ${nPlayer} Wins !`);
        }
    }


};

document.addEventListener('DOMContentLoaded', app.init());