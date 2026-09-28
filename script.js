// ========== Dark Mode ==========
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

// ========== Quiz Data ==========
const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Tag mana yang digunakan untuk membuat hyperlink di HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Properti CSS mana yang digunakan untuk mengubah warna teks?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Apa kepanjangan dari CSS?",
        options: [
            "Computer Style Sheet",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Method JavaScript mana yang digunakan untuk memilih elemen berdasarkan ID?",
        options: [
            "document.querySelector()",
            "document.getElementById()",
            "document.getElementsByClass()",
            "document.find()"
        ],
        correct: 1
    },
    {
        question: "Manakah yang termasuk framework JavaScript?",
        options: ["Laravel", "Django", "React", "Flask"],
        correct: 2
    },
    {
        question: "Apa fungsi dari localStorage di browser?",
        options: [
            "Menyimpan data secara permanen di server",
            "Menyimpan data di browser pengguna",
            "Menghapus cache otomatis",
            "Menghubungkan ke database"
        ],
        correct: 1
    },
    {
        question: "Tag HTML mana yang digunakan untuk menampilkan gambar?",
        options: ["<picture>", "<img>", "<image>", "<src>"],
        correct: 1
    },
    {
        question: "Apa arti dari 'responsive design'?",
        options: [
            "Website yang cepat loading",
            "Website yang tampilannya menyesuaikan ukuran layar",
            "Website yang hanya untuk desktop",
            "Website dengan animasi banyak"
        ],
        correct: 1
    },
    {
        question: "Manakah cara yang benar untuk mendeklarasikan variabel di JavaScript modern?",
        options: ["var nama = 'Budi'", "let nama = 'Budi'", "variable nama = 'Budi'", "nama := 'Budi'"],
        correct: 1
    }
];

// ========== State ==========
let currentQuestion = 0;
let score = 0;
let answered = false;

// ========== Elements ==========
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

// ========== Functions ==========
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");

    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionNumber.textContent = `Pertanyaan ${currentQuestion + 1}/${questions.length}`;
    scoreDisplay.textContent = `Skor: ${score}`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    if (selectedIndex === q.correct) {
        score++;
        scoreDisplay.textContent = `Skor: ${score}`;
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
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = score;

    if (score === 10) {
        resultMessage.textContent = "Sempurna! Kamu jenius! 🔥";
    } else if (score >= 7) {
        resultMessage.textContent = "Bagus! Pengetahuanmu cukup baik 👍";
    } else if (score >= 4) {
        resultMessage.textContent = "Lumayan, tapi masih bisa lebih baik 💪";
    } else {
        resultMessage.textContent = "Jangan menyerah, coba lagi ya! 😊";
    }
}

// ========== Events ==========
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);