const fs = require('fs');

const allPhatsData = require('../data/gwyr_league/teams/all_phats.json');
const bmiMunchenData = require('../data/gwyr_league/teams/bmi_munchen.json');
const borussiaDonutsData = require('../data/gwyr_league/teams/borussia_donuts.json');
const gastricBanditsData = require('../data/gwyr_league/teams/gastric_bandits.json');
const largentinaData = require('../data/gwyr_league/teams/largentina.json');
const realMadriData = require('../data/gwyr_league/teams/real_madri.json');
const redHotChilliPorkersData = require('../data/gwyr_league/teams/red_hot_chilli_porkers.json');
const vanDerSarniesData = require('../data/gwyr_league/teams/van_der_sarnies.json');

// const allPhatsData = require('../data/gwyr_league/teams/all_phats.json');
// const bmiMunchenData = require('../data/gwyr_league/teams/bmi_munchen.json');
// const borussiaDonutsData = require('../data/gwyr_league/teams/borussia_donuts.json');
// const gastricBanditsData = require('../data/gwyr_league/teams/gastric_bandits.json');
// const largentinaData = require('../data/gwyr_league/teams/largentina.json');
// const realMadriData = require('../data/gwyr_league/teams/real_madri.json');
// const redHotChilliPorkersData = require('../data/gwyr_league/teams/red_hot_chilli_porkers.json');
// const vanDerSarniesData = require('../data/gwyr_league/teams/van_der_sarnies.json');

const leagueData = {
    leagues: [
        {
            name: 'Gwyr',
            teams: [{
                AllPhats: allPhatsData,
                BmiMunchen: bmiMunchenData,
                BorussiaDonuts: borussiaDonutsData,
                GastricBandits: gastricBanditsData,
                Largentina: largentinaData,
                RealMadrid: realMadriData,
                RHCP: redHotChilliPorkersData,
                VanDerSarnies: vanDerSarniesData
            }],
            "fixtures": {
                "fixtures": "something"
            },
            "results": {
                "results": "something"
            }
        },
        // {
        //     name: 'Copr',
        //     teams: {
        //         AllPhats: allPhatsData,
        //         BmiMunchen: bmiMunchenData,
        //         BorussiaDonuts: borussiaDonutsData,
        //         GastricBandits: gastricBanditsData,
        //         Largentina: largentinaData,
        //         RealMadrid: realMadriData,
        //         RHCP: redHotChilliPorkersData,
        //         VanDerSarnies: vanDerSarniesData
        //     },
        // }
    ],
};

fs.writeFileSync('generated_league_data.json', JSON.stringify(leagueData, null, 4));
