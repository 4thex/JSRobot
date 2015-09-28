window.addEventListener("load", function() {
  var canvas = document.querySelector("canvas");
  canvas.addEventListener("click", function() {
    var image = document.querySelector("#snapshot");
    image.src = canvas.toDataURL();
  });

  var field = Field();
  var robot = JSRobot({x: 0, y: 0}, "red");
  field.add(robot);

  var up = false;
  var down = false;
  var left = false;
  var right = false;
  var speed = 0;

  var vl = 0;
  var vr = 0;

  var setKey = function(key, value) {
    switch(key) {
      case "Up":
        up = value;
        break;
      case "Down":
        down = value;
        break;
      case "Left":
        left = value;
        break;
      case "Right":
        right = value;
        break;
      default:
        return false;
    }
    return true;
  }

  document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if(event.repeat) return;
    var key = event.key || event.keyIdentifier;
    console.log(key);
    if(setKey(key, true)) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener("keyup", function(event) {
    var key = event.key || event.keyIdentifier;
    if(setKey(key, false)) {
      event.preventDefault();
    }
  }, true);

  var checkKeys = function () {
    var checkKeys = arguments.callee;
    window.setTimeout(function() {
      checkKeys();
    }, 50);
    if(up) {
      vr += 10;
      vl += 10;
    }
    if(down) {
      vr -= 20;
      vl -= 20;
    }
    if(left) {
      vr += 10;
      vl -= 10;
    }
    if(right) {
      vr -= 10;
      vl += 10;
    }
    robot.setSpeeds(vl, vr);
  }();
});