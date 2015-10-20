(function(){
    window.addEventListener("load", function() {
        var field = Field();
        var robot = JSRobot({x: 0, y: 0}, "red");
        field.add(robot);
        
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");

        var left = 0;
        var right = 0;
        var destination = {x: 0, y: 0};

        canvas.addEventListener("click", function(event) {
           destination.y = (event.target.height * event.clientY / event.target.clientHeight) - 500;
           destination.x = (event.target.width * event.clientX / event.target.clientWidth) - 500;
           console.log(destination);
        });
        var frame = function() {
            context.save();
            context.translate(500+destination.x, 500+destination.y);
            context.strokeStyle = "white";
            context.beginPath();
            context.moveTo(-5, -5);
            context.lineTo(5, 5);
            context.moveTo(-5, 5);
            context.lineTo(5, -5);
            context.stroke();
            context.restore();
            window.requestAnimationFrame(frame);
        };
        window.requestAnimationFrame(frame);

        var adjust = function() {
            robot.setSpeeds(left, right);
            window.setTimeout(adjust, 200);
        };

        robot.onMove(function(location) {
           var destinationDirection = Math.atan2(destination.y-location.current.y, destination.x-location.current.x) * 180 / Math.PI; 
           if(Math.abs(location.current.x - destination.x) < 10
            && Math.abs(location.current.y - destination.y) < 10) {
                robot.stop();
                return;
            }
           if(robot.isDirection(destinationDirection)) {
                left = 100;
                right = 100;
           } else {
               if(destinationDirection < location.current.direction
               || (Math.abs(destinationDirection - location.current.direction) > 180
                    && Math.abs(destinationDirection - location.current.direction)<360)) {
                 right=150;
                 left=50;
               } else {
                 right=50;
                 left=150;
               }
           }
        });

        adjust();
    });
}());