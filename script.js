
(function() {

    function add(...nums) {
        return nums.reduce((total, num) => {
            return total + parseInt(num);
        }, 0);
    }

    function subtract(...nums) {
        return nums.reduce((total, num) => {
            return total - num;
        });
    }

    function multiply(...nums) {
        return nums.reduce((total, num) => {
            return total * num;
        });
    }

    function divide(...nums) {
        return nums.reduce((total, num) => {
            return total / num;
        });
    }

    function operate(...nums) {
        return operation(...nums);
    }


    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const screenDisplay = document.querySelector('.screen');
    let displayValue = 0;
    screenDisplay.textContent = displayValue;
    let firstNum;
    let secondNum;
    let operation;
    let operatorsClicked = 0;

    //NUMBER BUTTONS
    numberButtons.forEach(num => {
        num.addEventListener('click', () => {
            //to begin with, before any number is clicked at all
            if (displayValue === 0) {
                displayValue = num.textContent;
                screenDisplay.textContent = displayValue;
                //to make multiple-digit numbers 
            } else if (operatorsClicked === 0) {
                displayValue += num.textContent;
                screenDisplay.textContent = displayValue;
                //to change first num to second num after operator has been clicked
            } else if (operatorsClicked > 0 && displayValue !== 0) {
                displayValue += num.textContent;
                screenDisplay.textContent = displayValue;
            }
        })
    })

     //adding keyboard support for number buttons
     document.addEventListener('keydown', (event) => {
        if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9' || event.key === '0') {
            if (displayValue === 0) {
                displayValue = event.key;
                screenDisplay.textContent = displayValue;
            } else if (operatorsClicked === 0) {
                displayValue += event.key;
                screenDisplay.textContent = displayValue;
            } else if (operatorsClicked > 0 && displayValue !== 0) {
                displayValue += event.key;
                screenDisplay.textContent = displayValue;
            }
        }
    })


    //OPERATOR BUTTONS
    operatorButtons.forEach(operator => {
        operator.addEventListener('click', () => {
            operatorsClicked++;
            if (operatorsClicked > 1) {
                if (operation === divide && displayValue === "0") {
                    screenDisplay.textContent = "no dividing by zero!";
                } else {
                screenDisplay.textContent = operate(firstNum, displayValue);
                displayValue = screenDisplay.textContent;
                }
            }
            firstNum = displayValue;
            displayValue = 0;
            let oper = operator.textContent;
                if (oper === "+") {
                    oper = add;
                } else if (oper === "-") {
                    oper = subtract;
                } else if (oper === "x") {
                    oper = multiply;
                } else if (oper === "/") {
                    oper = divide;
                }
            operation = oper;
        })
    })

    //adding keyboard support for operator buttons
   document.addEventListener('keydown', (operatorEvent) => {
       if (operatorEvent.shiftKey && operatorEvent.key === '+') {
           operatorsClicked++;
           if (operatorsClicked > 1) {
            if (operation === divide && displayValue === "0") {
                screenDisplay.textContent = "no dividing by zero!";
            } else {
            screenDisplay.textContent = operate(firstNum, displayValue);
            displayValue = screenDisplay.textContent;
            }
        }
        firstNum = displayValue;
        displayValue = 0;
            if (operatorEvent.shiftKey && operatorEvent.key === "+") {
                operation = add;
            } else if (operatorEvent.key === "-") {
                operation = subtract;
            } else if (operatorEvent.key === "x") {
                operation = multiply;
            } else if (operatorEvent.key === "/") {
                operation = divide;
            }
       } else if (operatorEvent.key !== '-' && operatorEvent.key !== '/' && operatorEvent.key !== 'x') {
           return;
       } else {
           operatorsClicked++;
           if (operatorsClicked > 1) {
                if (operation === divide && displayValue === "0") {
                    screenDisplay.textContent = "no dividing by zero!";
                } else {
                screenDisplay.textContent = operate(firstNum, displayValue);
                displayValue = screenDisplay.textContent;
                }
            }
            firstNum = displayValue;
            displayValue = 0;
                if (operatorEvent.shiftKey && operatorEvent.key === "+") {
                    operation = add;
                } else if (operatorEvent.key === "-") {
                    operation = subtract;
                } else if (operatorEvent.key === "x") {
                    operation = multiply;
                } else if (operatorEvent.key === "/") {
                    operation = divide;
                }
        }
       })
   
        

    const equals = document.querySelector('#equals');
    const clear = document.querySelector('#clear');

    //CLEAR BUTTON
    clear.addEventListener('click', () => {
        displayValue = 0;
        operatorsClicked = 0;
        firstNum = 0;
        secondNum = 0;
        operation = undefined;
        screenDisplay.textContent = displayValue;
    })

    //EQUALS BUTTON
    equals.addEventListener('click', () => {
        secondNum = displayValue;
            if (operation === divide && secondNum === "0") {
                screenDisplay.textContent = "no dividing by zero!";
            } else {
            screenDisplay.textContent = operate(firstNum, secondNum);
            }
    })

})()
