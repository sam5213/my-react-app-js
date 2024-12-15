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
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
    setBookingSuccess(false);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Тест на знание английского языка</h1>
          <h2>Пройдите тест и получите бесплатный урок с нашим преподавателем!</h2>
          <div className="illustration">
            <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="English learning illustration" className="quiz-image" />
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
          <BookingPopup 
            onClose={() => setShowBookingPopup(false)}
            onBookingSuccess={handleBookingSuccess}
          />
        )}
        {bookingSuccess && (
          <div className="booking-success-message">
            Вы успешно забронировали урок!
          </div>
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

