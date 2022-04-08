
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

    function sum(...nums) {
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
                    oper = sum;
                } else if (oper === "/") {
                    oper = divide;
                }
            operation = oper;
        })
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
