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

    return true;
};

const checkEqualSign = (input) => {
    if (input === '=') {
        display.innerHTML.split(' ').map((num) => {
            calculator.expression.push(num);
        });

        calculateResult(calculator.expression);
        printResult(calculator.result);
    }
};

const calculateResult = (expression) => {
    expression.map((num) => {
        if (!isNaN(parseFloat(num)) && calculator.result === undefined) {
            calculator.result = parseFloat(num);
        }
        else if (isNaN(num)) {
            calculator.op = num;
        }
        else {
            switch (calculator.op) {
                case '+':
                    calculator.result += parseFloat(num);
                    break;
                case '-':
                    calculator.result -= parseFloat(num);
                    break;
                case '*':
                    calculator.result *= parseFloat(num);
                    break;
                case '/':
                    parseFloat(num) === 0 ? calculator.result = 0 : calculator.result /= parseFloat(num);
                    break;
                case '%':
                    calculator.result %= parseFloat(num);
            }
        }
    });
};

const printResult = (result) => {
    result = result.toFixed(2);

    result.toString();

    result.includes('.00') ? display.innerHTML = parseInt(result).toFixed(0) : display.innerHTML = result;

    calculator.expression = [];
};

document.querySelector('.calculator').addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        if (e.target.value === 'ac') {
            display.innerHTML = '';
            calculator.result = undefined;
        }
        else if (e.target.value === '+-') {
            display.innerHTML[0] === '-' ? display.innerHTML = display.innerHTML.slice(1) : display.innerHTML = '-' + display.innerHTML;

            calculator.result = parseFloat(display.innerHTML);

            printResult(calculator.result);
        }
        else if (checkInput(e.target.value)) {
            display.innerHTML += isNaN(e.target.value) && e.target.value != '.' ? ` ${e.target.value} ` : e.target.value;
        }

        checkEqualSign(e.target.value);
    }
});
