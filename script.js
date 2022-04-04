//make functions for basic mathematical functions

/*function add(num1, num2) {
    return num1 + num2;
}*/
//use reduce!
(function() {

    function add(...nums) {
        return nums.reduce((total, num) => {
            return total + parseInt(num);
        }
        , 0);
    }

    function subtract(...nums) {
        return nums.reduce((total, num) => {
            return total - num;
        }
        );
    }

    function sum(...nums) {
        return nums.reduce((total, num) => {
            return total * num;
        }
        );
    }

    function divide(...nums) {
        return nums.reduce((total, num) => {
            return total / num;
        }
        );
    }

    function operate(...nums) {
        return operation(...nums);
    }

    //Create a new function 'operate' that takes an operator and 2 numbers and then calls one of the above functions on the numbers.


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
            } else if (operatorsClicked === 1 && displayValue !== 0) {
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
                screenDisplay.textContent = operate(firstNum, displayValue);
            }
            firstNum = displayValue;
            displayValue = 0;
            let oper = operator.textContent;
                if (oper === "+") {
                    oper = add;
                } else if (oper === "-") {
                    oper = subtract;
                } else if (oper === "*") {
                    oper = sum;
                } else if (oper === "/") {
                    oper = divide;
                }
            operation = oper;
            // if operator clicked more than once:
            // firstNum = displayValue 
            //
            /*OKAY WADDAFUCK*/
            
        })
    })

    //now make the calcuator work!
    //You’ll need to store the first number that is input into the calculator when a user presses an operator,
    // and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

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
        screenDisplay.textContent = operate(firstNum, secondNum);
    })

   
  
//PROBLEMS TO SOLVE:
//adding/etc numbers consecutively and updating the display value accordingly
//writing numbers of more than one digit for second number -> MAKE IT SO IT DEPENDS ON TYPE. STRING TO INTEGER. IF STRING, CARRY ON WRITING. IF NOT, CAN CALCULATE.
    /*
    algorithm:
    press number
    number gets stored in variable
    press operator
    operator gets stored in variable
    click another number
    function applies --> run function; clear operator; set resulting number as visual result 
     */
})()