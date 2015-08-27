(function(){
    window.addEventListener("load", function() {
      var canvas = document.querySelector("#robot-field");
      var robot = JSRobot(canvas);
      var state = 0;
      var speed = 100;
      robot.onMove(function(location) {
          switch(state) {
              case 0:
                if(robot.isDirection(45)) {
                    state = 1;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 1:
                if(robot.isX(100)) {
                    state = 2;
                    robot.setSpeeds(-speed, speed);
                }
                break;
              case 2:
                if(robot.isDirection(90)) {
                    state = 3;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 3:
                if(robot.isY(200)) {
                    state = 4;
                    robot.setSpeeds(-speed, speed);
                }
                break;
              case 4:
                if(robot.isDirection(270)) {
                    state = 5;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 5:
                if(robot.isY(0)) {
                    state = 6;
                    robot.stop();
                }
                break;
          }
      });

      robot.setSpeeds(-speed, speed);
      robot.start();
    });
}());

