window.addEventListener("load", function() {
  var speed = 100;
  var canvas = document.querySelector("canvas");
  canvas.addEventListener("click", function() {
    var image = document.querySelector("#snapshot");
    image.src = canvas.toDataURL();
  });

  document.addEventListener("keydown", function(event) {
    console.log(event.type + ":" + (event.key || event.which));
    speed++;
    robot.setSpeeds(speed/4, speed);
  }, false);

  document.addEventListener("keyup", function(event) {
    console.log(event.type + ":" + (event.key || event.which));
  }, false);

  var field = Field();
  var robot = JSRobot({x: 0, y: 0}, "red");
  field.add(robot);
  robot.setSpeeds(25, 100);
});