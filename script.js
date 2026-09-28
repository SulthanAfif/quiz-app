// ===== DARK MODE =====
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

// ===== BANK SOAL =====
const questionBank = {
    html: [
        { question: "Apa kepanjangan HTML?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
        { question: "Tag untuk membuat hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
        { question: "Tag untuk menampilkan gambar?", options: ["<picture>", "<img>", "<image>", "<src>"], correct: 1 },
        { question: "Tag heading terbesar adalah?", options: ["<h6>", "<h3>", "<h1>", "<head>"], correct: 2 },
        { question: "Atribut yang wajib ada di tag <img>?", options: ["href", "src", "link", "alt saja"], correct: 1 },
        { question: "Tag untuk membuat daftar tidak berurutan?", options: ["<ol>", "<ul>", "<li>", "<dl>"], correct: 1 },
        { question: "Tag semantik untuk navigasi?", options: ["<nav>", "<navigation>", "<menu>", "<header>"], correct: 0 },
        { question: "Apa fungsi tag <br>?", options: ["Membuat paragraf", "Line break", "Bold text", "Italic"], correct: 1 },
        { question: "Tag untuk teks tebal?", options: ["<bold>", "<strong>", "<b-text>", "<thick>"], correct: 1 },
        { question: "Doctype yang benar untuk HTML5?", options: ["<!DOCTYPE html>", "<!DOCTYPE HTML5>", "<html5>", "<!html>"], correct: 0 }
    ],
    css: [
        { question: "Apa kepanjangan CSS?", options: ["Computer Style Sheet", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2 },
        { question: "Properti untuk mengubah warna teks?", options: ["text-color", "font-color", "color", "text-style"], correct: 2 },
        { question: "Cara menambahkan CSS eksternal?", options: ["<style src='...'>", "<link rel='stylesheet'>", "<css href='...'>", "<import>"], correct: 1 },
        { question: "Properti untuk membuat teks tebal?", options: ["font-style", "font-weight", "text-bold", "font-bold"], correct: 1 },
        { question: "Nilai display untuk flexbox?", options: ["block", "flex", "inline-flex", "grid"], correct: 1 },
        { question: "Properti untuk rounded corner?", options: ["border-radius", "corner-radius", "border-round", "radius"], correct: 0 },
        { question: "Cara memilih class di CSS?", options: ["#nama", ".nama", "nama", "*nama"], correct: 1 },
        { question: "Properti untuk jarak dalam elemen?", options: ["margin", "padding", "spacing", "gap"], correct: 1 },
        { question: "Unit relatif terhadap ukuran font parent?", options: ["px", "em", "vh", "cm"], correct: 1 },
        { question: "Properti untuk bayangan kotak?", options: ["box-shadow", "shadow", "drop-shadow", "border-shadow"], correct: 0 }
    ],
    javascript: [
        { question: "Cara memilih elemen by ID?", options: ["document.querySelector()", "document.getElementById()", "document.getElementsByClass()", "document.find()"], correct: 1 },
        { question: "Deklarasi variabel modern?", options: ["var nama = 'Budi'", "let nama = 'Budi'", "variable nama = 'Budi'", "nama := 'Budi'"], correct: 1 },
        { question: "Method untuk menambah elemen di akhir array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
        { question: "Apa itu localStorage?", options: ["Database server", "Penyimpanan di browser", "Cache otomatis", "Cookie"], correct: 1 },
        { question: "Cara menulis comment satu baris?", options: ["/* comment */", "// comment", "<!-- comment -->", "# comment"], correct: 1 },
        { question: "Operator perbandingan ketat (nilai + tipe)?", options: ["==", "===", "!=", "="], correct: 1 },
        { question: "Method mengubah array jadi string?", options: ["toString()", "join()", "Kedua jawaban benar", "split()"], correct: 2 },
        { question: "Keyword untuk membuat fungsi?", options: ["function", "func", "def", "method"], correct: 0 },
        { question: "Apa hasil dari typeof null?", options: ["null", "undefined", "object", "number"], correct: 2 },
        { question: "Cara menghentikan setInterval?", options: ["stopInterval()", "clearInterval()", "clearTimeout()", "stop()"], correct: 1 }
    ]
};

// ===== STATE =====
let questions = [];
let currentQuestion = 0;
let score = 0;
let lives = 3;
let answered = false;
let timer = null;
let timeLeft = 15;
let timePerQuestion = 15;
let userAnswers = [];
let allowSkip = true;

// ===== ELEMENTS =====
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const reviewScreen = document.getElementById("reviewScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const restartBtn = document.getElementById("restartBtn");
const reviewBtn = document.getElementById("reviewBtn");
const backToResultBtn = document.getElementById("backToResultBtn");

const categorySelect = document.getElementById("categorySelect");
const difficultySelect = document.getElementById("difficultySelect");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const timerDisplay = document.getElementById("timer");
const livesDisplay = document.getElementById("livesDisplay");
const finalScore = document.getElementById("finalScore");
const totalQuestions = document.getElementById("totalQuestions");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const resultTitle = document.getElementById("resultTitle");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const newHighScore = document.getElementById("newHighScore");
const reviewList = document.getElementById("reviewList");

highScoreDisplay.textContent = localStorage.getItem("quizHighScore") || 0;

// ===== HELPERS =====
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getQuestions() {
    const category = categorySelect.value;
    let selected = [];

    if (category === "mixed") {
        selected = [
            ...questionBank.html.slice(0, 4),
            ...questionBank.css.slice(0, 3),
            ...questionBank.javascript.slice(0, 3)
        ];
    } else {
        selected = [...questionBank[category]];
    }

    return shuffle(selected).slice(0, 10); // ambil 10 soal
}

// ===== MAIN FUNCTIONS =====
function startQuiz() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        timePerQuestion = 20;
        allowSkip = true;
    } else if (difficulty === "medium") {
        timePerQuestion = 15;
        allowSkip = true;
    } else {
        timePerQuestion = 10;
        allowSkip = false;
    }

    questions = getQuestions();
    currentQuestion = 0;
    score = 0;
    lives = 3;
    userAnswers = [];
    answered = false;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    reviewScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    skipBtn.style.display = allowSkip ? "block" : "none";
    showQuestion();
}

function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    timeLeft = timePerQuestion;

    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionNumber.textContent = `${currentQuestion + 1}/${questions.length}`;
    scoreDisplay.textContent = score;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    livesDisplay.textContent = "❤️".repeat(lives) + "🖤".repeat(3 - lives);

    optionsContainer.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => selectOption(i);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;
    timerDisplay.className = "";

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 5) timerDisplay.className = "danger";
        else if (timeLeft <= 8) timerDisplay.className = "warning";

        if (timeLeft <= 0) {
            clearInterval(timer);
            selectOption(-1); // waktu habis = salah
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add("correct");
        else if (i === selectedIndex) btn.classList.add("wrong");
    });

    const isCorrect = selectedIndex === q.correct;

    userAnswers.push({
        question: q.question,
        userAnswer: selectedIndex === -1 ? "Tidak dijawab (waktu habis)" : q.options[selectedIndex],
        correctAnswer: q.options[q.correct],
        isCorrect
    });

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = score;
    } else {
        lives--;
        livesDisplay.textContent = "❤️".repeat(lives) + "🖤".repeat(3 - lives);

        if (lives <= 0) {
            setTimeout(showResult, 800);
            return;
        }
    }

    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length && lives > 0) {
        showQuestion();
    } else {
        showResult();
    }
}

