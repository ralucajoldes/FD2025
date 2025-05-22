const template = document.createElement('template');
template.innerHTML = ` <div class="calculator">
<input type="text" id="display" readonly>
<button class="clear">C</button>
<div>
  <button class="number" data-value="7">7</button>
  <button class="number" data-value="8">8</button>
  <button class="number" data-value="9">9</button>
  <button class="operator" data-value="+">+</button>
</div>
<div>
  <button class="number" data-value="4">4</button>
  <button class="number" data-value="5">5</button>
  <button class="number" data-value="6">6</button>
  <button class="operator" data-value="-">-</button>
</div>
<div>
  <button class="number" data-value="1">1</button>
  <button class="number" data-value="2">2</button>
  <button class="number" data-value="3">3</button>
  <button class="operator" data-value="*">*</button>
</div>
<div>
  <button class="number" data-value="0">0</button>
  <button class="calculate">=</button>
  <button class="operator" data-value="/">/</button>
</div>
</div> 
<style>
        body,
        html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(237, 239, 233);
        }

        .container {
            display: flex;
        }

        .calculator {
            /* width: 300px; */
            background-color:rgb(204, 249, 242);
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin: 0 auto;
        }

        #display {
            width: calc(100% - 20px);
            margin-bottom: 10px;
            padding: 5px;
            font-size: 18px;
        }

        button {
            width: 70px;
            height: 50px;
            margin: 5px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            background-color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color:rgb(151, 243, 249);
        }

        .clear,
        .calculate {
            width: 154px;
            background-color:rgb(92, 190, 255);
            color: #fff;
        }

        .clear:hover,
        .calculate:hover {
            background-color:rgb(16, 91, 212);
        }
    </style>`;

class Calculator extends HTMLElement {
    constructor() {
        super();
        this.operand1 = '';
        this.operand2 = '';
        this.operator = '';
        this.result = '';
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true));
        this.attachEvents();
    }

    attachEvents() {
        const buttons = this.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                if (button.classList.contains('number')) {
                    this.appendNumber(value);
                } else if (button.classList.contains('operator')) {
                    this.setOperator(value);
                } else if (button.classList.contains('clear')) {
                    this.clearDisplay();
                } else if (button.classList.contains('calculate')) {
                    this.calculate();
                }
            });
        });
    }

    appendNumber(num) {
        if (this.operator === '') {
            this.operand1 += num.toString();
            this.updateDisplay(this.operand1);
        } else {
            this.operand2 += num.toString();
            this.updateDisplay(this.operand2);
        }
    }

    setOperator(op) {
        this.operator = op;
    }

    clearDisplay() {
        this.operand1 = '';
        this.operand2 = '';
        this.operator = '';
        this.updateDisplay('');
    }

    calculate() {
        switch (this.operator) {
            case '+':
                this.result = parseFloat(this.operand1) + parseFloat(this.operand2);
                break;
            case '-':
                this.result = parseFloat(this.operand1) - parseFloat(this.operand2);
                break;
            case '*':
                this.result = parseFloat(this.operand1) * parseFloat(this.operand2);
                break;
            case '/':
                this.result = parseFloat(this.operand1) / parseFloat(this.operand2);
                break;
            default:
                this.result = '';
        }
        this.updateDisplay(this.result);
        this.operand1 = this.result.toString();
        this.operand2 = '';
        this.operator = '';
    }

    updateDisplay(value) {
        const display = this.querySelector('#display');
        display.value = value;
    }
}

customElements.define('my-calculator', Calculator);
