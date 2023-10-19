import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <h1> MVF Swansea </h1>
      <p> Content </p>
    </div>
  );
}

const contentDiv = document.getElementById('content');
ReactDOM.render(<App />, contentDiv);
