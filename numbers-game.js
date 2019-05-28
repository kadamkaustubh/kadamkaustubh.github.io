
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