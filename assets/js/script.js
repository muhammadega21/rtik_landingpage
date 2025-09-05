const navbar = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link a");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.querySelector(".nav-mobile-menu");

// Navbar
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (mobileMenu.classList.contains("show")) {
      mobileMenu.classList.remove("show");
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
  } else {
    mobileMenu.style.display = "flex";
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add("show");
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

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card.hidden");
  const loadMoreBtn = document.getElementById("load-more");
  const step = 3; // jumlah yang ditampilkan setiap klik
  let index = 0;

  loadMoreBtn.addEventListener("click", function () {
    for (let i = 0; i < step; i++) {
      if (index < cards.length) {
        cards[index].classList.remove("hidden");
        cards[index].classList.add("show");
        index++;
      }
    }

    if (index >= cards.length) {
      loadMoreBtn.style.display = "none";
    }
  });
});

// FAQ
document.addEventListener("DOMContentLoaded", function () {
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



// bagian animate on scroll
document.addEventListener("DOMContentLoaded", function () {
  const animatedSections = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // biar animasi cuma sekali
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedSections.forEach((section) => observer.observe(section));
});

