import React from 'react';
import '../styles/Results.css';

const Results = ({ userAnswers, quizData, onRetake, onBookLesson }) => {
  const correctAnswers = userAnswers.filter((answers, index) => 
    answers.every(answer => quizData[index].correctAnswers.includes(answer)) &&
    quizData[index].correctAnswers.every(answer => answers.includes(answer))
  ).length;

  return (
    <div className="results-container">
      <h2>Результаты теста</h2>
      <div className="results-image-container">
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Results illustration" className="results-image" />
      </div>
      <p>Вы ответили правильно на {correctAnswers} из {quizData.length} вопросов!</p>
      <div className="action-buttons">
        <button onClick={onRetake}>Пройти тест заново</button>
        <button onClick={onBookLesson}>Забронировать бесплатный урок</button>
      </div>
    </div>
  );
};

export default Results;

