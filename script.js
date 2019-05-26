/* eslint-disable no-console */
//const fs = require('fs');
// const _ = require('underscore')
// var data = JSON.parse(fs.readFileSync('300 questions.json','utf-8'))
var data;
var correctBackground = '#c8e6c9'
var correctFont = '#43a047'
var wrongBackground = '#ef9a9a'
var wrongFont = '#e53935'
var jsonCallback = function (response) {
    data = JSON.parse(response)
}

loadJSON('300 questions.json', jsonCallback);
data = data.slice(0, 100)
var min = data.map(obj => Number(obj.percentage)).pop()
var max = data.map(obj => Number(obj.percentage))[0]
var dataSubset = _.sample(data, 5)
var mainGrid = document.getElementById("grid")
for (var i = 0; i < dataSubset.length; i++) {
    var questionObject = dataSubset[i]
    var cell = document.createElement('div')
    cell.className = ' mdl-card mdl-shadow--4dp question mdl-cell--9-col-desktop mdl-cell--9-col-tablet mdl-cell--4-col-phone'
    cell.id = i
    createCardTitle(cell, i)
    createQuestion(cell, questionObject.question,i)
    createAnswerField(cell, 'input-' + i)
    componentHandler.upgradeElement(cell)
    mainGrid.appendChild(cell)
}

var submitButton = document.getElementById('submit')
submitButton.onclick = checkAnswers

function checkAnswers() {
    console.log('submit clicked')
    document.getElementById('submit').disabled = true
    var total = 0
    for (var i = 0; i < dataSubset.length; i++) {
        var questionObject = dataSubset[i]
        var input = document.getElementById('input-' + i)
        var correct = questionObject.answer == input.value.trim().toUpperCase()
        var score

        if (correct) {
            score = Math.round(100 - 100 * ((questionObject.percentage - min) / (max - min)))
            total += score
        } else {
            score = Math.round(- 50 * ((questionObject.percentage - min) / (max - min)))
            total += score
        }
        updateTitle(i, score)
        updateCard(i,correct,questionObject.answer)
    }
        showTotal(total)
        console.log(total)
}
function showTotal(total){
    var totalElement = document.createElement('div')
    var totalSize = document.createElement('h2')
    totalElement.id = 'total-score'
    if (total>=0){
        total = '+'+total
        totalElement.style.color = correctFont
    } else{
        totalElement.style.color = wrongFont
    }
    var totalText = document.createTextNode(total)
    
    totalSize.appendChild(totalText)
    totalElement.appendChild(totalSize)
    document.body.appendChild(totalElement)
}
function updateTitle(id, score) {
    var postScore = document.createElement('h2')
    postScore.className = "mdl-card__title-text"
    postScore.id = 'title-' + id + '-score'
    if (score >= 0) {
        score = '+' + score
        postScore.style.color = correctFont
    } else {
        postScore.style.color = wrongFont
    }
    var scoreText = document.createTextNode('\t' + score)
    postScore.appendChild(scoreText)
    document.getElementById('title-' + id).appendChild(postScore)
}
function updateCard(id,correct,answer){
    var input = document.getElementById('input-'+id)
    var question = document.getElementById(id)
    input.disabled = true
    if(correct){
        input.style.backgroundColor = correctBackground
    } else {
        input.style.backgroundColor = wrongBackground
        var answerElement = document.createElement('div')
        answerElement.className = 'mdl-card__supporting-text'
        answerElement.id = 'added-answer-'+id
        answerElement.style.color = correctFont
        var answerText = document.createTextNode(answer)
        answerElement.appendChild(answerText)
        componentHandler.upgradeElement(answerElement)
        question.appendChild(answerElement)
    }
}

function createAnswerField(cell, inputId) {
    var textFieldDiv = document.createElement('div')
    textFieldDiv.className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label '
    var input = document.createElement('input')
    input.className = 'mdl-textfield__input'
    input.id = inputId
    input.pattern = '[A-Za-z]*'
    var label = document.createElement('label')
    label.className = 'mdl-textfield__label'
    label.htmlFor = inputId
    label.id = inputId + '-label'

    var text = document.createTextNode('Answer')
    label.appendChild(text)

    var errorSpan = document.createElement('span')
    errorSpan.className = 'mdl-textfield__error'
    errorSpan.id = inputId + '-error'
    var errorText = document.createTextNode('Letters Only')
    errorSpan.appendChild(errorText)
    componentHandler.upgradeElement(label)
    componentHandler.upgradeElement(input)
    componentHandler.upgradeElement(errorSpan)
    textFieldDiv.appendChild(input)
    textFieldDiv.appendChild(label)
    textFieldDiv.appendChild(errorSpan)

    componentHandler.upgradeElement(textFieldDiv)
    cell.appendChild(textFieldDiv)
    return cell
}

function createCardTitle(cell, questionNumber) {
    var cardTitle = document.createElement('div')
    var titleElement = document.createElement('h2')
    var titleText = document.createTextNode('Q' + (questionNumber + 1) + '.')
    titleElement.className = "mdl-card__title-text"
    titleElement.id = 'title-' + i
    titleElement.appendChild(titleText)
    componentHandler.upgradeElement(titleElement)
    cardTitle.className = 'mdl-card__title'
    cardTitle.appendChild(titleElement)
    componentHandler.upgradeElement(cardTitle)
    cell.appendChild(cardTitle)
    return cell
}

function createQuestion(cell, question,id) {
    var supportingText = document.createElement('div')
    supportingText.className = "mdl-card__supporting-text mdl-card--border"
    supportingText.id = 'question-'+id
    var questionText = document.createTextNode(question)
    supportingText.appendChild(questionText)
    componentHandler.upgradeElement(supportingText)
    cell.appendChild(supportingText)
    return cell
}

function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}