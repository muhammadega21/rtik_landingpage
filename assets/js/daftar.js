// Email Validation Realtime
const emailInput = document.getElementById("email");
const emailFeedback = document.querySelector(".email-feedback");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener("input", function () {
  const email = this.value.trim();

  if (email === "") {
    emailInput.classList.remove("email-valid", "email-invalid");
    emailFeedback.textContent = "";
  } else if (emailRegex.test(email)) {
    emailInput.classList.remove("email-invalid");
    emailInput.classList.add("email-valid");
    emailFeedback.innerHTML =
      '<span class="email-valid-text">✓ Email valid</span>';
  } else {
    emailInput.classList.remove("email-valid");
    emailInput.classList.add("email-invalid");
    emailFeedback.innerHTML =
      '<span class="email-invalid-text">✗ Email tidak valid</span>';
  }
});

const waInput = document.getElementById("wa");
waInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.startsWith("0")) {
    value = "62" + value.substring(1);
  }

  if (value && !value.startsWith("62")) {
    value = "62" + value;
  }

  this.value = value;
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz011yVO2MS8cUxgURoqq7-84ZDpcpSMRefRTE2rXSl0lmEiRltQBNoyxbox1Ww_RtD2g/exec";
const form = document.getElementById("daftarForm");
const submitBtn = form.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.innerHTML;

const preventCloseHandler = (e) => {
  e.preventDefault();
  e.returnValue = "";
  return "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  window.addEventListener("beforeunload", preventCloseHandler);

  Swal.fire({
    title: "Mengirim Data Pendaftaran",
    html: '<div style="font-size: 16px; margin: 20px 0;"><p>Sedang mengirim data pendaftaran Anda...</p><p style="color: #ef4444; font-weight: bold; margin-top: 15px;">⚠️ Jangan tutup browser!</p></div>',
    icon: "warning",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: async () => {
      Swal.showLoading();
    },
  });

  const formData = new FormData(form);
  fetch(scriptURL, { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      window.removeEventListener("beforeunload", preventCloseHandler);

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text:
            data.message ||
            "Pendaftaran berhasil! Terima kasih telah bergabung dengan kami.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          form.reset();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: data.message || "Terjadi kesalahan saat mendaftar",
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#ef4444",
        });
      }
    })
    .catch((err) => {
      console.error("Gagal:", err);

      window.removeEventListener("beforeunload", preventCloseHandler);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Gagal kirim data: " + err.message,
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#ef4444",
      });
    });
});
