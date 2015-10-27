(function() {
    window.addEventListener("load", function() {
      var context = new AudioContext();
      var gainNode = context.createGain();
      
      var request = new XMLHttpRequest();
      request.open("GET", "../sounds/r2d2-talking.mp3", true);
      request.responseType = "arraybuffer";
      var audioBuffer;
      request.addEventListener("load", function(event) {
          context.decodeAudioData(request.response, function(buffer) {
              audioBuffer = buffer;
          });
      });
      request.send();
      
      var play = function() {
        var source = context.createBufferSource();
        if(!audioBuffer) return;
        source.buffer = audioBuffer;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        source.start(0, 1, 0.5);
      }
      
      var body = document.querySelector("body");
      body.addEventListener("click", function(event) {
          play();
      });
      
      var mute = document.querySelector("#mute");
      mute.addEventListener("click", function(event) {
        event.stopPropagation();
        if(mute.muted) {
          gainNode.gain.value = 1;
          mute.muted = false;
        } else {
          gainNode.gain.value = 0;
          mute.muted = true;
        }
        mute.innerHTML = mute.muted?"Unmute":"Mute";
      });
    });
    
}());