window.addEventListener("load", function() {

  var canvas = document.querySelector("canvas");
  canvas.addEventListener("click", function() {
    var image = document.querySelector("#snapshot");
    image.src = canvas.toDataURL();
  });

  var field = Field();
  var robot = JSRobot({x: 0, y: 0}, "red");
  field.add(robot);
  robot.setSpeeds(25, 100);
});