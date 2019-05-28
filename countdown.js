/**
 * 
 * @typedef {Object} Problem
 * @property {number[]} numbers Array of six numbers
 * @property {number} target target between 100-999  
 * @param {number} bigCount 
 * @returns {Problem} {@link Problem } output array
 */
function createNumbersAndTarget(bigCount) {
    var numbers = _.sample(_.range(25, 125, 25), bigCount)
    numbers = numbers.concat(_.range(6 - bigCount).map(function () { return _.random(1, 10) }))
    var output = new Object()
    output.numbers = numbers
    output.target = _.random(100, 999)
    return output
}

function add(a, b) { return a + b }
function sub(a, b) { return a - b }
function mul(a, b) { return a * b }
function div(a, b) { return a % b == 0 ? a / b : NaN }
const operations = [['+', add], ['-', sub], ['*', mul], ['/', div]]

/**
 * 
 * @param {Problem} problem 
 * @returns {string[]} answers
 */
function solver(problem) {
    var answers = []
    recurse([],problem.numbers,problem.target)
    
    function print(stack) {
        var entry = stack.map(element => {
            if (typeof element == 'number') {
                return element
            } else {
                return element[0]
            }
        }).join(' ')
        // console.log(entry)
        answers.push(entry)
    } 
    function evaluate(stack) {
        var total = 0
        var operation = add
        stack.forEach(element => {
            if (typeof element == 'number') {
                total = operation(total, element)
            } else {
                operation = element[1]
            }
        });
        return total
    }
    function recurse(stack, numbers, target) {
        for (var i = 0; i < numbers.length; i++) {
            stack.push(numbers[i])
            var remaining = numbers.slice(0, i).concat(numbers.slice(i + 1, numbers.length))
            if (evaluate(stack) == target) {
                print(stack)
            }
            if (remaining.length > 1) {
                operations.forEach(element => {
                    stack.push(element);
                    stack = recurse(stack, remaining, target);
                    stack.pop()
                })
            }
            stack.pop()
        }
        return stack
    }
    return answers
}

