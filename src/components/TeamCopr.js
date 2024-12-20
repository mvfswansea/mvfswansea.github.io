// TeamCopr.js
import React from 'react';

function TeamCopr() {
  return (
    <div className="team-page">
      <h1>Copr Team</h1>
      
      {/* Results Section */}
      <section>
        <h2>Results</h2>
        <p><strong>Write-Up:</strong> Copr had a solid performance...</p>
        <h3>Team Sheet</h3>
        <ul>
          <li>Player 1</li>
          <li>Player 2</li>
          <li>Player 3</li>
        </ul>
        <h3>Scorers</h3>
        <ul>
          <li>Player 1 - 3 goals</li>
          <li>Player 2 - 1 goal</li>
        </ul>
      </section>
      
      {/* Fixtures Section */}
      <section>
        <h2>Upcoming Fixtures</h2>
        <ul>
          <li>Fixture 1: Copr vs Gwyr</li>
          <li>Fixture 2: Copr vs Tawe</li>
        </ul>
      </section>

      {/* Management Team */}
      <section>
        <h2>Management Team</h2>
        <ul>
          <li>Manager: Jack Smith</li>
          <li>Assistant Manager: Sarah Lee</li>
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

export default TeamCopr;
