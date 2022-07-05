
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
        setInterval(_getCurrentGameState, 2000);
        Game.Reversi.initReversi(spelToken, spelerToken);
        //afterInit();
        console.log("game ge-initialiseerd");
    }

    return {
        init: privateInit,
    }
})('/api/game');