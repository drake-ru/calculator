
(function() {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');

    const calculator = (function() {
        const screenDisplay = document.querySelector('.screen');
        let firstNum = null;
        let operation = null;
        let recentlyClickedOperator = false;

        const operations = {
            "+": function (...nums) {
                return nums.reduce((total, num) => {
                    return total + parseInt(num);
                }, 0);
            },
            "-": function(...nums) {
                    return nums.reduce((total, num) => {
                        return total - num;
                    }
                );
            },
            "x": function sum(...nums) {
                    return nums.reduce((total, num) => {
                        return total * num;
                    }
                );
            },
            "/": function(...nums) {
                return nums.reduce((total, num) => {
                    return total / num;
                }
                );
            }
        }
    
        function operate(...nums) {
            return operation(...nums);
        }

        return {
            receiveNumber: function(numButton) {
                const content = numButton.textContent;
                if (screenDisplay.textContent === "0") {
                    screenDisplay.textContent = content;
                    recentlyClickedOperator = false;
                } else if (recentlyClickedOperator) {
                    firstNum = parseInt(screenDisplay.textContent);
                    screenDisplay.textContent = content;
                    recentlyClickedOperator = false;
                } else {
                    screenDisplay.textContent += content;
                }
            },
            receiveOperator: function(operator) {
                recentlyClickedOperator = true;
                if (firstNum !== null && (screenDisplay.textContent !== "0" || operator !== "/")) {
                    screenDisplay.textContent = operate(firstNum, parseInt(screenDisplay.textContent));
                    firstNum = null;
                } else if (firstNum !== null) {
                    screenDisplay.textContent = "no dividing by zero!";
                } else {
                    firstNum = parseInt(screenDisplay.textContent)
                    const oper = operator.textContent;
                    operator = operations[oper];
                }
            },
            receiveClear: function() {
                recentlyClickedOperator = false;
                firstNum = null;
                operation = null;
                screenDisplay.textContent = "0";
            },
            receiveEquals: function() {
                const secondNum = parseInt(screenDisplay.textContent);
                if (secondNum === 0 && operator === divide) {
                    screenDisplay.textContent = "no dividing by zero!";
                } else {
                    firstNum = operate(firstNum, secondNum);
                    screenDisplay.textContent = firstNum;
                }
            }
        }
    })();

    //NUMBER BUTTONS
    numberButtons.forEach(num => num.addEventListener('click', () => calculator.receiveNumber(num)));

    //OPERATOR BUTTONS
    operatorButtons.forEach(operator => operator.addEventListener('click', () => calculator.receiveOperator(operator)));

    //CLEAR BUTTON
    document.querySelector('#clear').addEventListener('click', () => calculator.receiveClear())

    //EQUALS BUTTON
    document.querySelector('#equals').addEventListener('click', () => calculator.receiveEquals())

})()