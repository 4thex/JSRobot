(function(){
    window.addEventListener("load", function() {
      var canvas = document.querySelector("#robot-field");
      canvas.addEventListener("click", function() {
        var image = document.querySelector("#snapshot");
        image.src = canvas.toDataURL();
      });
      
      var field = Field(canvas);
      var robot1 = JSRobot({x: 0, y: 0}, "blue");
      var robot2 = JSRobot({x: -100, y: -100}, "red");
      var robot3 = JSRobot({x: 300, y: -300}, "yellow");
      field.add(robot1);
      field.add(robot2);
      field.add(robot3);
      var state = 0;
      var speed = 200;
      robot1.setSpeeds(speed, speed);
      robot2.setSpeeds(-speed/3, -speed);
      robot3.setSpeeds(-speed/3, speed/3);

      robot1.onMove(function(location) {
          switch(state) {
              case 0:
                if(robot1.isX(300)) {
                    state = 1;
                    robot1.setSpeeds(speed, 0);
                }
                break;
              case 1:
                if(robot1.isDirection(145)) {
                    state = 2;
                    robot1.setSpeeds(speed, speed);
                }
                break;
              case 2:
                if(robot1.isX(0)) {
                    state = 3;
                    robot1.setSpeeds(speed/3, -speed/3);
                }
                break;
              case 3:
                if(robot1.isDirection(270)) {
                    state = 4;
                    robot1.setSpeeds(speed, speed);
                }
                break;
              case 4:
                if(robot1.isY(0)) {
                    state = 5;
                    robot1.setSpeeds(speed/3, -speed/3);
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

