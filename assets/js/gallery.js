const menuToggle = document.getElementById("gallery-menu-toggle");
const mobileMenu = document.getElementById("gallery-mobile-menu");

function closeMobileMenu() {
  if (!mobileMenu) return;

  mobileMenu.classList.remove("show");

  if (menuToggle) {
    menuToggle.src = "./assets/img/menu.svg";
  }

  setTimeout(() => {
    if (!mobileMenu.classList.contains("show")) {
      mobileMenu.style.display = "none";
    }
  }, 300);
}

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();

  if (mobileMenu.classList.contains("show")) {
    closeMobileMenu();
    return;
  }

  mobileMenu.style.display = "flex";
  void mobileMenu.offsetWidth;
  mobileMenu.classList.add("show");
  menuToggle.src = "./assets/img/x.svg";
});

document.addEventListener("click", (event) => {
  if (
    mobileMenu &&
    mobileMenu.classList.contains("show") &&
    !event.target.closest(".nav-mobile")
  ) {
    closeMobileMenu();
  }
});

document.querySelectorAll("#gallery-mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Lightbox
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(image, title) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = image;
  lightboxImage.alt = title || "Preview gambar";
  lightboxTitle.textContent = title || "";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(item.dataset.image, item.dataset.title);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
