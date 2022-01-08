let app = {
    body: null,
    nameBx: null,
    container: null,
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
    },
    playerTwo: {
        name: '',
        symbol: 'circle',
        getsToPlay: false,
    },


    board: null,
    cell: null,
    nCell: 0,
    cellIndex: [],

    init(){
        app.createPlayerBx();
        app.submitBtnHandler();
        app.displayMorpion();
        app.createBoard();
        app.cellClickHandler();
    },

    createBoard(){
        let row = 3;
        let cells = 3;

        for(let rowIndex = 0; rowIndex < row; rowIndex++){
            let nRow = document.createElement('div');
            nRow.classList.add('row');
            app.board.append(nRow);

            for(let xCell = 0; xCell < cells; xCell++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                nRow.append(cell);
                app.cellIndex.push(cell);
            }    
        }
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

    displayMorpion(){
        app.board = document.querySelector('.c-morpion');
        app.container.append(app.board);
    },


    displayCross(){
        let crossEl = document.createElement('div');
        crossEl.classList.add('cross');
        return crossEl;
    },

    displayCircle(){
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
        if(app.playerOne.getsToPlay === true){
            let cross = app.displayCross();
            cell.append(cross);
            app.playerOne.getsToPlay = false;
            app.playerTwo.getsToPlay = true;
        }
        else{
            let circle = app.displayCircle();
            cell.append(circle);
            app.playerOne.getsToPlay = true;
            app.playerTwo.getsToPlay = false;
        }
    },


};

document.addEventListener('DOMContentLoaded', app.init());