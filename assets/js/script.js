const navbar = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link a");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.querySelector(".nav-mobile-menu");
const kegiatanCards = document.querySelectorAll("#kegiatan .card");
const seeMoreBtn = document.getElementById("see-more");

// Navbar
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (mobileMenu.classList.contains("show")) {
      mobileMenu.classList.remove("show");
      menuToggle.src = "./assets/img/menu.svg";
      setTimeout(() => {
        mobileMenu.style.display = "none";
      }, 300);
    }

    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  sections.forEach((section) => {
    let sectionTop = section.offsetTop - 150;
    let sectionHeight = section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      let id = section.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Mobile menu
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  if (mobileMenu.classList.contains("show")) {
    mobileMenu.classList.remove("show");
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 300);
    menuToggle.src = "./assets/img/menu.svg";
  } else {
    mobileMenu.style.display = "flex";
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add("show");
    menuToggle.src = "./assets/img/x.svg";
  }
});

document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".nav-mobile") &&
    mobileMenu.classList.contains("show")
  ) {
    mobileMenu.classList.remove("show");
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 300);
  }
});

// Divisi Section
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    const shortText = card.querySelector(".short-text");
    const fullText = card.querySelector(".full-text");

    shortText.classList.toggle("hidden");
    fullText.classList.toggle("hidden");

    this.textContent = fullText.classList.contains("hidden")
      ? "Baca selengkapnya..."
      : "Tutup";
  });
});

// Kegiatan Section
const initialCardsToShow = 3;
let cardsVisible = initialCardsToShow;

kegiatanCards.forEach((card, index) => {
  if (index < cardsVisible) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
});

let isSeeMore = true;

seeMoreBtn.addEventListener("click", () => {
  if (isSeeMore) {
    cardsVisible = 6;
    seeMoreBtn.textContent = "See Less";
  } else {
    cardsVisible = 3;
    seeMoreBtn.textContent = "See More";
  }
  isSeeMore = !isSeeMore;

  kegiatanCards.forEach((card, index) => {
    if (index < cardsVisible) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// bagian faq
document.addEventListener("DOMContentLoaded", function () {
  // === FAQ ===
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Tutup semua sebelum buka yang diklik
      faqItems.forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });
      // Toggle item aktif
      item.classList.toggle("active");
    });
  });
});

// Message
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;
    let whatsappNumber = "6282285022787";

    let text = `*Nama:* ${name}%0A` + `*Pesan:* ${message}`;

    let url = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(url, "_blank");
    document.getElementById("contact-form").reset();
  });
