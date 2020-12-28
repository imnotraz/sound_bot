const form = document.getElementById("form");
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
  const val = document.getElementById("sound-input").value;
  sendRequest(val);
}

function sendRequest(sound) {
  document.getElementById("sound").value = sound;
  const data = new URLSearchParams(new FormData(form));
  fetch("/", {
    method: "post",
    body: data,
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
