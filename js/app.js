let app = {

    el: {
        body: null,
        nameBx: null,
        container: null,
        playerBx: [],
        board: null,
        cross: null,
        circle: null,

        form: null,
        firstLabel: null,
        firstInputBx: null, 
        firstInput: null,
        secondInputBx: null,
        secondLabel: null,
        secondInput: null,
        submitBtn: null,
        
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
    },

    mQueries:{
        desktop: window.matchMedia('max-width: 1600px'),
        phones: window.matchMedia('(max-width: 980px)'),
    },
    
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
    gameEnd: false,
    winMessage:null,
    draw: false,

    init(){
        app.createPlayerBx();
        app.submitBtnHandler();
    },

    createPlayerBx(){
        app.el.body = document.querySelector('.body');
        app.el.nameBx = document.querySelector('.nameBx');
        app.el.container = document.querySelector('.container');

        app.el.form = document.createElement('form');
        app.el.form.classList.add('form');

        app.el.firstInputBx = document.createElement('div');
        app.el.firstInputBx.classList.add('inputBx');
        
        app.el.firstLabel = document.createElement('label');
        app.el.firstLabel.textContent = 'Joueur 1';
        app.el.firstLabel.classList.add('label');

        app.el.firstInput = document.createElement('input');
        app.el.firstInput.classList.add('input');
        app.el.firstInput.setAttribute('id', 'playerOne');
        app.el.firstInput.type = 'text';
        app.el.firstInput.name = 'players';
        app.el.firstInput.autocomplete = 'off';

        app.el.secondInputBx = document.createElement('div');
        app.el.secondInputBx.classList.add('inputBx');
        
        app.el.secondLabel = document.createElement('label');
        app.el.secondLabel.textContent = 'Joueur 2';
        app.el.secondLabel.classList.add('label');

        app.el.secondInput = document.createElement('input');
        app.el.secondInput.classList.add('input');
        app.el.secondInput.setAttribute('id', 'playerTwo');
        app.el.secondInput.type = 'text';
        app.el.secondInput.name = 'players';
        app.el.secondInput.autocomplete = 'off';

        app.el.submitBtn = document.createElement('button');
        app.el.submitBtn.textContent = 'Valider';
        app.el.submitBtn.classList.add('button');
        app.el.submitBtn.type = 'button';
        app.el.submitBtn.value = 'submit';
        app.displayNameBx();
    },


    displayNameBx(){
        app.el.body.insertBefore(app.el.nameBx, app.el.container);
        app.el.nameBx.append(app.el.form);
        app.el.form.append(app.el.firstInputBx);
        app.el.firstInputBx.append(app.el.firstLabel, app.el.firstInput);
        app.el.form.append(app.el.secondInputBx);
        app.el.secondInputBx.append(app.el.secondLabel, app.el.secondInput);
        app.el.form.append(app.el.submitBtn);
    },

    submitBtnHandler(){
        app.el.secondInput.addEventListener('keyup', (e) =>{
            if(e.keyCode === 13){
                app.getPlayersName(e);
            }
        });
        app.el.submitBtn.addEventListener('click', app.getPlayersName);
    },

    disablePlayerBx(){
        app.el.nameBx.remove();
    },

    getPlayersName(event){
        event.preventDefault();
        let firstInput = document.querySelector('#playerOne');
        let secondInput = document.querySelector('#playerTwo');
        app.playerOne.name = firstInput.value;
        app.playerTwo.name = secondInput.value;

        app.players = [app.playerOne, app.playerTwo];
        app.createBoard();
        app.createPlayerNames();
        app.disablePlayerBx();
    },

    createPlayerNames(){
        app.el.playerBx[0] = document.createElement('div');
        app.el.playerBx[0].classList.add('playerBx');
        app.el.playerBx[1] = document.createElement('div');
        app.el.playerBx[1].classList.add('playerBx');

        app.displayPlayerNames();

        let playerOneName = document.createElement('h3');
        playerOneName.classList.add('playerNames__title');
        playerOneName.setAttribute('id', 'playerTwoName');
        playerOneName.textContent = `${app.playerOne.name}`;
        app.el.playerBx[0].append(playerOneName);

        let playerTwoName = document.createElement('h3');
        playerTwoName.classList.add('playerNames__title');
        playerTwoName.setAttribute('id', 'playerTwoName');
        playerTwoName.textContent = `${app.playerTwo.name}`;
        app.el.playerBx[1].append(playerTwoName);

        app.createScoreTables();
    },

    displayPlayerNames(){
        if(app.mQueries.phones.matches){
            app.el.container.append(app.el.playerBx[0]);
            app.el.container.append(app.el.playerBx[1]);
        }
        else{
            app.el.container.insertBefore(app.el.playerBx[0], app.el.board);
            app.el.container.insertBefore(app.el.playerBx[1], app.el.board.nextSibling);    
        }
        
    },

    createBoard(){
        app.el.board = document.querySelector('.board');
        app.el.board.classList.add('c-morpion');
        let row = 3;
        let cells = 3;
        let nCell = -1;

        for(let rowIndex = 0; rowIndex < row; rowIndex++){
            let nRow = document.createElement('div');
            nRow.classList.add('row');
            app.el.board.append(nRow);

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

        app.el.container.insertBefore(app.el.board, app.el.playerBx[1]);
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
        app.cellIndex.forEach(elm => {
            elm.addEventListener('click', app.turns);
        });
    },

    turns(event){
        let cell = event.target;
        if(cell.isChecked === false && app.gameEnd === false){
            console.log(app.winCheck);
            if(app.playerOne.getsToPlay === true){
                app.el.cross = app.createCross();
                cell.append(app.el.cross);
                cell.isChecked = true;
                app.playerOne.cellSequence.push(cell.value);
                app.playerOne.getsToPlay = false;
                app.playerTwo.getsToPlay = true;
            }
            else{
                app.el.circle = app.createCircle();
                cell.append(app.el.circle);
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
            return ar.every(function(elm) {
                return playerSeq.indexOf(elm) != -1;
            });
        });
        if(app.winCheck === true){
            app.gameEnd = true;
            app.youWin(player);
        }
        else if(app.winCheck === false && app.checkedCells === 9){
            app.gameEnd = true;
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
        app.el.body.insertBefore(app.winMessage, app.el.container);
        window.setTimeout(app.replay, 2000);
    },

    createScoreTables(){
        app.el.playerBx.forEach(bx => {
            app.el.scoreBx = document.createElement('div');
            app.el.scoreBx.classList.add('scoreBx');
            bx.append(app.el.scoreBx);

            app.el.scoreTable = document.createElement('table');
            app.el.scoreTable.classList.add('scoreTable');
            app.el.tableHead = document.createElement('thead');
            app.el.tableHead.classList.add('tableHead');
            app.el.headRow = document.createElement('tr');
            app.el.headRow.classList.add('headRow');
            app.el.tableHead.append(app.el.headRow);
            app.el.nPartieHeader = document.createElement('th');
            app.el.nPartieHeader.scope = 'col';
            app.el.nPartieHeader.classList.add('headTableCell');
            app.el.scoreHeader = document.createElement('th');
            app.el.scoreHeader.scope = 'col';
            app.el.scoreHeader.classList.add('headTableCell');
            app.el.scoreHeader.textContent = 'Score';

            app.el.tableBody = document.createElement('tbody');
            app.el.tableBody.classList.add('tableBody');
            app.el.scoreBx.append(app.el.scoreTable);
            app.el.headRow.append(app.el.nPartieHeader, app.el.scoreHeader);
            app.el.scoreTable.append(app.el.tableHead, app.el.tableBody);
            app.el.tableBodies.push(app.el.tableBody);
        });
    },
    
    displayScores(){
        app.players.forEach(player => {
            player.scores.forEach(obj => {
                app.el.tableRow = document.createElement('tr');
                app.el.tableRow.classList.add('tableRow');

                let partieCell = document.createElement('td');
                partieCell.classList.add('tableCell');
                partieCell.style.textAlign = 'left';
                partieCell.textContent = `Partie ${obj.partie}`;
                
                let scoreCell = document.createElement('td');
                scoreCell.classList.add('tableCell');
                scoreCell.textContent = obj.score;

                app.el.tableRow.append(partieCell, scoreCell);
                player.rows.push(app.el.tableRow);
            });
        });
        app.playerOne.rows.forEach(row => {
            app.el.tableBodies[0].append(row);    
        });
        app.playerTwo.rows.forEach(row =>{
            app.el.tableBodies[1].append(row);
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
        app.checkedCells = 0;
        app.draw = false;
        app.players.forEach(player =>{
            player.cellSequence = [];
            player.currentScore = 0;
            player.rows = [];
        });
        app.winCheck = false;
        app.el.tableBodies[0].textContent = '';
        app.el.tableBodies[1].textContent = '';
    },
    
    redrawBoard(){
        app.el.board.textContent = '';
        app.winMessage.remove();
        app.winMessage.textContent = '';
        app.createBoard();
        app.displayScores();
        app.gameEnd = false;
    },
};

document.addEventListener('DOMContentLoaded', app.init());