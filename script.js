
/* =========================================
   WEBSITE UNDANGAN PERNIKAHAN
   File: script.js
========================================= */

/* =========================================
   1. DATA UNDANGAN
   Ubah informasi sesuai kebutuhan
========================================= */

const WEDDING = {
    groom: {
        name: "Ahmad",
        fullName: "Ahmad Putra",
        father: "Bapak Nama Ayah",
        mother: "Ibu Nama Ibu"
    },

    bride: {
        name: "Aisyah",
        fullName: "Aisyah Putri",
        father: "Bapak Nama Ayah",
        mother: "Ibu Nama Ibu"
    },

    date: "2027-06-20T08:00:00",

    event: {
        akad: {
            date: "Minggu, 20 Juni 2027",
            time: "08.00 WIB - Selesai",
            location: "Kediaman Mempelai Wanita",
            address: "Alamat lengkap lokasi acara"
        },

        reception: {
            date: "Minggu, 20 Juni 2027",
            time: "11.00 WIB - Selesai",
            location: "Kediaman Mempelai Wanita",
            address: "Alamat lengkap lokasi acara"
        }
    },

    mapUrl: "https://maps.google.com",

    whatsapp: "6281234567890",

    bank: {
        name: "Bank BCA",
        account: "1234567890",
        owner: "Nama Pemilik Rekening"
    }
};


/* =========================================
   2. HELPER FUNCTION
========================================= */

function getElement(selector) {
    return document.querySelector(selector);
}

