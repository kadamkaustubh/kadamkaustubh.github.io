
var problem = createNumbersAndTarget(2)
var width = 50
console.log(problem)
console.log(solver(problem))
var bar = document.getElementById('p3')
var i = 0
var interval = setInterval(function(){
    console.log(i)
    bar.MaterialProgress.setProgress(i*3)
    i++
    if(i>20){
        clearInterval(interval)
    }
},1000)

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
  }

var draw = SVG('canvas').size(300,300)
var rect = draw.rect(100, 100)
