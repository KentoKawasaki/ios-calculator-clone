import React, { useEffect, useState } from "react";
import Display from  "./Display";
import Keypad from "./Keypad";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // coding some state below


    return (
      <div id="calculator-view" className ={"flex column jc-center ai-center"}>
        <div id="viewport" className={"flex column jc-sp-between ai-center"}>
          {/* <Display value={screenValue} />
          <Keypad actionToPerform={handleActionToPerform} allClear={isScreenClear} /> */}
        </div>
      </div>
    );
  }
}

export default Calculator;