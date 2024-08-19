class Calculator {
  constructor(displayButtonTextElement) {
    this.displayButtonTextElement = displayButtonTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayButtonTextElement.value = this.currentOperand;
  }
}

const displayButtonTextElement = document.querySelector('[data-display]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');

const calculator = new Calculator(displayButtonTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === '=') {
      calculator.compute();
    } else {
      calculator.chooseOperation(button.innerText);
    }
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
});
