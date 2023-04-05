Game.Data = (function(){
    let stateMap = {
        environment : 'development',
        isProduction : environment === 'production',
        gameState : 0
    }
    const configMap = {
        apiUrl: isProduction ? "/api/spel/" : "http://localhost:5001/api/spel/",
        /*        mock: [
            {
                url: `api/Spel/Beurt`,
                data: 0
            }
        ],*/
    }

/*    const getMockData = function(){

        const mockData = configMap.mock;

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });

    }*/

/*    const get = function(url){
        if(stateMap.environment === 'development')
            return getMockData(configMap.mock.url);
        else {
            return $.get(url)
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
    };*/

/*    const publicInit = function(environment){
        //Game.init();
        console.log('init game data ...');
        if(environment === "production" || environment === "development") {
            stateMap.environment = environment;
            //get(url);
        }
        else throw new Error("verkeerde environment");
    }*/

    return {
/*      initData: publicInit,
        get: get,*/
        stateMap: stateMap,
        configMap: configMap
    }
})();