function skipQuestion() {
    if (answered || !allowSkip) return;
    selectOption(-1); // anggap salah
}

function showResult() {
    clearInterval(timer);
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = score;
    totalQuestions.textContent = `/${questions.length}`;
    const percent = Math.round((score / questions.length) * 100);
    percentage.textContent = `${percent}%`;

    if (lives <= 0) {
        resultTitle.textContent = "Game Over!";
        resultMessage.textContent = "Nyawa kamu habis 💔";
    } else if (score === questions.length) {
        resultTitle.textContent = "Sempurna!";
        resultMessage.textContent = "Kamu menjawab semua dengan benar! 🔥";
    } else if (score >= 7) {
        resultTitle.textContent = "Bagus!";
        resultMessage.textContent = "Pengetahuanmu cukup baik 👍";
    } else if (score >= 4) {
        resultTitle.textContent = "Lumayan";
        resultMessage.textContent = "Masih bisa lebih baik 💪";
    } else {
        resultTitle.textContent = "Coba Lagi";
        resultMessage.textContent = "Jangan menyerah! 😊";
    }

    const highScore = Number(localStorage.getItem("quizHighScore") || 0);
    if (score > highScore) {
        localStorage.setItem("quizHighScore", score);
        highScoreDisplay.textContent = score;
        newHighScore.classList.remove("hidden");
    } else {
        newHighScore.classList.add("hidden");
    }
}

function showReview() {
    resultScreen.classList.add("hidden");
    reviewScreen.classList.remove("hidden");
    reviewList.innerHTML = "";

    userAnswers.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `
            <div class="q">${i + 1}. ${item.question}</div>
            <div class="answer ${item.isCorrect ? "correct-answer" : "wrong-answer"}">
                Jawaban kamu: ${item.userAnswer}
            </div>
            ${!item.isCorrect ? `<div class="answer correct-answer">Jawaban benar: ${item.correctAnswer}</div>` : ""}
        `;
        reviewList.appendChild(div);
    });
}

// ===== EVENTS =====
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
skipBtn.addEventListener("click", skipQuestion);
restartBtn.addEventListener("click", () => {
    startScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
});
reviewBtn.addEventListener("click", showReview);
backToResultBtn.addEventListener("click", () => {
    reviewScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});