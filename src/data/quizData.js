const quizData = [
  {
    question: "Почему вы хотите изучать английский язык?",
    answers: [
      { text: "Для работы и карьерного роста", gif: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" },
      { text: "Для путешествий и общения", gif: "https://media.giphy.com/media/3o7TKLC8zBUd7eEteE/giphy.gif" },
      { text: "Для саморазвития", gif: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
    ],
    correctAnswers: [0, 1, 2], // All answers are valid
    multipleChoice: true,
  },
  {
    question: "Сколько времени вы готовы уделять изучению английского?",
    answers: [
      { text: "30-60 минут каждый день", gif: "https://media.giphy.com/media/3o7TKF5DnsSLv4zVBu/giphy.gif" },
      { text: "2-3 часа в неделю", gif: "https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif" },
      { text: "Только по выходным", gif: "https://media.giphy.com/media/3o7TKT8jQvjgB4Ajio/giphy.gif" },
    ],
    correctAnswers: [0], // Preferring daily practice
    multipleChoice: false,
  },
  {
    question: "Какой уровень английского вы хотите достичь?",
    answers: [
      { text: "Базовый разговорный (A2-B1)", gif: "https://media.giphy.com/media/l0HlQXkPUwshAuWNa/giphy.gif" },
      { text: "Уверенное владение (B2-C1)", gif: "https://media.giphy.com/media/26BRzQS5HXcEWM7du/giphy.gif" },
      { text: "Свободное владение (C1-C2)", gif: "https://media.giphy.com/media/3og0IPElt1EVnbJ4KA/giphy.gif" },
    ],
    correctAnswers: [1, 2], // Ambitious goals are good
    multipleChoice: true,
  },
];

export default quizData;

