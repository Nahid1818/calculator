function append(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let expression = document.getElementById('display').value;
    try {
        let result = evaluateExpression(expression);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const tokens = expression.split(/\b/).filter(token => token.trim() !== '');

    // Shunting-yard algorithm for parsing expression
    let outputQueue = [];
    let operatorStack = [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            outputQueue.push(parseFloat(token));
        } else if (operators.includes(token)) {
            while (operatorStack.length > 0 && precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            if (operatorStack.length === 0) {
                throw new Error('Mismatched parentheses');
            }
            operatorStack.pop(); // Discard the '('
        } else {
            throw new Error('Invalid token: ' + token);
        }
    }

    while (operatorStack.length > 0) {
        if (operatorStack[operatorStack.length - 1] === '(' || operatorStack[operatorStack.length - 1] === ')') {
            throw new Error('Mismatched parentheses');
        }
        outputQueue.push(operatorStack.pop());
    }

    // Evaluate postfix expression
    let resultStack = [];
    for (let token of outputQueue) {
        if (!isNaN(token)) {
            resultStack.push(token);
        } else {
            let operand2 = resultStack.pop();
            let operand1 = resultStack.pop();
            switch (token) {
                case '+':
                    resultStack.push(operand1 + operand2);
                    break;
                case '-':
                    resultStack.push(operand1 - operand2);
                    break;
                case '*':
                    resultStack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 === 0) {
                        throw new Error('Division by zero');
                    }
                    resultStack.push(operand1 / operand2);
                    break;
                default:
                    throw new Error('Invalid operator: ' + token);
            }
        }
    }

    if (resultStack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return resultStack[0];
}

function precedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}
