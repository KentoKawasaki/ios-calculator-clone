import React from "react";
import Display from "./Display";
import Keypad from "./Keypad";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accValue: null,
      screenValue: "0",
      currentOperator: null,
      expectsOperand: false,
    };

    this.handleActionToPerform = this.handleActionToPerform.bind(this);
    this.handleClickFunctionKey = this.handleClickFunctionKey.bind(this);
    this.handleClickOperator = this.handleClickOperator.bind(this);
    this.allClear = this.allClear.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.reverseSign = this.reverseSign.bind(this);
    this.percentage = this.percentage.bind(this);
    this.addDecimalPoint = this.addDecimalPoint.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.clearLastDigit = this.clearLastDigit.bind(this);
    this.handleClickNumericKey = this.handleClickNumericKey.bind(this);
    this.handleClickOperator = this.handleClickOperator.bind(this);
    this.operate = this.operate.bind(this);
  }

  /* Mount and Un for keydown event */
  componentDidMount() {
    document.addEventListener("keydown", () =>
      this.handleKeyDown(this.state.screenValue)
    );
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", () =>
      this.handleKeyDown(this.state.screenValue)
    );
  }

  /* The overall state */
  handleActionToPerform(value, keyType) {
    switch (keyType) {
      case "fx":
        this.handleClickFunctionKey(value);
        break;
      case "numeric":
        this.handleClickNumericKey(value);
        break;
      case "operator":
        this.handleClickOperator(value);
        break;
      default:
        return value;
    }
  }

  /* Function Keys */
  handleClickFunctionKey(value) {
    switch (value) {
      case "AC":
        this.allClear();
        break;
      case "C":
        this.clearScreen();
        break;
      case "+/-":
        this.reverseSign();
        break;
      case "%":
        this.percentage();
        break;
      case ".":
        this.addDecimalPoint();
        break;
      default:
        return value;
    }
  }

  // All clear
  allClear() {
    this.setState({
      accValue: null,
      screenValue: "0",
      currentOperator: null,
      expectsOperand: false,
    });
  }
  // Clear Screen
  clearScreen() {
    this.setState({
      screenValue: "0",
    });
  }
  // Reverse sign
  reverseSign() {
    this.setState((state) => ({
      screenValue: String(-parseFloat(state.screenValue)),
    }));
  }
  // Percentage
  percentage() {
    this.setState((state) => ({
      screenValue: String(parseFloat(state.screenValue) / 100),
    }));
  }
  // Add Decimal point
  addDecimalPoint() {
    const { expectsOperand, screenValue } = this.state;
    if (expectsOperand) {
      this.setState({
        setScreenValue: "0.",
      });
    } else {
      if (!screenValue.includes(".")) {
        this.setState((state) => ({
          screenValue: state.screenValue + ".",
        }));
      }
    }
    this.setState({
      expectsOperand: false,
    });
  }

  /* Delete last digit */
  handleKeyDown(e) {
    if (e.key === "Backspace") {
      e.preventDefault();
      this.clearLastDigit();
    }
  }
  clearLastDigit() {
    if (this.screenValue !== "0") {
      if (this.screenValue.length > 1) {
        this.setState((state) => ({
          screenValue: state.screenValue.substring(
            0,
            state.screenValue.length - 1
          ),
        }));
      } else {
        this.setState({
          screenValue: "0",
        });
      }
    }
  }

  /* Numeric keys */
  handleClickNumericKey(value) {
    console.log(value);
    console.log(this.state);
    if (this.state.expectsOperand) {
      this.setState({
        screenValue: String(value),
        expectsOperand: false,
      });
    } else {
      this.setState((state) => ({
        screenValue:
          state.screenValue === "0" ? String(value) : state.screenValue + value,
      }));
    }
  }

  /* Operator keys */
  handleClickOperator(operator) {
    const { accValue, screenValue, currentOperator } = this.state;
    const inputValue = parseFloat(screenValue);
    if (accValue === null) {
      this.setState({
        accValue: inputValue,
      });
    } else {
      if (currentOperator) {
        const resultValue = this.operate(currentOperator, accValue, inputValue);
        this.setState({
          accValue: resultValue,
          screenValue: String(resultValue),
        });
      }
    }
    this.setState({
      expectsOperand: true,
      currentOperator: operator,
    });
  }

  operate (operator, accValue, inputValue) {
    switch (operator) {
      case "+": return accValue + inputValue;
      case "-": return accValue - inputValue;
      case "x": return accValue * inputValue;
      case "/": return accValue / inputValue;
      case "=": return inputValue;
      default: return "Error";
    }
  }

  render() {
    // coding some state below
    const isScreenClear = this.state.screenValue === "0";

    return (
      <div id="calculator-view" className="flex column jc-center ai-center">
        <div id="viewport" className="flex column jc-sp-between ai-center">
          <Display value={this.state.screenValue} />
          <Keypad actionToPerform={this.handleActionToPerform} allClear={isScreenClear} />
        </div>
      </div>
    );
  }
}

export default Calculator;
