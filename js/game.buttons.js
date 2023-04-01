Game.Buttons = (function () {
    const addButtons = function (spelToken) {
        let buttons = document.getElementById('buttons');

        /** ------ Pas de beurt --------- **/
        let pas = document.createElement('button');
        pas.innerHTML = "Pas beurt";
        $(pas).addClass('btn btn-primary');
        pas.addEventListener('click', () => {
            Game.Api.put(`pasBeurt/${spelToken}`, Game.Data.configMap.spelToken).then(json => {
                if (json) Game.Reversi.updateBoard();
                else alert("Je kan je beurt niet passen: er is nog een zet mogelijk.");
            });
        }
        );
        buttons.appendChild(pas);

        /** ------ Verander de catfact --------- **/
        let image = document.createElement('button');
        image.innerHTML = "Verander van catfact";
        $(image).addClass('btn btn-outline-info');
        image.addEventListener('click', () => {
            window.location.reload();
        });
        buttons.appendChild(image);
    }
    return {
        addButtons: addButtons
    }
})();
