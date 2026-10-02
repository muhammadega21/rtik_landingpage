const navbar = document.querySelector("nav");
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link a");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.querySelector(".nav-mobile-menu");
const kegiatanCards = document.querySelectorAll("#kegiatan .card");
const seeMoreBtn = document.getElementById("see-more");
const progressBar = document.getElementById("scroll-progress-bar");
const scrollToTopButton = document.getElementById("scroll-to-top");
const hero = document.getElementById("hero");

// Hero particles: dibuat lewat JS agar tidak perlu library tambahan.
function createHeroParticles() {
  if (!hero) return;

  const container = hero.querySelector(".hero-particles");
  if (!container || container.children.length) return;

  const particleCount = window.innerWidth < 768 ? 18 : 30;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "hero-particle";
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--y", `${Math.random() * 100}%`);
    particle.style.setProperty("--size", `${Math.random() * 2.8 + 1}px`);
    particle.style.setProperty("--duration", `${Math.random() * 10 + 12}s`);
    particle.style.setProperty("--delay", `${Math.random() * -12}s`);
    particle.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 80}px`);
    particle.style.setProperty("--drift-y", `${(Math.random() - 0.5) * 70}px`);
    container.appendChild(particle);
  }
}

createHeroParticles();

// Navbar / smooth scroll
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    // Hanya proses link anchor dalam halaman yang sama
    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    e.preventDefault();

    if (mobileMenu?.classList.contains("show")) {
      mobileMenu.classList.remove("show");
      if (menuToggle) {
        menuToggle.src = "./assets/img/menu.svg";
      }

      setTimeout(() => {
        if (mobileMenu) mobileMenu.style.display = "none";
      }, 300);
    }

    const headerOffset = header?.offsetHeight || 70;

    window.scrollTo({
      top: targetElement.offsetTop - headerOffset,
      behavior: "smooth",
    });
  });
});

// Scroll UI: progress bar, active navigation, navbar shadow, scroll-to-top.
let ticking = false;

function updateScrollUI() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxScroll = Math.max(documentHeight - viewportHeight, 1);
  const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (scrollToTopButton) {
    const shouldShow = scrollTop > 420;
    scrollToTopButton.classList.toggle("show", shouldShow);
    scrollToTopButton.setAttribute("aria-hidden", String(!shouldShow));
  }

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 16);
  }

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      const id = section.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  },
  { passive: true },
);

window.addEventListener("load", updateScrollUI);
window.addEventListener("resize", updateScrollUI);

// Scroll to top
scrollToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu
menuToggle?.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!mobileMenu) return;

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
    mobileMenu &&
    !e.target.closest(".nav-mobile") &&
    mobileMenu.classList.contains("show")
  ) {
    mobileMenu.classList.remove("show");
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 300);
    if (menuToggle) menuToggle.src = "./assets/img/menu.svg";
  }
});

// Divisi Section
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    if (!card) return;

    const shortText = card.querySelector(".short-text");
    const fullText = card.querySelector(".full-text");
    if (!shortText || !fullText) return;

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
  card.style.display = index < cardsVisible ? "block" : "none";
});

let isSeeMore = true;

seeMoreBtn?.addEventListener("click", () => {
  if (isSeeMore) {
    cardsVisible = 9;
    seeMoreBtn.textContent = "Show Less";
  } else {
    cardsVisible = 3;
    seeMoreBtn.textContent = "Show More";
  }
  isSeeMore = !isSeeMore;

  kegiatanCards.forEach((card, index) => {
    card.style.display = index < cardsVisible ? "block" : "none";
  });
});

// FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
});

// Contact form -> WhatsApp
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name")?.value || "";
  const message = document.getElementById("message")?.value || "";
  const whatsappNumber = "6282285022787";

  const text = `*Nama:* ${name}%0A` + `*Pesan:* ${message}`;
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  window.open(url, "_blank");
  contactForm.reset();
});
