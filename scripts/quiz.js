const quizzes = [
  [ // Quiz 1
    {
      question: "Which keyword is used to declare a block-scoped variable?",
      options: ["var", "let", "define", "global"],
      answer: 1,
      image: ""
    },
    {
      question: "What will <span class='highlight-green'>typeof 'hello'</span> return?",
      options: ["word", "object", "string", "text"],
      answer: 2,
      image: ""
    },
    {
      question: "Which method displays a popup message?",
      options: ["prompt", "alert", "confirm", "input"],
      answer: 1,
      image: ""
    },
    {
      question: "Which tag is used to write JavaScript in HTML",
      options: ["<link>", "<style>", "<script>", "<html>"],
      answer: 2,
      image: ""
    },
    {
      question: "Which of these is NOT a valid variable name?",
      options: ["my_var", "123var", "name", "_id"],
      answer: 1,
      image: ""
    },
    {
      question: "What is the result of <span class='highlight-green'>console.log(5 + '5')</span>?",
      options: ["10", "55", "'10 + 5'", "NaN"],
      answer: 1,
      image: ""
    },
    {
      question: "Where should you place <span class='highlight-green'>&lt;script&gt</span> to avoid blocking rendering?",
      options: ["top of <head>", "bottom of <body>", "in <title>", "outside <html>"],
      answer: 1,
      image: ""
    },
    {
      question: "Which is used to display output in the console?",
      options: ["document.write", "alert", "console.log", "log.console"],
      answer: 2,
      image: ""
    },
    {
      question: "Which variable cannot be reassigned?",
      options: ["let", "const", "var", "int"],
      answer: 1,
      image: ""
    },
    {
      question: "What does <span class='highlight-green'>undefined</span> mean in JavaScript?",
      options: ["Not declared", "Declared but no value", "Null value", "Zero"],
      answer: 1,
      image: ""
    }
  ],
  [ // Quiz 2
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: 1,
      image: ""
    },
    {
      question: "What is the result of <span class='highlight-green'>console.log(5 + '5')</span>?",
      options: ["10", "55", "'10 + 5'", "NaN"],
      answer: 2,
      image: "images/js.png"
    }
  ],
  [ // Quiz 3
    {
      question: "What color is the sky on a clear day?",
      options: ["Blue", "Green", "Red", "Purple"],
      answer: 0,
      image: ""
    }
  ],
  [ // Quiz 4
    {
      question: "Which animal is known as the king of the jungle?",
      options: ["Elephant", "Lion", "Tiger", "Bear"],
      answer: 1,
      image: ""
    }
  ],
  [ // Quiz 5
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: 2,
      image: ""
    }
  ]
];

const quizNames = [
  "Level 1: Introduction to JavaScript",
  "Level 2: Programming Foundations",
  "Level 3: Functions and Scope",
  "Level 4: Objects and Structures",
  "Level 5: DOM and Events"
];

let current = 0;
let score = 0;
let answeringQuestion = false;
let canClick = true;
let questions = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function selectQuiz(index) {
  // Clone and shuffle the questions to avoid mutating original
  questions = quizzes[index].map(q => {
    const shuffledOptions = [...q.options];
    shuffleArray(shuffledOptions);

    // Determine new correct answer index
    const newAnswerIndex = shuffledOptions.indexOf(q.options[q.answer]);

    return {
      ...q,
      options: shuffledOptions,
      answer: newAnswerIndex
    };
  });

  shuffleArray(questions); // Shuffle the question order

  current = 0;
  score = 0;

  // Show and set quiz name
  const quizNameElem = document.getElementById("quiz-name");
  quizNameElem.textContent = quizNames[index];
  quizNameElem.style.display = "block";

  // Hide intro and reset UI
  document.getElementById("intro-message").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("question-number").style.display = "block";
  document.getElementById("answer-container").style.display = "grid";
  document.getElementById("feedback").textContent = "";

  // Reset content
  document.getElementById("question-container").innerHTML = `<h2 id="question-text"></h2>`;
  document.getElementById("question-image").innerHTML = ``;

  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`opt${i}`);
    if (btn) btn.style.display = "flex";
  }

  loadQuestion();
}

function loadQuestion() {
  answeringQuestion = true;
  const q = questions[current];
  document.getElementById("question-text").innerHTML = q.question;
  document.getElementById("question-number").textContent = `${current + 1}/${questions.length}`;

  const imageContainer = document.getElementById("question-image");
  if (q.image) {
    imageContainer.style.display = "block";
    imageContainer.innerHTML = `<img src="${q.image}" alt="Question Image" class="question-image">`;
  } else {
    imageContainer.style.display = "none";
  }

  q.options.forEach((text, i) => {
    const btn = document.getElementById(`opt${i}`);
    btn.textContent = text;
    btn.disabled = false;
    btn.classList.remove("faded", "correct-glow", "wrong-glow", "grey-glow");
    btn.onclick = () => handleAnswer(i, q.answer);
  });
}

function handleAnswer(selected, correct) {
  if (!canClick) return;
  canClick = false;

  const correctBtn = document.getElementById(`opt${correct}`);
  const selectedBtn = document.getElementById(`opt${selected}`);

  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`opt${i}`);
    btn.disabled = true;
    if (btn !== correctBtn && btn !== selectedBtn) {
      btn.classList.add("grey-glow");
    }
  }

  if (selected === correct) {
    selectedBtn.classList.add("correct-glow");
    score++;
  } else {
    selectedBtn.classList.add("wrong-glow");
    correctBtn.classList.add("correct-glow");
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
    answeringQuestion = false;
    canClick = true;
  }, 2000);
}

function showResults() {
  document.getElementById("question-container").innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
  document.getElementById("question-number").style.display = "none";
  document.getElementById("answer-container").style.display = "none";
  document.getElementById("feedback").textContent = "Quiz Finished!";
}
