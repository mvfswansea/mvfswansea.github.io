import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Elevens from './components/Elevens';
import Leagues from './components/Leagues';
import TeamCopr from './components/TeamCopr';
import TeamGwyr from './components/TeamGwyr';
import TeamTawe from './components/TeamTawe';
import LeagueCopr from './components/LeagueCopr';
import LeagueGwyr from './components/LeagueGwyr';

// Gwyr League
import TeamAllPhats from './components/teams/gwyr/TeamAllPhats';
import TeamLargentina from './components/teams/gwyr/TeamLargentina';
import TeamGastricBandits from './components/teams/gwyr/TeamGastricBandits';
import TeamVanDerSarnies from './components/teams/gwyr/TeamVanDerSarnies';
import TeamBMIMunchen from './components/teams/gwyr/TeamBMIMunchen';
import TeamRHCP from './components/teams/gwyr/TeamRHCP';
import TeamRealMadri from './components/teams/gwyr/TeamRealMadri';
import TeamBorussiaDonuts from './components/teams/gwyr/TeamBorussiaDonuts';

// Copr League


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/elevens" element={<Elevens />} />
          <Route path="/elevens/gwyr" element={<TeamGwyr />} />
          <Route path="/elevens/tawe" element={<TeamTawe />} />
          <Route path="/elevens/copr" element={<TeamCopr />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/gwyr" element={<LeagueGwyr />} />
          <Route path="/leagues/copr" element={<LeagueCopr />} />

          {/* Gwyr League */}
          <Route path="/leagues/team/allphats" element={<TeamAllPhats />} />
          <Route path="/leagues/team/largentina" element={<TeamLargentina />} />
          <Route path="/leagues/team/gastricbandits" element={<TeamGastricBandits />} />
          <Route path="/leagues/team/vandersarnies" element={<TeamVanDerSarnies />} />
          <Route path="/leagues/team/bmimunchen" element={<TeamBMIMunchen />} />
          <Route path="/leagues/team/rhcp" element={<TeamRHCP />} />
          <Route path="/leagues/team/realmadri" element={<TeamRealMadri />} />
          <Route path="/leagues/team/borussiadonuts" element={<TeamBorussiaDonuts />} />

          {/* Copr League */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
