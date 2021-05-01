// add
// subtract
// multiply
// divide

// operate
//  - takes an operator and 2 numbers and then calls one of the above functions on the numbers

(() => {
  /* Constants */
  const calcEl = document.querySelector("#calc-container");
  const displayEl = document.querySelector(".display");

  /* State */
  let state = null; // null, operator, value, equals
  let memory = null;
  let operator = null;

  /* Logical functions */
  const add = (x, y) => {
    return x + y;
  };

  const subtract = (x, y) => {
    return x - y;
  };

  const multiply = (x, y) => {
    return x * y;
  };

  const divide = (x, y) => {
    return x / y;
  };

  const operate = (operator, x, y) => {
    let val = null;
    switch (operator) {
      case "+":
        val = add(x, y);
        break;
      case "-":
        val = subtract(x, y);
        break;
      case "x":
        val = multiply(x, y);
        break;
      case "/":
        val = divide(x, y);
        break;
      default:
        console.log("should not reach this");
    }
    return +val.toFixed(8);
  };

  /* UI functions  */

  const appendToDisplay = (val) => {
    displayEl.textContent += val;
  };

  const replaceDisplay = (val) => {
    displayEl.textContent = val;
  };

  const clearDisplay = () => {
    displayEl.textContent = "0";
    memory = null;
    state = null;
  };

  const getDisplayValue = () => {
    return +displayEl.textContent;
  };

  /* Control flow  */

  calcEl.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.classList.contains("digit")) {
      // If decimal btn
      if (state == "equals") return;
      if (e.target.dataset.val == ".") {
        // if already a decimal or a 0, disallow
        if (getDisplayValue() % 1 == 0) {
          appendToDisplay(e.target.dataset.val);
        } else if (state == "operator") {
          replaceDisplay("0.");
        }
      } else if (state == null || state == "operator") {
        replaceDisplay(e.target.dataset.val);
        // otherwise, append to what is already on display
      } else if (state == "value") {
        if (getDisplayValue == 0) {
          appendToDisplay("." + e.target.dataset.val);
        } else {
          appendToDisplay(e.target.dataset.val);
        }
      }
      state = "value";
    } else if (e.target.classList.contains("operator")) {
      // "flash" number so something happens

      // if already in operator state, treat as equals
      if (operator != null) {
        replaceDisplay(operate(operator, memory, getDisplayValue()));
      }
      memory = getDisplayValue();
      operator = e.target.dataset.val;
      state = "operator";
    } else if (e.target.classList.contains("special")) {
      let val = e.target.dataset.val;
      if (val == "ac") {
        // all clear
        clearDisplay();
      } else if (val == "del") {
        // delete
      }
    } else if (e.target.classList.contains("equals")) {
      if (operator == null) return;
      replaceDisplay(operate(operator, memory, getDisplayValue()));
      operator = null;
      state = "equals";
    }
  });
})();
