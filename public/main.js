const soundInput = document.getElementById("sound-input");

const soundsTabButton = document.getElementById("sounds-tab-button");
const youtubeTabButton = document.getElementById("youtube-tab-button");

const soundsTab = document.getElementById("sounds-tab");
const youtubeTab = document.getElementById("youtube-tab");

youtubeTab.classList.add("hidden");
soundsTabButton.classList.add("active");

soundInput.addEventListener("keyup", function (e) {
  if (e.code == "Enter") {
    sendRequestFromForm();
  }
});

function stop() {
  fetch("/stop", {
    method: "post",
  });
}

function sendRequestFromForm() {
  const sound = document.getElementById("sound-input").value;
  sendRequest(sound);
}

function sendRequest(sound) {
  fetch("/play/sound", {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sound }),
  });
}

soundsTabButton.addEventListener("click", () => {
  soundsTab.classList.remove("hidden");
  youtubeTab.classList.add("hidden");
  soundsTabButton.classList.add("active");
  youtubeTabButton.classList.remove("active");
});

youtubeTabButton.addEventListener("click", () => {
  youtubeTab.classList.remove("hidden");
  soundsTab.classList.add("hidden");
  youtubeTabButton.classList.add("active");
  soundsTabButton.classList.remove("active");
});
