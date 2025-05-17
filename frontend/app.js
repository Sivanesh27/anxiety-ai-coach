// /frontend/app.js

let currentUser = {};

function signup() {
  const payload = getUserData();
  fetch('https://your-backend-url.onrender.com/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }).then(res => res.json()).then(data => alert(data.message));
}

function login() {
  const payload = getUserData();
  fetch('https://your-backend-url.onrender.com/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }).then(res => res.json()).then(data => {
    if (data.success) {
      currentUser = payload;
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("main-app").style.display = "block";
      document.getElementById("username").innerText = currentUser.userid;
    } else alert("Login failed");
  });
}

function getUserData() {
  return {
    userid: document.getElementById("userid").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  };
}

function submitTriggers() {
  const triggers = Array.from(document.querySelectorAll('#questionnaire input:checked'))
                        .map(input => input.value);
  document.getElementById('exposure').innerHTML = `Facing your anxiety: <b>${triggers[0]}</b> scenario.`;

  document.getElementById('mindfulnessPrompt').innerText =
    "Take 3 deep breaths and reflect on your current feeling.";

  // dummy progress chart
  const ctx = document.getElementById('progressChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Calm', 'Mild', 'High'],
      datasets: [{ data: [30, 40, 30], backgroundColor: ['#4caf50', '#ff9800', '#f44336'] }]
    }
  });
}

function reframeThought() {
  const text = document.getElementById('thoughtInput').value;
  const reframed = `Try thinking: \"What if the opposite is true?\" — You wrote: \"${text}\"`;
  document.getElementById('reframedOutput').innerText = reframed;
}

function getMindfulness() {
  const prompts = [
    "Try 4-7-8 breathing for 1 minute.",
    "Scan your body and relax each muscle.",
    "Imagine your safe place for 30 seconds."
  ];
  document.getElementById('mindfulnessPrompt').innerText =
    prompts[Math.floor(Math.random() * prompts.length)];
}

