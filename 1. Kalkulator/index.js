let countSpace1 = document.getElementById("count1");
let countSpace2 = document.getElementById("count2");
let countSpace3 = document.getElementById("count3");
let operations = "";
let currentNumber = "";
let previousNumber = "";

function AddNumber(button) {
  let number = button.getAttribute("data-value");
  currentNumber += number;
  UpdateDisplay();
}

function AddOperations(op) {
  if (currentNumber) {
    previousNumber = currentNumber;
    currentNumber = "";
    operations = op;
    UpdateDisplay();
  }
}

function calculate() {
  if (currentNumber && previousNumber) {
    let result;
    let num1 = Number(previousNumber);
    let num2 = Number(currentNumber);
    switch (operations) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case ":":
        if (num2 === 0) {
          result = 0;
        } else if (num1 % num2 != 0) {
          result = num1 / num2;
          Number(result);
        } else {
          result = num1 / num2;
        }
        break;
      default:
        result = "Error";
        break;
    }
    currentNumber = result.toString();
    operations = "";
    previousNumber = "";
    UpdateDisplay();
  }
}

function clearAll() {
  currentNumber = "";
  operations = "";
  previousNumber = "";
  UpdateDisplay();
}

function DeleteLast() {
  currentNumber = currentNumber.slice(0, -1);
  UpdateDisplay();
}

function UpdateDisplay() {
  countSpace1.textContent = currentNumber;
  countSpace2.textContent = operations;
  countSpace3.textContent = previousNumber;
}
// document.getElementById("deleteAll").addEventListener("click", clearAll);
// document.getElementById("delete").addEventListener("click", DeleteLast);
// document.getElementById("%").addEventListener("click", AddOperations("%"));
// document.getElementById(":").addEventListener("click", AddOperations("/"));
// document.getElementById("*").addEventListener("click", AddOperations("*"));
// document.getElementById("-").addEventListener("click", AddOperations("-"));
// document.getElementById("+").addEventListener("click", AddOperations("+"));
// document.getElementById("=").addEventListener("click", AddOperations("="));
