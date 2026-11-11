
/* ==========================================
   JAVASCRIPT UNDANGAN PERNIKAHAN
   Sesuai dengan index.html Alya & Rizky
========================================== */

/* ==========================================
   1. KONFIGURASI UNDANGAN
   Ubah informasi di bagian ini saja
========================================== */

const CONFIG = {
    bride: "Alya Putri",
    groom: "Rizky Pratama",

    dateISO: "2026-12-20T08:00:00+07:00",
    dateText: "MINGGU, 20 DESEMBER 2026",

    akadDate: "Minggu, 20 Desember 2026",
    akadTime: "08.00 WIB – Selesai",

    resepsiDate: "Minggu, 20 Desember 2026",
    resepsiTime: "11.00 WIB – 16.00 WIB",

    venue: "Gedung / Nama Tempat Acara",
    address: "Alamat lengkap lokasi acara",

    mapsUrl: "https://maps.google.com/?q=Gedung+Pernikahan",

    whatsapp: "6281234567890",

    bank: "Bank BCA",
    account: "1234567890",
    accountHolder: "Nama Pemilik Rekening",

    musicUrl: ""
};


/* ==========================================
   2. HELPER
========================================== */

const $ = id => document.getElementById(id);


/* ==========================================
   3. MENERAPKAN DATA UNDANGAN
========================================== */

function applyConfig() {

    // Nama mempelai pada cover
    $("coverBride").textContent =
        CONFIG.bride.split(" ")[0];

    $("coverGroom").textContent =
        CONFIG.groom.split(" ")[0];

    // Nama lengkap mempelai
    $("brideName").textContent = CONFIG.bride;
    $("groomName").textContent = CONFIG.groom;

    // Nama pada footer
    $("footerNames").textContent =
        CONFIG.bride.split(" ")[0] +
        " & " +
        CONFIG.groom.split(" ")[0];

    // Tanggal undangan
    $("coverDate").textContent = CONFIG.dateText;

    // Informasi akad
    $("akadDate").textContent = CONFIG.akadDate;
    $("akadTime").textContent = CONFIG.akadTime;

    // Informasi resepsi
    $("resepsiDate").textContent = CONFIG.resepsiDate;
    $("resepsiTime").textContent = CONFIG.resepsiTime;

    // Lokasi acara
    $("venueName").textContent = CONFIG.venue;
    $("mapVenue").textContent = CONFIG.venue;

    $("venueAddress").textContent = CONFIG.address;
    $("mapAddress").textContent = CONFIG.address;

    // Google Maps
    $("mapLink").href = CONFIG.mapsUrl;
    $("mapLink2").href = CONFIG.mapsUrl;

    // Informasi rekening
    $("bankName").textContent = CONFIG.bank;
    $("accountNumber").textContent = CONFIG.account;

    $("accountHolder").textContent =
        "a.n. " + CONFIG.accountHolder;

    // Musik
    $("bgMusic").src = CONFIG.musicUrl;

    // Tahun footer
    $("year").textContent = new Date().getFullYear();

    // Nama tamu dari URL
    const params = new URLSearchParams(window.location.search);

    const guest = params.get("to");

    if (guest) {
        $("guestName").textContent = guest;
    } else {
        $("guestName").textContent = "Tamu Undangan";
    }
}


/* ==========================================
   4. MEMBUKA UNDANGAN
========================================== */

