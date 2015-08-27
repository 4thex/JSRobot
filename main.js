var JSRobot = JSRobot || function(canvas) {
  var that = {};
  var context = canvas.getContext("2d");
  var startLocation = {x: 0, y: 0};
  var location = {x: startLocation.x, y: startLocation.y}
  context.translate(canvas.width/2, canvas.height/2);
  var startDirection = 0;
  var direction = startDirection;
  var vr = 100;
  var vl = 0;
  var d = 70;
  var startTime;
  var started = false;
  var absoluteDirection = startDirection + direction;
  var absoluteLocation = {
    x: startLocation.x + location.x,
    y: startLocation.y + location.y
  }
  var previous = {
    absoluteDirection: 0,
    absoluteLocation: {x: 0, y: 0}
  };
  var loop = function() {
      if(!started) {
        window.requestAnimationFrame(loop);  
        return;
      }
      if(!startTime) {
        startTime = Date.now();
      }
      // Active operation
      var va = (vr-vl)/(2*d);
      var v = (vr+vl)/2;
      var t = (Date.now() - startTime)/1000;
      direction = (360 * (t * va) / (Math.PI*2));
      if(va === 0) {
        location.x = (v * t);
        location.y =  0;
      } else {
        location.x = (v * Math.sin(t*va)/va);
        location.y = ((-v * Math.cos(t*va)/(va)) + (v/va));
      }
      absoluteDirection = (startDirection + direction) % 360;
      absoluteLocation.x = startLocation.x + Math.cos(startDirection*Math.PI/180) * location.x - Math.cos((90-startDirection)*Math.PI/180) * location.y;
      absoluteLocation.y = startLocation.y + Math.sin(startDirection*Math.PI/180) * location.x + Math.sin((90-startDirection)*Math.PI/180) * location.y;
      // Invoke events
      if(moveCallback) {
        moveCallback(
        {
          previous: {
            x: previous.absoluteLocation.x,
            y: previous.absoluteLocation.y,
            direction: previous.absoluteDirection                
          },
          current: {
            x: absoluteLocation.x,
            y: absoluteLocation.y,
            direction: absoluteDirection                
          }
        });
      }
      // Record previous
      previous.absoluteDirection = absoluteDirection;
      previous.absoluteLocation.x = absoluteLocation.x;
      previous.absoluteLocation.y = absoluteLocation.y;
      render();   
      window.requestAnimationFrame(loop);  
  };

  var render = function() {
      var drawHead = function() {
          context.strokeStyle = "silver";
          context.fillStyle = "blue";
          context.beginPath();
          context.arc(0, 0, 50, 0, Math.PI * 2);
          context.stroke();  
          context.fill();

          context.lineWidth = 10;
          context.beginPath();
          context.arc(0, 0, 20, 0, Math.PI * 2);
          context.stroke();

          var rotation = 0;
          context.save();
          for(rotation = 0; rotation < 6; rotation++) {
              context.rotate(2 * Math.PI / 6);
              context.beginPath();
              context.moveTo(0, 20);
              context.lineTo(0, 50);
              context.stroke();
          }
          context.restore();

          context.beginPath();
          context.arc(0, 0, 50, 0, Math.PI * 2);
          context.stroke();
      };
      
      var drawFoot = function() {
          context.lineWidth = 1;
          context.fillStyle = "white";
          context.strokeStyle = "black";

          context.beginPath();
          context.rect(0, 0, 40, 20);
          context.fill();
          context.stroke();
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(40, 20);
          context.moveTo(0, 20);
          context.lineTo(40, 0);
          context.stroke();
          context.beginPath();
          context.rect(10, 0, 20, 20);
          context.fill();
          context.stroke();          
      };  

      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
      context.save();
      context.translate(startLocation.x, startLocation.y);
      context.rotate(startDirection * Math.PI/180);
      context.translate(location.x,location.y);
      context.rotate(direction * Math.PI /180);
      drawHead();

      context.save();
      context.translate(-20, 55);
      drawFoot();
      context.restore();
      context.translate(-20, -75);
      drawFoot();
      context.restore();
            
  };
  var moveCallback;
  that.onMove = function(callback) {
    moveCallback = callback;
  };
  
  that.setSpeeds = function(left, right) {
    window.setTimeout(function() {
      syncStop();
      vl = left;
      vr = right;
      syncStart();
    }, 0);
  };

  var syncStop = function() {
    started = false; 
  };

  that.stop = function() {
    window.setTimeout(function() {
      syncStop();  
    }, 0);
  };

  var syncStart = function() {
      started = true;
      startTime = Date.now();
      startLocation.x = absoluteLocation.x;
      startLocation.y = absoluteLocation.y;
      startDirection = absoluteDirection;      
  };

  that.start = function() {
    window.setTimeout(function() {
      syncStart();
    }, 0);
  };
  
  that.isX = function(x) {
    return is(x, previous.absoluteLocation.x, absoluteLocation.x);
  };
  that.isY = function(y) {
    return is(y, previous.absoluteLocation.y, absoluteLocation.y);
  };
  that.isDirection = function(direction) {
    return is(direction, previous.absoluteDirection, absoluteDirection)
        || (Math.abs(previous.absoluteDirection - absoluteDirection) > 180 && is(direction, previous.absoluteDirection-360, absoluteDirection));
  };
  var is = function(limit, one, other) {
      return((one < limit && other >= limit)
        ||(one > limit && other <= limit));
  }

  loop();

  return that;      
};