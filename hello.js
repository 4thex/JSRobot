(function(){
    window.addEventListener("load", function() {
      var canvas = document.querySelector("#robot-field");
      var field = Field(canvas);
      var robot = JSRobot();
      robot.setSpeeds(-200, 200);
      field.add(robot);
    });
}());