function openInvitation() {

    // Tampilkan seluruh konten
    $("content").classList.remove("hidden");

    // Tampilkan tombol musik
    $("musicBtn").classList.remove("hidden");

    // Aktifkan scroll halaman
    document.body.style.overflow = "auto";

    // Arahkan ke bagian isi undangan
    $("content").scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================
   5. COUNTDOWN PERNIKAHAN
========================================== */

function countdown() {

    const weddingDate = new Date(CONFIG.dateISO).getTime();

    const now = Date.now();

    let distance = Math.max(0, weddingDate - now);

    const days = Math.floor(distance / 86400000);

    const hours = Math.floor(
        (distance % 86400000) / 3600000
    );

    const minutes = Math.floor(
        (distance % 3600000) / 60000
    );

    const seconds = Math.floor(
        (distance % 60000) / 1000
    );

    $("days").textContent =
        String(days).padStart(2, "0");

    $("hours").textContent =
        String(hours).padStart(2, "0");

    $("minutes").textContent =
        String(minutes).padStart(2, "0");

    $("seconds").textContent =
        String(seconds).padStart(2, "0");

}


/* ==========================================
   6. RSVP WHATSAPP
========================================== */

function sendRSVP(event) {

    event.preventDefault();

    // Periksa nomor WhatsApp
    if (CONFIG.whatsapp === "6281234567890") {

        alert(
            "Silakan ganti nomor WhatsApp pada bagian CONFIG terlebih dahulu."
        );

        return;
    }

    // Ambil data formulir
    const name = $("rsvpName").value.trim();

    const attendance = $("attendance").value;

    const guestCount = $("guestCount").value;

    const wish = $("wish").value.trim() || "-";

    // Validasi nama
    if (!name) {

        alert("Silakan masukkan nama terlebih dahulu.");

        return;
    }

    // Susun pesan WhatsApp
    const message =
        `Konfirmasi undangan ${CONFIG.bride} & ${CONFIG.groom}\n\n` +
        `Nama: ${name}\n` +
        `Kehadiran: ${attendance}\n` +
        `Jumlah: ${guestCount}\n` +
        `Ucapan: ${wish}`;

    // Buat URL WhatsApp
    const whatsappURL =
        "https://wa.me/" +
        CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(message);

    // Buka WhatsApp
    window.open(whatsappURL, "_blank");

}


/* ==========================================
   7. SALIN NOMOR REKENING
========================================== */

function copyAccount() {

    const accountNumber = CONFIG.account;

    // Periksa dukungan clipboard
    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(accountNumber)

            .then(() => {

                alert("Nomor rekening berhasil disalin.");

            })

            .catch(() => {

                alert("Nomor rekening: " + accountNumber);

            });

    } else {

        // Fallback untuk browser yang tidak mendukung clipboard
        const textarea = document.createElement("textarea");

        textarea.value = accountNumber;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        try {

            document.execCommand("copy");

            alert("Nomor rekening berhasil disalin.");

        } catch (error) {

            alert("Nomor rekening: " + accountNumber);

        }

        document.body.removeChild(textarea);

    }

}


/* ==========================================
   8. MUSIK BACKGROUND
========================================== */

function toggleMusic() {

    const audio = $("bgMusic");

    const button = $("musicBtn");

    // Periksa apakah musik sudah diatur
    if (!CONFIG.musicUrl) {

        alert(
            "Silakan isi URL MP3 pada CONFIG.musicUrl terlebih dahulu."
        );

        return;
    }

    // Jika musik sedang berhenti
    if (audio.paused) {

        audio.play()

            .then(() => {

                button.textContent = "Ⅱ";

            })

            .catch(error => {

                console.log("Musik gagal diputar:", error);

                alert("Musik tidak dapat diputar.");

            });

    } else {

        // Jika musik sedang diputar
        audio.pause();

        button.textContent = "♫";

    }

}


/* ==========================================
   9. EVENT LISTENER AUDIO
========================================== */

function initializeAudio() {

    const audio = $("bgMusic");

    const button = $("musicBtn");

    audio.addEventListener("ended", function () {

        button.textContent = "♫";

    });

    audio.addEventListener("pause", function () {

        button.textContent = "♫";

    });

    audio.addEventListener("play", function () {

        button.textContent = "Ⅱ";

    });

}


/* ==========================================
   10. INISIALISASI WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Terapkan data undangan
    applyConfig();

    // Jalankan countdown
    countdown();

    // Perbarui countdown setiap detik
    setInterval(countdown, 1000);

    // Inisialisasi musik
    initializeAudio();

    console.log(
        "Website Undangan Pernikahan Alya & Rizky berhasil dimuat."
    );

});
