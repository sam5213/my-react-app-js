import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Вы ввели: ${inputValue}`);
    setInputValue('');
  };

  return (
    <div className="App">
      <h1>Простая форма ввода</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите что-то..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default App;