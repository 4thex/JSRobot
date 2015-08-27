(function(){
    window.addEventListener("load", function() {
      var canvas = document.querySelector("#robot-field");
      var robot = JSRobot(canvas);
      var state = 0;
      var speed = 100;
      robot.onMove(function(location) {
          switch(state) {
              case 0:
                if(robot.isX(200)) {
                    state = 1;
                    robot.setSpeeds(0, speed);
                }
                break;
              case 1:
                if(robot.isDirection(90)) {
                    state = 2;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 2:
                if(robot.isY(200)) {
                    state = 3;
                    robot.setSpeeds(0, speed);
                }
                break;
              case 3:
                if(robot.isDirection(180)) {
                    state = 4;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 4:
                if(robot.isX(0)) {
                    state = 5;
                    robot.setSpeeds(0, speed);
                }
                break;
              case 5:
                if(robot.isDirection(270)) {
                    state = 6;
                    robot.setSpeeds(speed, speed);
                }
                break;
              case 6:
                if(robot.isY(0)) {
                    state = 7;
                    robot.setSpeeds(0, speed);
                }
                break;
              case 7:
                if(robot.isDirection(0)) {
                    state = 0;
                    robot.setSpeeds(speed, speed);

                }
                break;
          }
      });

      robot.setSpeeds(speed, speed);
      robot.start();
    });
}());

