import React, { useEffect } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Quiz />
    </div>
  );
}

export default App;

