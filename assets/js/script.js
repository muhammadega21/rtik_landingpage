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

//bagian faq
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Tutup semua sebelum buka yang diklik
      faqItems.forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
});
