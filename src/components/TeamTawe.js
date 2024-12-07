// TeamTawe.js
import React from 'react';

function TeamTawe() {
  return (
    <div className="team-page">
      <h1>Tawe Team</h1>
      
      {/* Results Section */}
      <section>
        <h2>Results</h2>
        <p><strong>Write-Up:</strong> Tawe put on a great performance...</p>
        <h3>Team Sheet</h3>
        <ul>
          <li>Player 1</li>
          <li>Player 2</li>
          <li>Player 3</li>
        </ul>
        <h3>Scorers</h3>
        <ul>
          <li>Player 1 - 2 goals</li>
          <li>Player 2 - 1 goal</li>
        </ul>
      </section>
      
      {/* Fixtures Section */}
      <section>
        <h2>Upcoming Fixtures</h2>
        <ul>
          <li>Fixture 1: Tawe vs Gwyr</li>
          <li>Fixture 2: Tawe vs Copr</li>
        </ul>
      </section>

      {/* Management Team */}
      <section>
        <h2>Management Team</h2>
        <ul>
          <li>Manager: Mike Brown</li>
          <li>Assistant Manager: Linda Green</li>
        </ul>
      </section>

      {/* All Members */}
      <section>
        <h2>All Members</h2>
        <ul>
          <li>Player 1</li>
          <li>Player 2</li>
          <li>Player 3</li>
        </ul>
      </section>
    </div>
  );
}

export default TeamTawe;
