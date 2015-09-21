window.addEventListener("load", function() {
  var field = Field();
  var robot = JSRobot({x: 0, y: 0}, "red");
  field.add(robot);
  robot.setSpeeds(100, 100);
  window.setTimeout(function() {
    robot.stop();
  }, 4000);
});