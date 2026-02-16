// Elements
const form = document.getElementById("reportForm");
const modal = document.getElementById("modal");
const spinner = document.getElementById("spinner");
const totalReportsEl = document.getElementById("totalReports");
const underReviewEl = document.getElementById("underReview");
const approvedEl = document.getElementById("approved");
const reportList = document.getElementById("reportList");
const adminReports = document.getElementById("adminReports");

let reports = JSON.parse(localStorage.getItem("reports")) || [];

updateAll();

/* ================= FORM SUBMIT ================= */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const district = document.getElementById("district").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;
  const truth = document.getElementById("truth").checked;

  if (!district || !location || !type || !description || !truth) {
    alert("Fill all required fields");
    return;
  }

  spinner.style.display = "inline-block";

  setTimeout(() => {
    const newReport = {
      district,
      location,
      type,
      description,
      status: "Under Review",
      date: new Date(),
    };
    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));
    spinner.style.display = "none";
    form.reset();
    modal.style.display = "flex";
    updateAll();
  }, 800);
});

function closeModal() {
  modal.style.display = "none";
}

/* ================= UPDATE ALL ================= */
function updateAll() {
  totalReportsEl.textContent = reports.length;
  underReviewEl.textContent = reports.filter(
    (r) => r.status === "Under Review",
  ).length;
  approvedEl.textContent = reports.filter(
    (r) => r.status === "Approved",
  ).length;
  renderApprovedReports();
  renderAdminPanel();
  drawChart();
}

/* ================= APPROVED REPORTS ================= */
function renderApprovedReports() {
  reportList.innerHTML = "";
  const approved = reports.filter((r) => r.status === "Approved");
  if (approved.length === 0) {
    reportList.innerHTML = "<p>No approved reports yet.</p>";
    return;
  }
  approved.forEach((r) => {
    const div = document.createElement("div");
    div.classList.add("report-card");
    div.innerHTML = `<h4>${r.type} - ${r.district}</h4><p><strong>Location:</strong> ${r.location}</p><p>${r.description}</p>`;
    reportList.appendChild(div);
  });
}

/* ================= ADMIN PANEL ================= */
function renderAdminPanel() {
  adminReports.innerHTML = "";
  const under = reports.filter((r) => r.status === "Under Review");
  if (under.length === 0) {
    adminReports.innerHTML = "<p>No pending reports.</p>";
    return;
  }
  under.forEach((r, index) => {
    const div = document.createElement("div");
    div.classList.add("admin-card");
    div.innerHTML = `
      <div>
        <h4>${r.type} - ${r.district}</h4>
        <p><strong>Location:</strong> ${r.location}</p>
      </div>
      <div>
        <button onclick="approveReport(${index})">Approve</button>
        <button onclick="rejectReport(${index})">Reject</button>
      </div>
    `;
    adminReports.appendChild(div);
  });
}

window.approveReport = function (i) {
  reports[i].status = "Approved";
  localStorage.setItem("reports", JSON.stringify(reports));
  updateAll();
};

window.rejectReport = function (i) {
  reports.splice(i, 1);
  localStorage.setItem("reports", JSON.stringify(reports));
  updateAll();
};

/* ================= PIE CHART ================= */
function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const under = reports.filter((r) => r.status === "Under Review").length;
  const approved = reports.filter((r) => r.status === "Approved").length;
  const total = reports.length || 1;
  const underAngle = (under / total) * 2 * Math.PI;
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = "#f42a41";
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.arc(150, 150, 100, 0, underAngle);
  ctx.fill();
  ctx.fillStyle = "#006a4e";
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.arc(150, 150, 100, underAngle, 2 * Math.PI);
  ctx.fill();
}

/* ================= DARK MODE ================= */
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ================= HAMBURGER ================= */
document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});