function getElements(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================
   3. NAMA TAMU DARI URL
   Contoh:
   website.com/?to=Hamdan
========================================= */

function setGuestName() {
    const params = new URLSearchParams(window.location.search);

    const guestName = params.get("to");

    const guestElements = [
        "#guest-name",
        ".guest-name"
    ];

    guestElements.forEach(selector => {
        const element = getElement(selector);

        if (element) {
            element.textContent = guestName
                ? decodeURIComponent(guestName.replace(/\+/g, " "))
                : "Tamu Undangan";
        }
    });
}


/* =========================================
   4. MENGISI DATA MEMPELAI
========================================= */

function setWeddingInformation() {
    const groomName = getElement("#groom-name");
    const brideName = getElement("#bride-name");

    const groomFullName = getElement("#groom-fullname");
    const brideFullName = getElement("#bride-fullname");

    if (groomName) {
        groomName.textContent = WEDDING.groom.name;
    }

    if (brideName) {
        brideName.textContent = WEDDING.bride.name;
    }

    if (groomFullName) {
        groomFullName.textContent = WEDDING.groom.fullName;
    }

    if (brideFullName) {
        brideFullName.textContent = WEDDING.bride.fullName;
    }

    const akadDate = getElement("#akad-date");
    const akadTime = getElement("#akad-time");
    const akadLocation = getElement("#akad-location");

    const receptionDate = getElement("#reception-date");
    const receptionTime = getElement("#reception-time");
    const receptionLocation = getElement("#reception-location");

    if (akadDate) {
        akadDate.textContent = WEDDING.event.akad.date;
    }

    if (akadTime) {
        akadTime.textContent = WEDDING.event.akad.time;
    }

    if (akadLocation) {
        akadLocation.textContent = WEDDING.event.akad.location;
    }

    if (receptionDate) {
        receptionDate.textContent = WEDDING.event.reception.date;
    }

    if (receptionTime) {
        receptionTime.textContent = WEDDING.event.reception.time;
    }

    if (receptionLocation) {
        receptionLocation.textContent = WEDDING.event.reception.location;
    }

    const mapButton = getElement("#map-button");

    if (mapButton) {
        mapButton.href = WEDDING.mapUrl;
        mapButton.target = "_blank";
    }
}


/* =========================================
   5. BUKA UNDANGAN
========================================= */

function openInvitation() {
    const openButton = getElement("#open-invitation");
    const cover = getElement("#cover");
    const mainContent = getElement("#main-content");

    if (!openButton) return;

    openButton.addEventListener("click", function () {

        if (cover) {
            cover.classList.add("hide-cover");
        }

        if (mainContent) {
            mainContent.classList.remove("hidden");
        }

        document.body.classList.remove("no-scroll");

        // Putar musik setelah tombol dibuka
        playMusic();

        // Mulai animasi
        revealOnScroll();

    });
}


/* =========================================
   6. COUNTDOWN PERNIKAHAN
========================================= */

function startCountdown() {
    const countdown = getElement("#countdown");

    if (!countdown) return;

    const daysElement = getElement("#days");
    const hoursElement = getElement("#hours");
    const minutesElement = getElement("#minutes");
    const secondsElement = getElement("#seconds");

    const weddingDate = new Date(WEDDING.date).getTime();

    function updateCountdown() {
        const now = new Date().getTime();

        const distance = weddingDate - now;

        if (distance <= 0) {
            countdown.innerHTML = "Acara pernikahan telah dimulai!";
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        if (daysElement) {
            daysElement.textContent = days;
        }

        if (hoursElement) {
            hoursElement.textContent = hours;
        }

        if (minutesElement) {
            minutesElement.textContent = minutes;
        }

        if (secondsElement) {
            secondsElement.textContent = seconds;
        }
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}


/* =========================================
   7. MUSIK BACKGROUND
   File musik:
   assets/music/wedding.mp3
========================================= */

function playMusic() {
    const music = getElement("#background-music");
    const musicButton = getElement("#music-button");

    if (!music) return;

    music.play()
        .then(() => {
            if (musicButton) {
                musicButton.classList.add("playing");
            }
        })
        .catch(error => {
            console.log("Musik belum dapat diputar:", error);
        });
}

function toggleMusic() {
    const music = getElement("#background-music");
    const musicButton = getElement("#music-button");

    if (!music) return;

    if (music.paused) {
        music.play()
            .then(() => {
                if (musicButton) {
                    musicButton.classList.add("playing");
                }
            })
            .catch(error => {
                console.log("Musik gagal diputar:", error);
            });
    } else {
        music.pause();

        if (musicButton) {
            musicButton.classList.remove("playing");
        }
    }
}

function initializeMusic() {
    const musicButton = getElement("#music-button");

    if (musicButton) {
        musicButton.addEventListener("click", toggleMusic);
    }
}


/* =========================================
   8. RSVP MELALUI WHATSAPP
========================================= */

function sendRSVP() {
    const form = getElement("#rsvp-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = getElement("#rsvp-name");
        const attendanceInput = getElement("#attendance");
        const guestCountInput = getElement("#guest-count");

        const name = nameInput
            ? nameInput.value.trim()
            : "";

        const attendance = attendanceInput
            ? attendanceInput.value
            : "";

        const guestCount = guestCountInput
            ? guestCountInput.value
            : "1";

        if (!name || !attendance) {
            alert("Mohon lengkapi nama dan konfirmasi kehadiran.");
            return;
        }

        const message = `
Assalamu'alaikum.

Saya ingin mengonfirmasi undangan pernikahan.

Nama: ${name}
Konfirmasi: ${attendance}
Jumlah tamu: ${guestCount}

Terima kasih.
        `;

        const whatsappUrl =
            `https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");
    });
}


/* =========================================
   9. DIGITAL GIFT
   Tombol salin nomor rekening
========================================= */

function copyAccountNumber() {
    const copyButton = getElement("#copy-account");

    if (!copyButton) return;

    copyButton.addEventListener("click", async function () {

        try {
            await navigator.clipboard.writeText(WEDDING.bank.account);

            copyButton.textContent = "Berhasil Disalin!";

            setTimeout(() => {
                copyButton.textContent = "Salin Nomor Rekening";
            }, 2000);

        } catch (error) {
            alert(
                "Tidak dapat menyalin otomatis. Nomor rekening: " +
                WEDDING.bank.account
            );
        }
    });
}


/* =========================================
   10. GALERI FOTO / LIGHTBOX
========================================= */

function initializeGallery() {
    const galleryImages = getElements(".gallery img");

    const lightbox = getElement("#lightbox");
    const lightboxImage = getElement("#lightbox-image");
    const closeButton = getElement("#lightbox-close");

    if (!lightbox || !lightboxImage) return;

    galleryImages.forEach(image => {

        image.addEventListener("click", function () {

            lightboxImage.src = image.src;

            lightbox.classList.add("active");

        });

    });

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            lightbox.classList.remove("active");
        });
    }

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            lightbox.classList.remove("active");
        }

    });
}


/* =========================================
   11. NAVIGASI MOBILE
========================================= */

function initializeNavigation() {
    const menuButton = getElement("#menu-button");
    const navigation = getElement("#navigation");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("active");
        menuButton.classList.toggle("active");
    });

    const navLinks = getElements("#navigation a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {
            navigation.classList.remove("active");
            menuButton.classList.remove("active");
        });

    });
}


/* =========================================
   12. ANIMASI SCROLL REVEAL
========================================= */

function revealOnScroll() {
    const revealElements = getElements(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================
   13. TOMBOL KEMBALI KE ATAS
========================================= */

function initializeBackToTop() {
    const backToTopButton = getElement("#back-to-top");

    if (!backToTopButton) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================
   14. TOMBOL TAMBAH KE KALENDER
========================================= */

function initializeCalendar() {
    const calendarButton = getElement("#calendar-button");

    if (!calendarButton) return;

    calendarButton.addEventListener("click", function () {

        const startDate = new Date(WEDDING.date);

        const endDate = new Date(
            startDate.getTime() + 3 * 60 * 60 * 1000
        );

        function formatDate(date) {
            return date.toISOString()
                .replace(/-|:|\.\d{3}/g, "");
        }

        const calendarUrl =
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent(
                "Pernikahan " +
                WEDDING.groom.name +
                " & " +
                WEDDING.bride.name
            ) +
            "&dates=" +
            formatDate(startDate) +
            "/" +
            formatDate(endDate) +
            "&details=" +
            encodeURIComponent("Acara pernikahan");

        window.open(calendarUrl, "_blank");

    });
}


/* =========================================
   15. INISIALISASI WEBSITE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    setGuestName();

    setWeddingInformation();

    openInvitation();

    startCountdown();

    initializeMusic();

    sendRSVP();

    copyAccountNumber();

    initializeGallery();

    initializeNavigation();

    revealOnScroll();

    initializeBackToTop();

    initializeCalendar();

    console.log("Website undangan berhasil dimuat!");

});
