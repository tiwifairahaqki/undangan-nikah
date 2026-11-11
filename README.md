# Undangan Pernikahan Digital — Andi & Siti

Website undangan pernikahan statis menggunakan HTML, CSS, dan Vanilla JavaScript. Dapat dibuka secara lokal dan dipublikasikan gratis melalui GitHub Pages.

## Isi proyek

- `index.html` — struktur halaman undangan.
- `style.css` — tema, layout responsif, animasi.
- `script.js` — data undangan, countdown, RSVP WhatsApp, musik, galeri, navigasi.
- `assets/images/` — gambar placeholder JPG yang dapat langsung tampil.
- `assets/music/` — tempat file musik MP3.
- `assets/icons/` — favicon SVG.

## Mengubah data undangan

Buka `script.js`, lalu ubah objek `WEDDING` di bagian paling atas:

```js
const WEDDING = {
  groom: "Andi Pratama",
  bride: "Siti Rahma",
  date: "2026-12-20T08:00:00+07:00",
  whatsapp: "6281234567890",
  bankAccount: "123456789012"
};
```

- `date`: format `YYYY-MM-DDTHH:mm:ss+07:00`. Gunakan zona waktu yang sesuai lokasi acara.
- `whatsapp`: nomor WhatsApp tujuan dengan kode negara, tanpa `+`, spasi, atau tanda hubung. Contoh Indonesia: `62812...`.
- `bankAccount`: ganti nomor dummy sebelum website dipublikasikan.

Nama, orang tua, alamat, jam acara, dan tautan Google Maps ditulis di `index.html`. Gunakan fitur pencarian (Ctrl+F) untuk menemukan teks contoh seperti `Gedung Pernikahan`, `Jl. Contoh`, `Andi Pratama`, dan `Siti Rahma`.

## Mengganti foto

Ganti file gambar di `assets/images/` dengan foto milik sendiri, tetapi pertahankan nama file agar tautan tidak perlu diubah:

- `cover.jpg`
- `pasangan1.jpg`
- `pasangan2.jpg`
- `gallery1.jpg`
- `gallery2.jpg`
- `gallery3.jpg`

Disarankan memakai foto landscape untuk cover dan foto resolusi cukup tinggi untuk galeri. Kompres foto agar website cepat dibuka di ponsel.

## Menambahkan musik

Salin file MP3 milik sendiri ke:

`assets/music/wedding.mp3`

Nama file harus `wedding.mp3`. Browser umumnya memblokir autoplay sebelum ada interaksi pengguna; karena itu musik mulai dicoba setelah tombol **Buka Undangan** ditekan. Pengunjung tetap dapat mengontrol musik dari tombol ♫.

## RSVP WhatsApp dan Google Sheets

Saat ini RSVP membuka WhatsApp dengan pesan yang sudah terisi. Website tidak menyimpan data RSVP sendiri.

Untuk menyimpan RSVP ke Google Sheets di masa mendatang, buat Google Apps Script Web App sebagai endpoint, lalu tambahkan `fetch()` ke endpoint tersebut pada bagian komentar `Integrasi Google Sheets` di `script.js`. Atur akses dan validasi endpoint dengan hati-hati; jangan menaruh kredensial rahasia di JavaScript publik.

## Menjalankan secara lokal

1. Ekstrak ZIP.
2. Buka folder `undangan-pernikahan`.
3. Klik dua kali `index.html` untuk membuka di browser.

Untuk pengalaman lokal yang lebih konsisten, jalankan server statis sederhana dari folder proyek, misalnya melalui ekstensi Live Server di VS Code.

## Publikasi gratis dengan GitHub Pages

1. Masuk ke [GitHub](https://github.com/) dan login atau buat akun.
2. Klik **New repository**.
3. Isi nama repository, misalnya `undangan-pernikahan`.
4. Pilih **Public**, lalu klik **Create repository**.
5. Di halaman repository, klik **Add file → Upload files**.
6. Unggah seluruh isi folder proyek: `index.html`, `style.css`, `script.js`, `README.md`, dan folder `assets` beserta isinya. Pastikan `index.html` berada di root repository, bukan di dalam folder tambahan.
7. Klik **Commit changes**.
8. Buka **Settings → Pages**.
9. Pada **Build and deployment**, pilih **Deploy from a branch**.
10. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
11. Tunggu proses publikasi selesai. URL biasanya berbentuk `https://USERNAME.github.io/undangan-pernikahan/`.
12. Uji URL di ponsel dan komputer.

## Link personal untuk tamu

Tambahkan parameter `to` di akhir URL:

`https://USERNAME.github.io/undangan-pernikahan/?to=Bapak%20Ahmad`

Contoh lain:

`https://USERNAME.github.io/undangan-pernikahan/?to=Keluarga%20Bapak%20Ahmad`

Spasi pada nama tamu dapat ditulis sebagai `%20`.

## Checklist sebelum dibagikan

- [ ] Ganti seluruh foto placeholder.
- [ ] Tambahkan `assets/music/wedding.mp3` jika ingin musik.
- [ ] Periksa tanggal dan zona waktu.
- [ ] Ganti nomor WhatsApp.
- [ ] Ganti rekening dummy dengan data yang benar, atau hapus bagian hadiah.
- [ ] Ganti alamat dan tautan Google Maps dengan lokasi sebenarnya.
- [ ] Uji RSVP, tombol salin rekening, lightbox, navigasi, dan tampilan mobile.
- [ ] Pastikan informasi pribadi yang ditampilkan memang boleh dipublikasikan.

## Catatan

Font Google Fonts memerlukan koneksi internet. Jika ingin sepenuhnya offline, unduh font berlisensi yang sesuai dan ubah referensinya di CSS/HTML. Musik MP3 tidak disertakan karena pengguna perlu menambahkan file audio miliknya sendiri.
