import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import News from './components/News';
import Events from './components/Events';
// import Challenge from './components/Challenge';
import Sponsors from './components/Sponsors';
// import Elevens from './components/Elevens';
// import Leagues from './components/Leagues';
// import TeamCopr from './components/TeamCopr';
// import TeamGwyr from './components/TeamGwyr';
// import LeagueCopr from './components/LeagueCopr';
// import LeagueGwyr from './components/LeagueGwyr';
// import TeamOfTheWeek from './components/TeamOfTheWeek';


// Gwyr League
import GwyrBlack from './components/teams/gwyr/GwyrBlack';
import GwyrBlue from './components/teams/gwyr/GwyrBlue';
import GwyrGreen from './components/teams/gwyr/GwyrGreen';
import GwyrOrange from './components/teams/gwyr/GwyrOrange';
import GwyrPurple from './components/teams/gwyr/GwyrPurple';
import GwyrRed from './components/teams/gwyr/GwyrRed';
import GwyrWhite from './components/teams/gwyr/GwyrWhite';
import GwyrYellow from './components/teams/gwyr/GwyrYellow';


// Copr League
import CoprBlack from './components/teams/copr/CoprBlack';
import CoprBlue from './components/teams/copr/CoprBlue';
import CoprGreen from './components/teams/copr/CoprGreen';
import CoprOrange from './components/teams/copr/CoprOrange';
import CoprPurple from './components/teams/copr/CoprPurple';
import CoprRed from './components/teams/copr/CoprRed';
import CoprWhite from './components/teams/copr/CoprWhite';
import CoprYellow from './components/teams/copr/CoprYellow';


import PlayerProfile from './components/PlayerProfile';
import Event from './components/Event';

import './App.css';

function App() {
  return (

    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/totw" element={<TeamOfTheWeek />} /> */}
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:key" element={<Event />} />
          {/* <Route path="/challenge" element={<Challenge />} /> */}
          <Route path="/sponsors" element={<Sponsors />} />
          {/* <Route path="/elevens" element={<Elevens />} /> */}
          {/* <Route path="/elevens/gwyr" element={<TeamGwyr />} /> */}
          {/* <Route path="/elevens/copr" element={<TeamCopr />} /> */}
          {/* <Route path="/leagues" element={<Leagues />} /> */}
          {/* <Route path="/leagues/gwyr" element={<LeagueGwyr />} /> */}
          {/* <Route path="/leagues/copr" element={<LeagueCopr />} /> */}
          <Route path="/player/:id" element={<PlayerProfile />} />

          {/* Gwyr League */}
          <Route path="/leagues/team/GwyrBlack" element={<GwyrBlack />} />
          <Route path="/leagues/team/GwyrBlue" element={<GwyrBlue />} />
          <Route path="/leagues/team/GwyrGreen" element={<GwyrGreen />} />
          <Route path="/leagues/team/GwyrOrange" element={<GwyrOrange />} />
          <Route path="/leagues/team/GwyrPurple" element={<GwyrPurple />} />
          <Route path="/leagues/team/GwyrRed" element={<GwyrRed />} />
          <Route path="/leagues/team/GwyrWhite" element={<GwyrWhite />} />
          <Route path="/leagues/team/GwyrYellow" element={<GwyrYellow />} />


          {/* Copr League */}
          <Route path="/leagues/team/CoprBlack" element={<CoprBlack />} />
          <Route path="/leagues/team/CoprBlue" element={<CoprBlue />} />
          <Route path="/leagues/team/CoprGreen" element={<CoprGreen />} />
          <Route path="/leagues/team/CoprOrange" element={<CoprOrange />} />
          <Route path="/leagues/team/CoprPurple" element={<CoprPurple />} />
          <Route path="/leagues/team/CoprRed" element={<CoprRed />} />
          <Route path="/leagues/team/CoprWhite" element={<CoprWhite />} />
          <Route path="/leagues/team/CoprYellow" element={<CoprYellow />} />

          {/* Route to display custom 404 page */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
      <Footer />
    </div>

  );
}

export default App;
