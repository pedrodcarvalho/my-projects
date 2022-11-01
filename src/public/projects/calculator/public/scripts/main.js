const display = document.querySelector('.display');

const calculator = {
    expression: [],
    result: undefined,
    op: '',
};

const checkInput = (input) => {
    if ((isNaN(input) && display.innerHTML[display.innerHTML.length - 1] === ' ') ||
        (input === '.' && display.innerHTML[display.innerHTML.length - 1] === '.')) {
        return false;
    }
    if (!isNaN(input) && calculator.result !== undefined && display.innerHTML[display.innerHTML.length - 1] !== ' ') {
        return false;
    }

    return true;
};

const checkEqualSign = (input) => {
    if (input === '=') {
        display.innerHTML.split(' ').map((i) => {
            calculator.expression.push(i);
        });

        calculateResult(calculator.expression);
        printResult(calculator.result);
    }
};

const calculateResult = (expression) => {
    expression.map((i) => {
        if (!isNaN(parseFloat(i)) && calculator.result === undefined) {
            calculator.result = parseFloat(i);
        }
        else if (isNaN(i)) {
            calculator.op = i;
        }
        else {
            switch (calculator.op) {
                case '+':
                    calculator.result += parseFloat(i);
                    break;
                case '-':
                    calculator.result -= parseFloat(i);
                    break;
                case '*':
                    calculator.result *= parseFloat(i);
                    break;
                case '/':
                    parseFloat(i) === 0 ? calculator.result = 0 : calculator.result /= parseFloat(i);
            }
        }
    });
};

const printResult = (result) => {
    display.innerHTML = result;

    calculator.expression = [];
};

document.querySelector('.calculator').addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        if (e.target.value == 'ac') {
            display.innerHTML = '';
            calculator.result = undefined;
        }
        else if (checkInput(e.target.value)) {
            display.innerHTML += isNaN(e.target.value) && e.target.value != '.' ? ` ${e.target.value} ` : e.target.value;
        }

        checkEqualSign(e.target.value);
    }
});
