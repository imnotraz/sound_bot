var form = document.getElementById("form");
    var soundInput = document.getElementById("soundInput");


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
