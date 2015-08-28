(function(){
    window.addEventListener("load", function() {
      var canvas = document.querySelector("#robot-field");
      var robot1 = JSRobot(canvas, {x: -50, y: 0}, "blue");
      var robot2 = JSRobot(canvas, {x: -100, y: -150}, "red");
      var state = 0;
      var speed = 200;
      robot1.setSpeeds(speed, speed);
      robot2.setSpeeds(-speed/3, -speed);

      robot1.start();
      robot2.start();

      robot1.onMove(function(location) {
          switch(state) {
              case 0:
                if(robot1.isX(150)) {
                    state = 1;
                    robot1.setSpeeds(0, speed);
                }
                break;
              case 1:
                if(robot1.isDirection(135)) {
                    state = 2;
                    robot1.setSpeeds(speed, speed);
                }
                break;
              case 2:
                if(robot1.isY(200)) {
                    state = 3;
                    robot1.setSpeeds(-speed, speed);
                }
                break;
              case 3:
                if(robot1.isDirection(270)) {
                    state = 4;
                    robot1.setSpeeds(speed, speed);
                }
                break;
              case 4:
                if(robot1.isY(-50)) {
                    state = 5;
                    robot1.setSpeeds(speed, -speed);
                }
                break;
              case 5:
                if(robot1.isDirection(0)) {
                    state = 0;
                    robot1.setSpeeds(speed, speed);
                }
                break;
          }
      });

    });
}());

