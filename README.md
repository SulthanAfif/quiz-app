# Belajar Frontend Development.

## Live Demo
https://quiz-app-nine-beige-85.vercel.app/

# Quiz App Pro

Aplikasi kuis interaktif tentang Frontend Development (HTML, CSS, dan JavaScript). Dibuat menggunakan **HTML, CSS, dan JavaScript** murni.

Project ini cocok untuk portfolio karena sudah dilengkapi banyak fitur seperti kategori, tingkat kesulitan, sistem nyawa, timer, high score, dan review jawaban.

---

## Fitur Lengkap

### Setup Kuis
- Pilih **Kategori**: HTML / CSS / JavaScript / Campuran
- Pilih **Tingkat Kesulitan**:
  - Mudah → 20 detik per soal + tombol Lewati
  - Sedang → 15 detik per soal + tombol Lewati
  - Sulit → 10 detik per soal (tanpa tombol Lewati)

### Saat Bermain
- 10 pertanyaan pilihan ganda
- **Timer** countdown per soal
- **Sistem Nyawa** (3 nyawa)
- Progress bar
- Skor real-time
- Soal diacak setiap kali bermain
- Tombol **Lewati** (kecuali mode Sulit)

### Setelah Selesai
- Tampilan skor + persentase
- Pesan hasil berdasarkan performa
- **High Score** tersimpan di localStorage
- **Review Jawaban** (lihat soal yang salah + jawaban benar)
- Tombol Main Lagi

### Lainnya
- Dark Mode
- Animasi & transisi halus
- Responsif (HP & Desktop)

---

## Tech Stack

- HTML5
- CSS3 (CSS Variables + Dark Mode)
- JavaScript (Vanilla)
- localStorage

---

## Cara Menjalankan

1. Clone repository ini:
   ```bash
   git clone https://github.com/SulthanAfif/quiz-app.git
   ```

## Cara Bermain

1. Pilih Kategori dan Tingkat Kesulitan
2. Klik Mulai Kuis
3. Jawab pertanyaan sebelum waktu habis
4. Jawaban benar → hijau, salah → merah + nyawa berkurang
5. Klik Selanjutnya untuk lanjut
6. Di akhir kuis, lihat skor dan review jawaban

## Struktur File
```
quiz-app/
├── index.html      # Struktur halaman
├── style.css       # Tampilan & dark mode
├── script.js       # Logika kuis
└── README.md       # Dokumentasi
```

## Pengembangan Selanjutnya (Ide)

- Tambah lebih banyak soal
- Mode Multiplayer (local)
- Sound effect saat benar/salah
- Leaderboard global (butuh backend)
- Mode Survival (terus sampai nyawa habis)
