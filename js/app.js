let app = {
    body: null,
    nameBx: null,
    container: null,
    playerBx: [],
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
    
    scoreBx: null,
    scoreTable: null,
    tableHead: null,
    headRow: null,
    nPartieHeader: null,
    scoreHeader: null,
    tableBodies: [],
    tableBody: null,
    tableRows: [],
    tableRow: null,

    
    players: [],
    playerOne: {
        name: '', 
        symbol: 'cross',
        getsToPlay: true,
        cellSequence: [],
        currentScore: 0,
        scores: [],
        rows: [],
    },
    playerTwo: {
        name: '',
        symbol: 'circle',
        getsToPlay: false,
        cellSequence: [],
        currentScore: 0,
        scores: [],
        rows: [],
    },

    cellIndex: [],
    checkedCells: 0,
    nPartie: 0,

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
    winCheck: false,
    draw: false,

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
        app.firstInput.setAttribute('id', 'playerOne');
        app.firstInput.type = 'text';
        app.firstInput.name = 'players';

        app.secondInputBx = document.createElement('div');
        app.secondInputBx.classList.add('inputBx');
        
        app.secondLabel = document.createElement('label');
        app.secondLabel.textContent = 'Joueur 2';
        app.secondLabel.classList.add('label');

        app.secondInput = document.createElement('input');
        app.secondInput.classList.add('input');
        app.secondInput.setAttribute('id', 'playerTwo');
        app.secondInput.type = 'text';
        app.secondInput.name = 'players';

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
        app.secondInput.addEventListener('keyup', (e) =>{
            if(e.keyCode === 13){
                app.getPlayersName(e);
            }
        });
        app.submitBtn.addEventListener('click', app.getPlayersName);
    },

    getPlayersName(event){
        event.preventDefault();
        let firstInput = document.querySelector('#playerOne');
        let secondInput = document.querySelector('#playerTwo');
        app.playerOne.name = firstInput.value;
        app.playerTwo.name = secondInput.value;

        app.players = [app.playerOne, app.playerTwo];
        app.createBoard();
        app.displayPlayerNames();
    },

    displayPlayerNames(){
        app.playerBx[0] = document.createElement('div');
        app.playerBx[0].classList.add('playerBx');
        app.playerBx[1] = document.createElement('div');
        app.playerBx[1].classList.add('playerBx');

        app.container.insertBefore(app.playerBx[0], app.board);
        app.container.insertBefore(app.playerBx[1], app.board.nextSibling);
        
        let playerOneName = document.createElement('h3');
        playerOneName.classList.add('playerNames__title');
        playerOneName.setAttribute('id', 'playerTwoName');
        playerOneName.textContent = `Player One : ${app.playerOne.name}`;
        app.playerBx[0].append(playerOneName);

        let playerTwoName = document.createElement('h3');
        playerTwoName.classList.add('playerNames__title');
        playerTwoName.setAttribute('id', 'playerTwoName');
        playerTwoName.textContent = `Player Two: ${app.playerTwo.name}`;
        app.playerBx[1].append(playerTwoName);

        app.createScoreTables();
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

        app.container.insertBefore(app.board, app.playerBx[1]);
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
            app.checkedCells += 1;
            
            app.players.forEach(player => {
                if(app.checkedCells > 2){
                    app.checkWin(player, player.cellSequence);
                }
            });
        }
    },

    checkWin(player, playerSeq){
        app.winCheck = app.wins.some(function(ar) {
            return ar.every(function(el) {
                return playerSeq.indexOf(el) != -1;
            });
        });
        if(app.winCheck === true){
            app.youWin(player);
        }
        else if(app.winCheck === false && app.checkedCells === 9){
            app.noWin();
        }
    },

    youWin(player){
        let winner = player;
        app.displayWinMessage(winner.name);
        winner.currentScore += 1;
        app.nPartie += 1;

        app.players.forEach(player => {
            let scoreObj = {
                partie: app.nPartie,
                score: player.currentScore, 
            };    
            player.scores.push(scoreObj);
        });

        app.reset();
        app.displayScores();
    },

    noWin(){
        app.nPartie += 1;
        app.players.forEach(player => {
            let scoreObj = {
                partie: app.nPartie,
                score: player.currentScore, 
            };    
            player.scores.push(scoreObj);
        });
        window.setTimeout(app.replay, 2000);
        app.reset();
        app.displayScores();
    },

    displayWinMessage(player){
        app.winMessage = document.createElement('h3');
        app.winMessage.textContent = `${player} wins !`;
        app.winMessage.classList.add('winMessage');
        app.body.insertBefore(app.winMessage, app.container);
        window.setTimeout(app.replay, 5000);
    },

    createScoreTables(){
        app.playerBx.forEach(bx => {
            app.scoreBx = document.createElement('div');
            app.scoreBx.classList.add('scoreBx');
            bx.append(app.scoreBx);

            app.scoreTable = document.createElement('table');
            app.scoreTable.classList.add('scoreTable');
            app.tableHead = document.createElement('thead');
            app.tableHead.classList.add('tableHead');
            app.headRow = document.createElement('tr');
            app.headRow.classList.add('headRow');
            app.tableHead.append(app.headRow);
            app.nPartieHeader = document.createElement('th');
            app.nPartieHeader.scope = 'col';
            app.nPartieHeader.classList.add('headTableCell');
            app.scoreHeader = document.createElement('th');
            app.scoreHeader.scope = 'col';
            app.scoreHeader.classList.add('headTableCell');
            app.scoreHeader.textContent = 'Score';

            app.tableBody = document.createElement('tbody');
            app.tableBody.classList.add('tableBody');
            app.scoreBx.append(app.scoreTable);
            app.headRow.append(app.nPartieHeader, app.scoreHeader);
            app.scoreTable.append(app.tableHead, app.tableBody);
            app.tableBodies.push(app.tableBody);
        });
    },
    
    displayScores(){

        app.players.forEach(player => {
            player.scores.forEach(obj => {
                app.tableRow = document.createElement('tr');
                app.tableRow.classList.add('tableRow');

                let partieCell = document.createElement('td');
                partieCell.classList.add('tableCell');
                partieCell.textContent = `Partie ${obj.partie}`;
                
                let scoreCell = document.createElement('td');
                scoreCell.classList.add('tableCell');
                scoreCell.textContent = obj.score;

                app.tableRow.append(partieCell, scoreCell);
                player.rows.push(app.tableRow);                            
            });
        });
        app.playerOne.rows.forEach(row => {
            app.tableBodies[0].append(row);    
        });
        app.playerTwo.rows.forEach(row =>{
            app.tableBodies[1].append(row);
        });
    },

    replay(){
        let replay = confirm('Voulez-vous rejouer?');
        if(replay === true){
            app.reset();
            app.redrawBoard();
            
        }
    },

    reset(){
        app.click = 0;
        app.checkedCells = 0;
        app.draw = false;
        app.players.forEach(player =>{
            player.cellSequence = [];
            player.currentScore = 0;
            player.rows = [];
        });
        app.winCheck = false;
        app.tableBodies[0].textContent = '';
        app.tableBodies[1].textContent = '';
    },
    
    redrawBoard(){
        app.board.textContent = '';
        app.winMessage.remove();
        app.winMessage.textContent = '';
        app.createBoard();
        app.displayScores();
    },
};

document.addEventListener('DOMContentLoaded', app.init());