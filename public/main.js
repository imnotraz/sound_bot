var form = document.getElementById("form");
    var soundInput = document.getElementById("soundInput");

    var soundsTabButton = document.getElementById("soundsTabButton");
    var youtubeTabButton = document.getElementById("youtubeTabButton");

    var soundsTab = document.getElementById("soundsTab");
    var youtubeTab = document.getElementById("youtubeTab");

    youtubeTab.classList.add("hidden");
    soundsTabButton.classList.add("active");

    soundInput.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        sendRequest();
      }
    });

    function stop() {
      fetch("/stop", {
        method: "post",
      });
    }

    function sendRequestFromFrom() {
      var val = document.getElementById("soundInput").value;
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
