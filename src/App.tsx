import React from 'react';
import './App.css';
import {Counter, CounterLite} from "./counter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Make Counters Great Again!</h1>
        <hr/>
        <CounterLite/>
        <hr/>
        <Counter timeout={20} interval={1000}/>
        <p>
          Open application and ruin the world!
        </p>
        <a
          className="App-link"
          href="https://www.whitehouse.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          White House
        </a>
      </header>
    </div>
  );
}

export default App;
