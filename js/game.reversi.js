Game.Reversi = (function(){

    let configMap = {
        spelToken: "",
        speler: [],
        spel: [],
        colors: ["geen", "wit", "zwart"],
    };

    const setSpel = async function(spelToken, spelerToken) {

        await Game.Api.get(`getSpel`, spelToken).then(json=>{
            console.log("getSpel", json);

            configMap.spel.bord = json.bord;
            configMap.spel.speler1Token = json.speler1Token;
            configMap.spel.speler2Token = json.speler2Token;
            configMap.spel.aandeBeurt = json.aandeBeurt;

        });
        console.log("het spel: ", configMap.spel);
        configMap.spelToken = spelToken;
        configMap.speler.token = spelerToken;
        configMap.speler.color = getColorFromPlayerToken(spelerToken);
        document.getElementById('spelerKleur').innerText = `Jij bent: ${configMap.speler.color}`;
        document.getElementById('beurt').innerText = `${configMap.speler.color[configMap.spel.aandeBeurt] === 1 ? "Wit" : "Zwart"} is aan de beurt.`;
        console.log("color: ", configMap.speler.color);
    }

    const privateInit = async function (spelToken, spelerToken) {
        //set the tokens
        await setSpel(spelToken, spelerToken);

        //place board
        let bord = document.getElementsByClassName('game-board');
        for (let i = 1; i <= configMap.spel.bord.length; i++) {
            for (let j = 1; j <= configMap.spel.bord.length; j++) {
                //set square
                let square = getSquare(i, j);
                bord[0].appendChild(square);
            }
        }
    };

    const getSquare = function(i, j){
        let square = document.createElement('div');
        $(square).addClass('square');
        $(square).attr('data-x', i);
        $(square).attr('data-y', j);
        $(square).click(() => {
            let kleur = configMap.speler.color === "wit" ? 1 : 2;
            if(configMap.spel.aandeBeurt === kleur) {
                console.log("clicked square: ", i, j);
                Game.Api.put('zet', configMap.spelToken, {rijZet: i-1, kolomZet: j-1, pas: false }).
                then(json => {
                   if(json) updateBoard(json);

                });
            }
        });

        switch(configMap.spel.bord[i-1][j-1]){
            case 1:
            placeFiche(square, configMap.colors[1], i, j);
            break;
            case 2:
            placeFiche(square, configMap.colors[2], i, j);
            break;
        }
        return square;
    }

    const updateBoard = function(){

    }

    const placeFiche = function(square,color, i, j) {
        //add fiche
        if(!square.hasChildNodes()) {
            let fiche = document.createElement('div');
            $(fiche).addClass(`fiche-${color}`);
            $(fiche).attr('data-x', i);
            $(fiche).attr('data-y', j);

            let img = document.createElement('div');
            $(img).addClass('fiche-img');
            fiche.appendChild(img);

            square.appendChild(fiche);
        }
    }
    const getColorFromPlayerToken = function(token){
        let color = "";
        if(token === configMap.spel.speler1Token){
            color = configMap.colors[1];
        }
        else {
            color = configMap.colors[2];
        }
        return color;
    }

    return {
        initReversi: privateInit
    }
})();