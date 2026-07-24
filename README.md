# 🚀 Wahyu's Plan — Personal Workspace & Notion-Style Productivity App

**Wahyu's Plan** adalah web application modern ala Notion yang didesain khusus untuk mengelola projek robotika (Technocorner 2026, STM32, Kinematics), tugas harian, prestasi lomba, dan ekuivalensi RPL (Rekognisi Pembelajaran Lampau) akademik Kak Wahyu.

---

## ✨ Fitur Utama

- 🔒 **Google OAuth Security & Lock System** — Membatasi hak edit, tambah, dan hapus data secara aman. Hanya pemilik akun Google **`handoyotriwahyu@gmail.com`** yang dapat beralih ke **Mode Edit**. Pengunjung publik otomatis berada dalam **Mode Baca (Read-only)**.
- 📋 **Kanban Board Plan** — Pengaturan status tugas (*Akan Dikerjakan*, *Sedang Dikerjakan*, *Review & Testing*, *Selesai*) secara modular.
- 📝 **Notion-Style Document Editor** — Editor catatan rich-text terintegrasi dengan kustomisasi ikon emoji, judul dokumen, quotes, format heading (H1, H2, H3), list, serta auto-save.
- ⚡ **Target & Focus Hari Ini** — Dashboard pemantauan target harian yang dilengkapi dengan widget checklist dan progress bar dinamis.
- 📱 **Mobile Optimized** — Antarmuka responsif untuk perangkat seluler / browser Telegram dengan navigasi sidebar geser (slide-in) dan Kanban horizontal swipe.
- 💾 **Auto-Save LocalStorage & Backup** — Data tersimpan otomatis di web storage browser lokal Anda. Dilengkapi fitur ekspor/impor cadangan data berformat JSON.

---

## ⚙️ Cara Mengubah Google Client ID (Jika Diperlukan)

Aplikasi ini menggunakan **Google Identity Services API** untuk integrasi tombol Sign In. Client ID bawaan dikonfigurasi untuk pengujian lokal dan domain GitHub Pages. Jika Anda ingin memindahkan aplikasi ini ke domain/hosting lain, Anda perlu mengupdate Client ID:

1. Buka file [index.html](file:///index.html)
2. Cari bagian kode berikut pada baris topbar:
   ```html
   data-client_id="1014243862700-jhkpv6ecug2n6925ajs59s48e5ubeo3f.apps.googleusercontent.com"
   ```
3. Ganti dengan Client ID milik Anda sendiri yang didapatkan dari [Google Cloud Console (Credentials)](https://console.cloud.google.com/).
4. Pastikan untuk mendaftarkan URL hosting baru Anda pada daftar **Authorized JavaScript origins** di Google Cloud Console.

---

## 🌐 Cara Deploy ke GitHub Pages

1. Pastikan repositori ini sudah di-push ke GitHub:
   ```bash
   git add .
   git commit -m "Update Wahyu's Plan - Google Auth security and mobile friendly"
   git branch -M main
   git remote add origin https://github.com/triwahyu45/Wahyus-Plan.git
   git push -u origin main
   ```

2. Di halaman repositori GitHub `triwahyu45/Wahyus-Plan`:
   - Buka menu **Settings** -> **Pages**
   - Di bawah bagian **Build and deployment**, pada opsi **Source**, pilih **`Deploy from a branch`**
   - Atur Branch ke: **`main`** / `/ (root)`
   - Klik **Save**.

3. Website Anda akan online dalam beberapa menit di:
   👉 **`https://triwahyu45.github.io/Wahyus-Plan`**

---

*Didesain secara khusus untuk Kak Wahyu | Didukung oleh Antigravity AI*
