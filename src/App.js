import './App.css';
import React from 'react';

const calcData = [
  { id: 'clear', value: 'AC' },
  { id: 'divide', value: '/' },
  { id: 'multiply', value: 'x' },
  { id: 'seven', value: 7 },
  { id: 'eight', value: 8 },
  { id: 'nine', value: 9 },
  { id: 'subtract', value: '-' },
  { id: 'four', value: 4 },
  { id: 'five', value: 5 },
  { id: 'six', value: 6 },
  { id: 'add', value: '+' },
  { id: 'one', value: 1 },
  { id: 'two', value: 2 },
  { id: 'three', value: 3 },
  { id: 'equals', value: '=' },
  { id: 'zero', value: 0 },
  { id: 'decimal', value: '.' },
];

const operators = ['AC', '/', 'x', '+', '-', '='];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => {
  return (
    <div className="output">
      <span className="result"></span>
      <span id="display" className="input">
        {input}
      </span>
    </div>
  );
};

const Key = ({ keyData: { id, value }, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

const Keyboard = ({ handleInput }) => {
  return calcData.map((keyData) => (
    <Key keyData={keyData} handleInput={handleInput} />
  ));
};

function App() {
  // in display screen
  // input will represent for the below one
  // calculatorData will reprensent for the above one
  const [input, setInput] = React.useState('0');
  const [output, setOutput] = React.useState('');
  const [calculatorData, setCalculatorData] = React.useState('');

  // button click function
  const handleInput = (value) => {
    //console.log({ value });
    // check if value == num/ op, if yes its return num/op, if not its return undefined
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case '=':
        handleSubmit();
        break;
      case 'AC':
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case '.':
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  const handleClear = () => {
    console.log('handleClear');
  };

  // handle number functions
  const handleNumbers = (value) => {
    // the input will set default 0 (display on calculator)
    // check if there is any number being added to initial calculator, then update input & calculatorData
    // so it will remove 0 and set the new value without 0 in front
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      // else the data is already inside calData
      // If value = 0, and the calcData/input has alreay 0,
      // so we must prevent the duplicate 0 when its displayed (show only 1 zero while spaming)
      if (value === 0 && (calculatorData === '0' || input === '0')) {
        setCalculatorData(`${calculatorData}`);
      } else {
        // lastChar = the last charactor value input
        // isLastCharOperator = check if the lastChar is operator ? true : false
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator =
          lastChar === '*' || operators.includes(lastChar);

        // if isLastCharOperator is true, update the input screen (which is above one)
        // and we do not show the operator in the display (which is below one)
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  // handle dot operator function
  const dotOperator = () => {
    // lastChar = the last charactor value input
    const lastChar = calculatorData.charAt(calculatorData.length - 1);

    // the input will set default 0 (display on calculator)
    // check if there is any number being added to initial calculator, then with the default 0 init, set input & calculatorData to (0.)
    if (!calculatorData.length) {
      setInput('0.');
      setCalculatorData('0.');
    } else {
      // If have operator
      if (lastChar === '*' || operators.includes(lastChar)) {
        setInput('0.');
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        // else if have NO operator
        // If lastChar === ".", return input, else input.
        // forExample: input = "0", click ".", return "0."
        // If input already have "0.", it prevent spamming like this "0............."
        setInput(
          lastChar === '.' || input.includes('.') ? `${input}` : `${input}.`
        );
        // same as calculatorData
        const formattedValue =
          lastChar === '.' || input.includes('.')
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    console.log({ value });
  };

  // update the output
  const handleOutput = () => {
    setOutput(calculatorData);
  };

  // This function will be always updated
  // when we update the calculatorData, the output will immediately update too
  React.useEffect =
    (() => {
      handleOutput();
    },
    [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <div className="keys">
          <Keyboard handleInput={handleInput} />
        </div>
      </div>
    </div>
  );
}

export default App;
