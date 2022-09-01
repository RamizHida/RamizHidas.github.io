let buttons = document.querySelectorAll(".btn-number, .btn-operator");
let display = document.querySelector(".display");
let clear = document.querySelector(".btn-clear");
let equals = document.querySelector(".btn-equals");

var displayBtn = "";
let result = 0;

buttons.forEach((btn) => {
  // add click event for each button
  btn.addEventListener("click", () => {
    // value of clicked button from attribute
    const btnValue = btn.getAttribute("data-num");
    window.displayBtn += "" + btnValue;
    display.textContent = "" + displayBtn;
  });
});

// clear the display
clear.addEventListener("click", () => {
  displayBtn = "";
  display.textContent = displayBtn;
});

equals.addEventListener("click", () => {
  displayBtn = "" + getAnswer(displayBtn);
  display.textContent = "" + result;
});

let getAnswer = function (num) {
  let newStr = [];
  // converts a string to a characterarray
  let list = num.split("");
  // empty buffer
  var buffer = "";
  // loop trough every character
  for (var i = 0; i < list.length; i++) {
    var thisone = list[i];
    // if it is NaN (Not A Number) then it is a operator
    if (isNaN(thisone)) {
      // if there is a old number, push it to the stack and reset it
      if (buffer.length > 0) {
        newStr.push(parseInt(buffer));
        buffer = "";
      }
      // push the operator
      newStr.push(thisone);
    } else {
      // it is not a operator it is a part of a number (buffer only includes numbers)
      buffer += thisone;
    }
  }
  // if there is still something left, push it on the stack, this is usually a number
  if (buffer.length > 0) {
    newStr.push(parseInt(buffer));
  }

  // find sum of array
  result = 0;
  for (let i = 0; i < newStr.length; i++) {
    if (i == 0) {
      result = newStr[i];
      continue;
    }
    if (i == newStr.length) {
      continue;
    }
    var operator = newStr[i];
    i++;
    var number2 = newStr[i];
    if (operator == "+") {
      result += number2;
    }
    if (operator == "-") {
      result -= number2;
    }
    if (operator == "/") {
      result /= number2;
    }
    if (operator == "*") {
      result *= number2;
    }
  }
  return result;
};
