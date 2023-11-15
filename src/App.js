import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Elevens from './components/Elevens';
import Leagues from './components/Leagues';
import TeamCopr from './components/TeamCopr';
import TeamGwyr from './components/TeamGwyr';
import TeamTawe from './components/TeamTawe';
import LeagueCopr from './components/LeagueCopr';
import LeagueGwyr from './components/LeagueGwyr';
import TeamOfTheWeek from './components/TeamOfTheWeek';

// Gwyr League
import TeamTheAllPhats from './components/teams/gwyr/TeamTheAllPhats';
import TeamLargentina from './components/teams/copr/TeamLargentina';
import TeamGastricBandits from './components/teams/gwyr/TeamGastricBandits';
import TeamVanDerSarnies from './components/teams/gwyr/TeamVanDerSarnies';
import TeamBMIMunchen from './components/teams/copr/TeamBMIMunchen';
import TeamRHCP from './components/teams/gwyr/TeamRHCP';
import TeamRealMadri from './components/teams/copr/TeamRealMadri';
import TeamBorussiaDonuts from './components/teams/copr/TeamBorussiaDonuts';

// Copr League
import TeamBorussiaMonchenburger from './components/teams/copr/TeamBorussiaMonchenburger';
import TeamClwbTropicana from './components/teams/gwyr/TeamClwbTropicana';
import TeamFullOfHam from './components/teams/gwyr/TeamFullOfHam';
import TeamHangryHippos from './components/teams/gwyr/TeamHangryHippos';
import TeamMassiveCochs from './components/teams/copr/TeamMassiveCochs';
import TeamNavyBlueSeals from './components/teams/gwyr/TeamNavyBlueSeals';
import TeamSnackingPumpkins from './components/teams/copr/TeamSnackingPumpkins';
import TeamRealLettuce from './components/teams/copr/TeamRealLettuce';

import PlayerProfile from './components/PlayerProfile';

import './App.css';

function App() {
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/totw" element={<TeamOfTheWeek />} />
        <Route path="/elevens" element={<Elevens />} />
        <Route path="/elevens/gwyr" element={<TeamGwyr />} />
        <Route path="/elevens/tawe" element={<TeamTawe />} />
        <Route path="/elevens/copr" element={<TeamCopr />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/leagues/gwyr" element={<LeagueGwyr />} />
        <Route path="/leagues/copr" element={<LeagueCopr />} />
        <Route path="/player/:leagueName/:playerName" element={<PlayerProfile />} />

        {/* Gwyr League */}
        <Route path="/leagues/team/ClwbTropicana" element={<TeamClwbTropicana />} />
        <Route path="/leagues/team/FullOfHam" element={<TeamFullOfHam />} />
        <Route path="/leagues/team/gastricbandits" element={<TeamGastricBandits />} />
        <Route path="/leagues/team/HangryHippos" element={<TeamHangryHippos />} />
        <Route path="/leagues/team/NavyBlueSeals" element={<TeamNavyBlueSeals />} />
        <Route path="/leagues/team/rhcp" element={<TeamRHCP />} />
        <Route path="/leagues/team/theallphats" element={<TeamTheAllPhats />} />
        <Route path="/leagues/team/vandersarnies" element={<TeamVanDerSarnies />} />

        {/* Copr League */}
        <Route path="/leagues/team/bmimunchen" element={<TeamBMIMunchen />} />
        <Route path="/leagues/team/borussiadonuts" element={<TeamBorussiaDonuts />} />
        <Route path="/leagues/team/BorussiaMonchenburger" element={<TeamBorussiaMonchenburger />} />
        <Route path="/leagues/team/largentina" element={<TeamLargentina />} />
        <Route path="/leagues/team/MassiveCochs" element={<TeamMassiveCochs />} />
        <Route path="/leagues/team/RealLettuce" element={<TeamRealLettuce />} />
        <Route path="/leagues/team/realmadri" element={<TeamRealMadri />} />
        <Route path="/leagues/team/SnackingPumpkins" element={<TeamSnackingPumpkins />} />

        {/* Route to display custom 404 page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </div>

  );
}

export default App;
