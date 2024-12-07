// TeamGwyr.js
import React from 'react';

function TeamGwyr() {
  return (
    <div className="team-page">
      <h1>Gwyr Team</h1>
      
      {/* Results Section */}
      <section>
        <h2>Results</h2>
        <p><strong>Write-Up:</strong> Gwyr had a fantastic game...</p>
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
          <li>Fixture 1: Gwyr vs Copr</li>
          <li>Fixture 2: Gwyr vs Tawe</li>
        </ul>
      </section>

      {/* Management Team */}
      <section>
        <h2>Management Team</h2>
        <ul>
          <li>Manager: John Doe</li>
          <li>Assistant Manager: Jane Doe</li>
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

export default TeamGwyr;
