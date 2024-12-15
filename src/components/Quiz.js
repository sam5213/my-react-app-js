import React, { useState } from 'react';
import Question from './Question';
import Results from './Results';
import quizData from '../data/quizData';
import '../styles/Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill([]));
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (selectedAnswers) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedAnswers;
    setUserAnswers(newUserAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(quizData.length).fill([]));
    setQuizFinished(false);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h1>Test Your English Skills and Get a Free Lesson!</h1>
        <h2>Answer 10 questions correctly to win a free lesson with our expert teacher.</h2>
        <button className="start-button" onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (quizFinished) {
    return <Results userAnswers={userAnswers} quizData={quizData} onRetake={handleRetake} />;
  }

  return (
    <div className="quiz-container">
      <Question
        questionData={quizData[currentQuestion]}
        onAnswer={handleAnswer}
        userAnswers={userAnswers[currentQuestion]}
      />
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
        <button onClick={handleNext}>
          {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

