import React, { useState } from 'react';
import '../styles/Results.css';

const Results = ({ userAnswers, quizData, onRetake }) => {
  const [showPopup, setShowPopup] = useState(false);

  const correctAnswers = userAnswers.filter((answers, index) => 
    answers.every(answer => quizData[index].correctAnswers.includes(answer)) &&
    quizData[index].correctAnswers.every(answer => answers.includes(answer))
  ).length;

  const handleBookLesson = () => {
    setShowPopup(true);
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <p>You got {correctAnswers} out of {quizData.length} questions correct!</p>
      <div className="action-buttons">
        <button onClick={onRetake}>Retake Quiz</button>
        <button onClick={handleBookLesson}>Book Free Lesson</button>
      </div>
      {showPopup && (
        <div className="popup">
          <h3>Congratulations! You earned a free lesson.</h3>
          <p>Book your session now!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Results;

