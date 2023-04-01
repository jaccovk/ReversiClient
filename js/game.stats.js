Game.Stats = (function () {
    const configMap = {
        stats: {
            aantalWit: 0,
            aantalZwart: 0,
        }
    }
    const getStats = function (bord) {
        configMap.stats.aantalWit = countFichesByColor("Wit", bord);
        configMap.stats.aantalZwart = countFichesByColor("Zwart", bord);
        return configMap.stats;
    }

    const getChart = function (ctx) {
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Wit', 'Zwart'],
                datasets: [{
                    label: 'Aantal fiches',
                    data: [2, 2],
                    backgroundColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(0, 0, 0, 1)',
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(0, 0, 0, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const countFichesByColor = (color, bord) => {
        let wit = 0;
        let zwart = 0;
        for (let i = 0; i < bord.length; i++) {
            for (let j = 0; j < bord.length; j++) {
                if (bord[i][j] === 1) {
                    wit++;
                } else if (bord[i][j] === 2) {
                    zwart++;
                }
            }
        }
        return color === "Wit" ? wit : zwart;
    }

    return {
        getStats: getStats,
        getChart: getChart,
        countFichesByColor: countFichesByColor
    }
})();
