
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
var c = document.getElementById('canvas')
var context = c.getContext('2d')
context.lineWidth = 5
context.strokeStyle = '#42a5f5'
context.beginPath()
context.arc(50,50,50,0,Math.PI*2)
context.stroke()
