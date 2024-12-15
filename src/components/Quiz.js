import React, { useState } from 'react';
import Question from './Question';
import Results from './Results';
import BookingPopup from './BookingPopup';
import quizData from '../data/quizData';
import { Star, Sparkles } from 'lucide-react';
import '../styles/Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill([]));
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

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
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Тест на знание английского языка</h1>
          <h2>Пройдите тест и получите бесплатный урок с нашим преподавателем!</h2>
          <div className="illustration">
            <img src="/placeholder.svg?height=300&width=300" alt="Quiz illustration" className="quiz-image" />
            <Sparkles className="sparkle-1" />
            <Star className="star-1" />
            <Star className="star-2" />
          </div>
          <button className="start-button" onClick={handleStartQuiz}>
            Начать тест
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <>
        <Results 
          userAnswers={userAnswers} 
          quizData={quizData} 
          onRetake={handleRetake}
          onBookLesson={() => setShowBookingPopup(true)}
        />
        {showBookingPopup && (
          <BookingPopup onClose={() => setShowBookingPopup(false)} />
        )}
      </>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
        />
      </div>
      <Question
        questionData={quizData[currentQuestion]}
        onAnswer={handleAnswer}
        userAnswers={userAnswers[currentQuestion]}
      />
      <div className="navigation-buttons">
        <button 
          className="nav-button" 
          onClick={handlePrevious} 
          disabled={currentQuestion === 0}
        >
          Назад
        </button>
        <button 
          className="nav-button next-button" 
          onClick={handleNext}
        >
          {currentQuestion === quizData.length - 1 ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

