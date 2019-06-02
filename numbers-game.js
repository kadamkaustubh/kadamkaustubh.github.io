var problem, answers

var slide = document.getElementById('big-number-selector'),
    sliderDiv = document.getElementById("big-number-out");

var submit_button = document.getElementById('number-submit')

submit_button.onclick = displayNumbers
async function displayNumbers() {
    console.log('pressed')
    submit_button.disabled = true
    problem = createNumbersAndTarget(slide.value)
    console.log(problem.numbers)
    var showNumbers = document.getElementById('show-numbers')
    for (var i = 0; i < problem.numbers.length; i++) {
        var num = document.createTextNode(problem.numbers[i] + '  ')
        showNumbers.appendChild(num)
        componentHandler.upgradeElement(showNumbers)
        await sleep(800)
    }
    var show_target = document.getElementById('show-target')
    var target = document.createTextNode(problem.target)
    show_target.appendChild(target)
    startTheClock()
    answers = solver(problem)
}



function startTheClock() {
    var bar = document.getElementById('clock')
    var i = 0
    var interval = setInterval(function () {
        bar.MaterialProgress.setProgress(i / 10)
        i++
        if (i > 1000) {
            clearInterval(interval)
            console.log(answers)
            displayAnswers()
        }
    }, 30)
}
function displayAnswers(){
    var cell = document.getElementById('answers-out')
    for(var i=0; i<answers.length;i++){
        var text = document.createTextNode(answers[i]+'\n')
        var br = document.createElement('br')
        cell.appendChild(text)
        cell.appendChild(br)
    }
}
function createCardTitle(cell, title) {
    var cardTitle = document.createElement('div')
    var titleElement = document.createElement('h2')
    var titleText = document.createTextNode(title)
    titleElement.className = "mdl-card__title-text"
    titleElement.id = title
    titleElement.appendChild(titleText)
    componentHandler.upgradeElement(titleElement)
    cardTitle.className = 'mdl-card__title'
    cardTitle.appendChild(titleElement)
    componentHandler.upgradeElement(cardTitle)
    cell.appendChild(cardTitle)
    return cell
}

slide.onchange = function () {
    var suffix = this.value == 1 ? ' big number' : ' big numbers'
    sliderDiv.innerHTML = this.value + suffix;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
