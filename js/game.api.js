Game.Api = (function () {

    const apiUrl = Game.Data.configMap.apiUrl;

    const getCatFacts = function () {
        return fetch('https://meowfacts.herokuapp.com/')
            .then(res => res.json());
    }

    const get = function (url, spelToken, params) {

        let completeUrl = apiUrl + url;
        return fetch(encodeURI(completeUrl), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "x-speltoken": spelToken
            },
        }).then(res => res.json());
    }
    const put = function (url, spelToken, params) {

            let completeUrl = apiUrl + url;
            console.log('parameters: ', params);
            return fetch(encodeURI(completeUrl), {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-speltoken": spelToken
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
    }

    return {
        get: get,
        put: put,
        getCatFacts: getCatFacts
    }
})();
