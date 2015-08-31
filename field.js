var Field = Field || function(canvas) {
  var that = {};
  var context = canvas.getContext("2d");

  var robots = [];
  var render = function() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 500);
    context.lineTo(1000, 500);
    context.moveTo(500, 0);
    context.lineTo(500, 1000);
    var i;
    for(i=0; i<1000; i+=100) {
      context.moveTo(i, 490);
      context.lineTo(i, 510);
      context.moveTo(490, i);
      context.lineTo(510, i);
    }
    context.stroke();
    context.restore();
  };
  var animate = function() {
    render();
    robots.forEach(function(robot) {
       robot.calculate();
       context.save();
       robot.render(); 
       context.restore();
    });  
    window.requestAnimationFrame(animate);
  };
  that.add = function(robot) {
    robots.push(robot);
  };
  window.requestAnimationFrame(animate);
  return that;  
};