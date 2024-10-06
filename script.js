document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    
    let currentValue = '0';
    let previousValue = '';
    let operation = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentValue;
    }

    function clear() {
        currentValue = '0';
        previousValue = '';
        operation = null;
        updateDisplay();
    }

    function handleNumber(number) {
        if (currentValue === '0' || shouldResetDisplay) {
            currentValue = number;
            shouldResetDisplay = false;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }

    function handleDecimal() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateDisplay();
        }
    }

    function handleOperator(op) {
        if (operation !== null) {
            calculate();
        }
        previousValue = currentValue;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (!previousValue || !operation) return;
        
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;

        switch(operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
        }

        currentValue = result.toString();
        operation = null;
        updateDisplay();
    }

    function toggleSign() {
        currentValue = (parseFloat(currentValue) * -1).toString();
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                handleNumber(value);
            } else if (value === '.') {
                handleDecimal();
            } else if (value === 'C') {
                clear();
            } else if (value === '±') {
                toggleSign();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '×', '÷', '%'].includes(value)) {
                handleOperator(value);
            }
        });
    });
});
