Game.Data = (function(){
    //communicatie met server
    const configMap = {
        mock: [
            {
                url: `api/Spel/Beurt`, //api/spel/beurt
                data: 0
            }
        ],

                apiUrl: "https://localhost:44326/api/spel/"



    }
    let stateMap = {
        environment : 'development',
        gameState : 0
    }
    const getMockData = function(){

        const mockData = configMap.mock;

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });

    }

    const get = function(url){
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
    };

    const publicInit = function(environment){
        //Game.init();
        console.log('init game data ...');
        if(environment === "production" || environment === "development") {
            stateMap.environment = environment;
            //get(url);
        }
        else throw new Error("verkeerde environment");
    }

    return {
        initData: publicInit,
        get: get,
        stateMap: stateMap,
        configMap: configMap
    }
})();