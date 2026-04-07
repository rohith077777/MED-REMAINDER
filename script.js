let medicines = JSON.parse(localStorage.getItem("meds")) || [];

// LOGIN
function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Enter your name");

  localStorage.setItem("user", name);
  showMain();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// SHOW MAIN
function showMain() {
  document.getElementById("loginScreen").classList.remove("active");
  document.getElementById("mainScreen").classList.add("active");

  const user = localStorage.getItem("user");
  document.getElementById("welcomeText").innerText = `Hello, ${user} `;

  render();
}

// 🔥 CONVERT TIME TO 12-HOUR FORMAT
function formatTime(time24) {
  let [hour, minute] = time24.split(":");

  hour = parseInt(hour);
  let ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour}:${minute} ${ampm}`;
}

// ADD MEDICINE
function addMedicine() {
  const name = document.getElementById("medName").value.trim();
  const time = document.getElementById("medTime").value;

  if (!name || !time) return alert("Fill all fields");

  medicines.push({
    id: Date.now(),
    name,
    time,
    taken: false
  });

  document.getElementById("medName").value = "";
  document.getElementById("medTime").value = "";

  save();
}

// SAVE
function save() {
  localStorage.setItem("meds", JSON.stringify(medicines));
  render();
}

// RENDER
function render() {
  const list = document.getElementById("medList");
  list.innerHTML = "";

  if (medicines.length === 0) {
    list.innerHTML = `<br><p class="text-center text-gray-400">No medicines added</p></br>`;
    return;
  }

  medicines.forEach(med => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="${med.taken ? 'done' : ''}">
        <p class="font-bold">${med.name}</p>
        <p class="text-sm text-gray-500">${formatTime(med.time)}</p>
      </div>

      <div>
        <button class="icon-btn green" onclick="toggle(${med.id})">✔</button>
        <button class="icon-btn red" onclick="del(${med.id})">✕</button>
      </div>
    `;

    list.appendChild(div);
  });
}

// TOGGLE
function toggle(id) {
  medicines = medicines.map(m =>
    m.id === id ? { ...m, taken: !m.taken } : m
  );
  save();
}

// DELETE
function del(id) {
  medicines = medicines.filter(m => m.id !== id);
  save();
}

// AUTO LOGIN
if (localStorage.getItem("user")) {
  showMain();
}