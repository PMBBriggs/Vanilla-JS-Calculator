console.log('is this thing on?? ');

// create class (template) to store user selected information and functions for calculator
class Calculator {
    // constructor to hold inputs
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // functions the calculator can perform

    clear(){
        // clear out variables
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        // delete one number
        this.currentOperand = this.currentOperand.toString().slice(0 , -1);
    }

    appendNumber(number){
        // only one period
        if (number === '.' && this.currentOperand.includes('.')) return
        // adds number to screen 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        
        // won't execute code if no numbers are selected
        if (this.currentOperand === '') return;
        // still uses prev operation
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // cancels function if nothing is enteres
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation){
            case '+' : 
                computation = prev + current;
                break ;// not to follow any other case statement and leave the statement completely.

            case '-' : 
                computation = prev - current;
                break ;

            case '*' : 
                computation = prev * current;
                break ;

            case '/' : 
                computation = prev / current;
                break ;
            
            default: 
            return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}


// const to select each button 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// ask about square brackets around data attribute in query selector- array? 

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();
})