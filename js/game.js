
const Game = (function () {

/*
    let stateMap = {
        gameState: 0,
    }
*/
    const _getCurrentGameState = function() {
        Game.Data.stateMap.gameState = Game.Model.getGameState();
    }



    const privateInit = function(spelToken, spelerToken){
        console.log("spelToken", spelToken);
        //add buttons
        Game.Buttons.addButtons(spelToken, spelerToken);

        //add board
        Game.Reversi.initReversi(spelToken, spelerToken);

        //set interval
        setInterval(() => Game.Reversi.updateBoard(), 1000);

        //afterInit();
        console.log("game ge-initialiseerd");
    }

    return {
        init: privateInit,
    }
})('/api/game');