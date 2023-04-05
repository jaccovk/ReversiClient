Game.Reversi = (function(){
    let configMap = {
        spelToken: "",
        speler: [],
        spel: [],

        afgelopen: false,
        colors: ["geen", "wit", "zwart"],
    };

    const countFichesByColor = (color, bord) => {
        return Game.Stats.countFichesByColor(color, bord);
    }


    const privateInit = async function (spelToken, spelerToken) {
        if (!configMap.afgelopen) {
            configMap.spelToken = spelToken;
            configMap.speler.token = spelerToken;
            await setSpel();

            //place board
            let bord = document.getElementsByClassName('game-board');
            for (let i = 1; i <= configMap.spel.bord.length; i++) {
                for (let j = 1; j <= configMap.spel.bord.length; j++) {
                    //set square
                    let square = setSquare(i, j);
                    bord[0].appendChild(square);
                }
            }

            //set cat facts
            setCatFacts();

            //set chart
            setChart();

            //set stats
            setStats();
        }
    };

    const setCatFacts = async function () {
        let catFacts = await Game.Api.getCatFacts();
        console.log(catFacts.data[0]);
        document.getElementsByClassName('cat-facts')[0].innerText = catFacts.data[0];
    }

    const setStats = function () {
        const gameStats = document.getElementsByClassName('game-stats')[0];
        const stats = Game.Stats.getStats(configMap.spel.bord);
        gameStats.innerHTML = `
            <hr/>
                ${stats.witIsWinning ? "Wit" : "Zwart"}  is aan het winnen.<hr/>
                Er zijn nog ${stats.aantalLegeVelden} lege velden.
            <hr/>
        `;
    }

    const setChart = function () {
        const ctx = document.getElementById('myChart');
        const stats = Game.Stats.getStats(configMap.spel.bord);
        let chart = Game.Stats.getChart(ctx);

        let aantalWit = stats.aantalWit;
        let aantalZwart = stats.aantalZwart;
        chart.data.datasets[0].data = [aantalWit, aantalZwart];
        chart.update();
    }


    const setSpel = async function () {
        await Game.Api.get(`getSpel`, configMap.spelToken).then(json => {

            configMap.spel.bord = json.bord;
            configMap.spel.speler1Token = json.speler1Token;
            configMap.spel.speler2Token = json.speler2Token;
            configMap.spel.aandeBeurt = json.aandeBeurt;
        });
        configMap.speler.color = getColorFromPlayerToken(configMap.speler.token);
        document.getElementById('spelerKleur').innerText = `Jij bent: ${configMap.speler.color}`;
        document.getElementById('beurt').innerText = `${configMap.spel.aandeBeurt === 1 ? "Wit" : "Zwart"} is aan de beurt.`;
    }

    const setSquare = function (i, j) {
        let square = document.createElement('div');
        $(square).addClass('square');
        $(square).attr('data-x', i);
        $(square).attr('data-y', j);
        $(square).click(() => {
            let kleur = configMap.speler.color === "wit" ? 1 : 2;
            if (configMap.spel.aandeBeurt === kleur) {
                Game.Api.put('zet', configMap.spelToken, {rijZet: i - 1, kolomZet: j - 1, pas: false}).then(json => {
                    if (json) {
                        updateBoard();
                    }
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


    const getColorFromPlayerToken = function (token) {
        let color = "";
        if (token === configMap.spel.speler1Token) {
            color = configMap.colors[1];
        } else {
            color = configMap.colors[2];
        }
        return color;
    }


    const updateBoard = function () {
        //get the board
        let bord = configMap.spel.bord;
        //return board from the api
        Game.Api.get(`getSpel`, configMap.spelToken).then(json => {
            for (let i = 1; i <= bord.length; i++) {
                for (let j = 1; j <= bord.length; j++) {
                    /**Check if the square has been changed**/
                    let square = document.querySelector(`[data-x="${i}"][data-y="${j}"]`);
                    //if the square has been changed, update the square
                    if (json.bord[i - 1][j - 1] !== bord[i - 1][j - 1]) {
                        //remove fiche
                        if (square.hasChildNodes()) {
                            square.removeChild(square.firstChild);
                        }
                        //place fiche
                        switch (json.bord[i - 1][j - 1]) {
                            case 1:
                                placeFiche(square, configMap.colors[1], i, j);
                                break;
                            case 2:
                                placeFiche(square, configMap.colors[2], i, j);
                                break;
                        }
                    }
                }
            }
            //update the boarddata
            setSpel();

            //update the stats
            setStats();

            //update the chart
            setChart();

            //check if the game is over
            isAfgelopen(json.bord);
        }).catch(() => calculatePoints_AndEndGame(configMap.spel.bord));
    }


    const isAfgelopen = function (bord) {
        //get a true or false from the api
        Game.Api.get(`isAfgelopen`, configMap.spelToken).then(async json => {
                if (json) {
                    //show alert who won by counting the count of stones
                    await calculatePoints_AndEndGame(bord);
                } else {
                    //check if one of the colors is 0
                    if (countFichesByColor("Wit", bord) === 0 || countFichesByColor("Zwart", bord) === 0) {
                        let loser = countFichesByColor("Wit", bord) === 0 ? "Zwart" : "Wit";
                        let winner = countFichesByColor("Wit", bord) === 0 ? "Wit" : "Zwart";
                        configMap.afgelopen = true;
                        await alert(`${loser} heeft geen fiches meer dus ${winner} heeft gewonnen!!`);
                    }
                }
            }
        );
    }

    async function calculatePoints_AndEndGame(bord) {
        await alert(`${countFichesByColor("Wit", bord) > countFichesByColor("Zwart", bord) ? "Wit" : "Zwart"} heeft gewonnen!`);
        window.location.href = "/"; //TODO
        configMap.afgelopen = true;
        configMap.spelToken = "";
        configMap.speler = [];
        configMap.spel = [];
    }

    return {
        initReversi: privateInit,
        updateBoard: updateBoard,
    }
})();
