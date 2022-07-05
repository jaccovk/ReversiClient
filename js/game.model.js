Game.Model = (function () {
    //bevat gegevens spelers/spel
    let configMap = {}
    const publicInit = function () {
        Game.init();
    }

    const getWeather = function (url) {
        Game.Data.get(url).then(d => {


            if (d?.main?.temp != null) {
                console.log(`Temp = ${d.name} is ${d.main.temp}`);
                return d;
            } else {
                throw new Error('jammer jochie')
            }
        }).catch(e => {
            console.log(`Error is ${e.message}`);
            throw new Error('jammer jochie')
        });
    }

    const _getGameState = function () {

        //aanvraag via Game.Data
        var data = Game.Data.get(`api/Spel/Beurt/<token>`);
        //controle of ontvangen data valide is
        if (data === 0 || data === 1 || data === 2) {
            if (data === 0) {
                console.log('*geen waarde*')
            } else if (data === 1) {
                console.log('*wit aan zet*')
            } else if (data === 2) {
                console.log('*zwart aan zet*')
            }
            return data;

        } /*else throw new Error('jammer jochie');*/
    }

    return {
        initModel: publicInit,
        getWeather: getWeather,
        getGameState: _getGameState
    }
})();