// ============================================
// 1. DARK MODE
// ============================================
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeToggle.textContent = "🌙";
        localStorage.setItem("darkMode", "disabled");
    }
});

// ============================================
// 2. DATA SOAL
// Setiap soal punya: pertanyaan, pilihan, dan index jawaban benar
// ============================================
const allQuestions = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0
    },
    {
        question: "Tag mana yang digunakan untuk membuat hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Properti CSS untuk mengubah warna teks adalah?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Apa kepanjangan CSS?",
        options: ["Computer Style Sheet", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    },
    {
        question: "Cara memilih elemen berdasarkan ID di JavaScript?",
        options: ["document.querySelector()", "document.getElementById()", "document.getElementsByClass()", "document.find()"],
        correct: 1
    },
    {
        question: "Manakah yang termasuk library/framework JavaScript?",
        options: ["Laravel", "Django", "React", "Flask"],
        correct: 2
    },
    {
        question: "Fungsi localStorage adalah?",
        options: ["Menyimpan data di server", "Menyimpan data di browser pengguna", "Menghapus cache", "Menghubungkan database"],
        correct: 1
    },
    {
        question: "Tag HTML untuk menampilkan gambar?",
        options: ["<picture>", "<img>", "<image>", "<src>"],
        correct: 1
    },
    {
        question: "Apa arti responsive design?",
        options: ["Website cepat loading", "Tampilan menyesuaikan ukuran layar", "Hanya untuk desktop", "Banyak animasi"],
        correct: 1
    },
    {
        question: "Cara deklarasi variabel modern di JavaScript?",
        options: ["var nama = 'Budi'", "let nama = 'Budi'", "variable nama = 'Budi'", "nama := 'Budi'"],
        correct: 1
    }
];

// ============================================
// 3. STATE (kondisi aplikasi)
// ============================================
let questions = [];          // soal yang sedang dipakai (setelah diacak)
let currentQuestion = 0;     // index soal saat ini
let score = 0;               // skor pemain
let answered = false;        // apakah sudah menjawab
let timer;                   // untuk setInterval
let timeLeft = 15;           // sisa waktu
let userAnswers = [];        // menyimpan jawaban user (untuk review)

// ============================================
// 4. AMBIL ELEMEN HTML
// ============================================
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const reviewScreen = document.getElementById("reviewScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const reviewBtn = document.getElementById("reviewBtn");
const backToResultBtn = document.getElementById("backToResultBtn");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const newHighScore = document.getElementById("newHighScore");
const reviewList = document.getElementById("reviewList");

// Tampilkan high score saat halaman dibuka
highScoreDisplay.textContent = localStorage.getItem("quizHighScore") || 0;

// ============================================
// 5. FUNGSI UTAMA
// ============================================

// Acak array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    const arr = [...array]; // copy biar tidak ubah aslinya
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startQuiz() {
    // Acak soal setiap kali mulai
    questions = shuffleArray(allQuestions);
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    answered = false;

    // Pindah ke layar kuis
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    reviewScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    timeLeft = 15;

    const q = questions[currentQuestion];

    // Update tampilan
    questionText.textContent = q.question;
    questionNumber.textContent = `Pertanyaan ${currentQuestion + 1}/${questions.length}`;
    scoreDisplay.textContent = score;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    // Buat tombol pilihan jawaban
    optionsContainer.innerHTML = "";
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    // Mulai timer
    startTimer();
}

function startTimer() {
    clearInterval(timer); // bersihkan timer sebelumnya
    timerDisplay.textContent = timeLeft;
    timerDisplay.className = "";

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Ubah warna timer
        if (timeLeft <= 5) {
            timerDisplay.className = "danger";
        } else if (timeLeft <= 8) {
            timerDisplay.className = "warning";
        }

        // Waktu habis
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Anggap tidak menjawab (salah)
            selectOption(-1);
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;
    clearInterval(timer); // hentikan timer

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    // Tandai jawaban benar & salah
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    // Simpan jawaban user untuk review
    userAnswers.push({
        question: q.question,
        userAnswer: selectedIndex === -1 ? "Tidak dijawab" : q.options[selectedIndex],
        correctAnswer: q.options[q.correct],
        isCorrect: selectedIndex === q.correct
    });

    // Tambah skor jika benar
    if (selectedIndex === q.correct) {
        score++;
        scoreDisplay.textContent = score;
    }

    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = score;
    const percent = Math.round((score / questions.length) * 100);
    percentage.textContent = `${percent}%`;

    // Pesan berdasarkan skor
    if (score === 10) {
        resultMessage.textContent = "Sempurna! Kamu jenius! 🔥";
    } else if (score >= 7) {
        resultMessage.textContent = "Bagus! Pengetahuanmu bagus 👍";
    } else if (score >= 4) {
        resultMessage.textContent = "Lumayan, masih bisa lebih baik 💪";
    } else {
        resultMessage.textContent = "Jangan menyerah, coba lagi ya! 😊";
    }

    // Cek High Score
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

// ============================================
// 6. EVENT LISTENER
// ============================================
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
reviewBtn.addEventListener("click", showReview);
backToResultBtn.addEventListener("click", () => {
    reviewScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});