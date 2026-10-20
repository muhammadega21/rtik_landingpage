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
  "https://script.google.com/macros/s/AKfycbwRLDx4Kq4sxrVHfp4Sot9JhKt05IGak-XUBX-RDx6ONbTtucx3s5rjtpI19T5VjZ_Gfw/exec";
const form = document.getElementById("daftarForm");
const submitBtn = form.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.innerHTML;

// Dropdown Program Studi & Input Mahasiswa Luar Kampus
const prodiSelect = document.getElementById("prodiSelect");
const prodiLainnyaContainer = document.getElementById("prodiLainnyaContainer");
const prodiLainnya = document.getElementById("prodiLainnya");

if (prodiSelect) {
  prodiSelect.addEventListener("change", function () {
    if (this.value === "Lainnya") {
      prodiLainnyaContainer.style.display = "block";
      prodiLainnya.required = true;
      prodiLainnya.focus();
    } else {
      prodiLainnyaContainer.style.display = "none";
      prodiLainnya.required = false;
      prodiLainnya.value = "";
    }
  });
}

form.addEventListener("reset", () => {
  if (prodiLainnyaContainer) {
    prodiLainnyaContainer.style.display = "none";
    prodiLainnya.required = false;
  }
  if (typeof updateDays === "function") {
    setTimeout(updateDays, 0);
  }
});

// Dropdown Date of Birth (Tanggal, Bulan, Tahun)
const dobTgl = document.getElementById("dob_tgl");
const dobBln = document.getElementById("dob_bln");
const dobThn = document.getElementById("dob_thn");

const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function updateDays() {
  if (!dobTgl) return;
  const currentVal = parseInt(dobTgl.value, 10);
  const monthName = dobBln?.value || "";
  const year = parseInt(dobThn?.value, 10) || 2000;

  let maxDays = 31;
  if (monthName) {
    const monthIndex = namaBulan.indexOf(monthName);
    if (monthIndex === 1) {
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      maxDays = isLeap ? 29 : 28;
    } else if ([3, 5, 8, 10].includes(monthIndex)) {
      maxDays = 30;
    }
  }

  dobTgl.innerHTML = '<option value="" disabled selected>Tanggal</option>';
  for (let d = 1; d <= maxDays; d++) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    if (d === currentVal && currentVal <= maxDays) {
      opt.selected = true;
    }
    dobTgl.appendChild(opt);
  }
}

if (dobTgl && dobBln && dobThn) {
  namaBulan.forEach((bulan) => {
    const opt = document.createElement("option");
    opt.value = bulan;
    opt.textContent = bulan;
    dobBln.appendChild(opt);
  });

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 13;
  for (let y = maxYear; y >= 1975; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    dobThn.appendChild(opt);
  }

  updateDays();
  dobBln.addEventListener("change", updateDays);
  dobThn.addEventListener("change", updateDays);
}

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
  if (prodiSelect && prodiSelect.value === "Lainnya") {
    const customProdi = prodiLainnya ? prodiLainnya.value.trim() : "";
    formData.set("prodi", customProdi || "Mahasiswa Luar Kampus");
  }

  // Gabungkan Tempat & Tanggal Lahir (TTL)
  const tempatLahir = document.getElementById("tempat_lahir")?.value.trim() || "";
  const tglVal = dobTgl?.value || "";
  const blnVal = dobBln?.value || "";
  const thnVal = dobThn?.value || "";

  let tglFormatted = "";
  if (tglVal && blnVal && thnVal) {
    tglFormatted = `${tglVal} ${blnVal} ${thnVal}`;
  }

  let finalTTL = "";
  if (tempatLahir && tglFormatted) {
    finalTTL = `${tempatLahir}, ${tglFormatted}`;
  } else {
    finalTTL = tempatLahir || tglFormatted;
  }

  formData.set("ttl", finalTTL);
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
