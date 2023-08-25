const quizData = [
  {
    question: 'Javascript is an _______ language?',
    options: ['Object-oriented', 'Object-based', 'procedural', 'None of the above'],
    answer: 'Object-oriented',
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    options: ['Var', 'let', 'both a and b', 'None of the above'],
    answer: 'both a and b',
  },
  {
    question: 'Which of the following methods is used to access HTML elements using Javascript?',
    options: ['getElementbyId()', 'getElementbyClassName()', 'both a and b', 'none of the above'],
    answer: 'both a and b',
  },
  {
    question: 'Which one of the following also known as Conditional Expression:',
    options: ['Alternative to if-else', 'Switch statement', 'If-then-else statement', 'immediate if'],
    answer: 'immediate if',
  },
  {
    question: ' The "function" and " var" are known as:',
    options: [
      'Keywords',
      'Data types',
      'Declaration statements',
      'Prototypes',
    ],
    answer: 'Declaration statements',
  },
  {
    question: 'Which of the following variables takes precedence over the others if the names are the same?',
    options: ['Global variable', 'The local element', 'The two of the above', 'None of the above'],
    answer: 'The local element',
  },
  {
    question: 'Which one of the following is the correct way for calling the JavaScript code?',
    options: [
      'Preprocessor',
      'Triggering Event',
      'RMI',
      'Function/Method',
    ],
    answer: 'Function/Method',
  },
  {
    question: 'Which of the following type of a variable is volatile?',
    options: ['Mutable variable', 'Dynamic variable', 'Volatile variable', 'Immutable variable'],
    answer: 'Mutable variable',
  },
  {
    question: 'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.',
    options: [
      'Prints an exception error',
      'Prints an overflow error',
      'Displays "Infinity"',
      'Prints the value as such',
    ],
    answer: 'Displays "Infinity"',
  },
  {
    question: 'In the JavaScript, which one of the following is not considered as an error:',
    options: ['Syntax error', 'Missing of semicolons', 'Division by zero', 'Missing of Bracket'],
    answer: 'Division by zero',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();