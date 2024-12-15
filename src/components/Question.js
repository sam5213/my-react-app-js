import React from 'react';
import '../styles/Question.css';

const Question = ({ questionData, onAnswer, userAnswers }) => {
  const { question, answers, multipleChoice } = questionData;

  const handleAnswerClick = (index) => {
    if (multipleChoice) {
      const newAnswers = userAnswers.includes(index)
        ? userAnswers.filter(i => i !== index)
        : [...userAnswers, index];
      onAnswer(newAnswers);
    } else {
      onAnswer([index]);
    }
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="answers-container">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${userAnswers.includes(index) ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            <img src={answer.gif} alt={answer.text} className="answer-gif" />
            <p>{answer.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;

