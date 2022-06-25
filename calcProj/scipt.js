"use strict";

navigator.registerProtocolHandler(
  "web+Ramiz",
  "http://127.0.0.1:56675/?calculator=%s",
  "Ramiz Calculator"
);

// ["1","+","10"]
// 10+10+10                             :: calculation
// ['1','0','+','1','0','+','1','0']    :: rawCal
// ""                                   :: buffer
// ["10","+"...]                           :: steps
function getCalculation(calculation) {
  let steps = [];
  let rawCal = calculation.split("");
  let buffer = "";
  let operators = ["+", "-", "*", "/"];
  for (let i = 0; i < rawCal.length; i++) {
    let current_value = rawCal[i];
    if (current_value == " ") {
      // this is a invalid character, so skip it
      continue;
    } else if (operators.includes(current_value)) {
      // it is a operator
      if (buffer.length != 0) {
        steps.push(Number(buffer));
        buffer = "";
      }
      steps.push(current_value);
    } else {
      // it is just a number
      buffer = buffer + current_value;
    }
  }
  //['10','+','10','+']
  if (buffer.length != 0) {
    steps.push(Number(buffer));
  }
  //['10','+','10','+','10']
  if (steps.length == 0) {
    return 0;
  }
  let result = steps[0]; // 10
  for (let j = 1; j < steps.length; j++) {
    let currentOperator = steps[j];
    j++;
    let currentMathValue = steps[j];
    if (currentOperator == "+") {
      result += currentMathValue;
    } else if (currentOperator == "-") {
      result -= currentMathValue;
    } else if (currentOperator == "/") {
      result /= currentMathValue;
    } else if (currentOperator == "*") {
      result *= currentMathValue;
    }
  }

  // calculate the result
  return result;
}

let getUrl = location.href;
if (getUrl.includes("?")) {
  let searchPar = new URLSearchParams(getUrl.split("?")[1]);
  for (let pair of searchPar.entries()) {
    if (pair[0] == "calculator") {
      calculatorresult.value = getCalculation(pair[1]);
    }
  }
}
