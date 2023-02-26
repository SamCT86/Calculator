const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

// Calculator state variables
let firstValue = 0;
let secondValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Calculate first and second values depending on operator value
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (secondNumber) => secondNumber,
};

function sendNumberValue(number) {
    // Replace current display value if first value has been entered and awaiting next value is true
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        // Set awaitingNextValue to false because we have a value to display now
        awaitingNextValue = false;
    } else {
        // If the current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Add decimal function to calculator display if it doesn't already exist
function addDecimal() {
    if (awaitingNextValue) {
        return;
    }
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator value
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Prevent multiple operators from being entered
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        // Assign firstValue if no value
        firstValue = currentValue;
    } else if (!secondValue) {
        // Assign secondValue if no value
        secondValue = currentValue;

        // Calculate first and second values 
        const calculation = calculate[operatorValue](firstValue, secondValue);
        calculatorDisplay.textContent = calculation;

        // Set firstValue to calculation because we want to continue calculation
        firstValue = calculation;
        secondValue = 0;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add event listeners for numbers, operators, decimal buttons
inputButtons.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

// Reset all values, display
clearButton.addEventListener('click', resetAll);

function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    secondValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}
