(() => {
  /* Constants */
  const calcEl = document.querySelector("#calc-container");
  const displayEl = document.querySelector(".display");

  /* State */
  let memory = [null, null];
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
      case "*":
        val = multiply(x, y);
        break;
      case "/":
        val = divide(x, y);
        break;
      default:
        console.log("should not reach this");
    }
    return +val.toFixed(8); // round to 8 decimal places
  };

  const getActiveMemorySlot = () => {
    if (!operator) return 0;
    else return 1;
  };

  const updateMemory = (val) => {
    memory[getActiveMemorySlot()] = val;
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
  };

  const getDisplayValue = () => {
    return +displayEl.textContent;
  };

  const displayFlash = () => {
    displayEl.style.fontSize = "0px";
    setTimeout(() => {
      displayEl.style.fontSize = "2rem";
    }, 50);
  };

  /* Control flow functions */

  const handleDigitPress = (val) => {
    if (operator == "equals") {
      // if just got operation value, reset when pressing new digit
      operator = null;
      replaceDisplay(val);
    } else if (memory[getActiveMemorySlot()] == null) {
      // if mem slot is empty or 0, replace display val and update mem
      replaceDisplay(val);
    } else {
      // active memory is not empty - update display value by appending unless 0 is in memory
      appendToDisplay(val);
    }
    updateMemory(getDisplayValue());
  };

  const handleDecimalPress = () => {
    // no double decimals
    if (displayEl.textContent.includes(".")) return;
    if (operator == "equals") {
      // if just got operation value, reset when pressing new digit
      operator = null;
      replaceDisplay("0.");
      updateMemory(getDisplayValue());
    } else if (memory[getActiveMemorySlot()] == null) {
      // if at the start of value, add a 0 before
      appendToDisplay(".");
      updateMemory(0);
    } else {
      // already something in memory
      if (memory[getActiveMemorySlot()] % 1 != 0) {
        // if already a decimal do nothing
        return;
      }
      // otherwise, append
      appendToDisplay(".");
    }
  };

  const handleOperatorPress = (val) => {
    // flash screen
    displayFlash();

    // if already have an operator and second value, complete operation and shift values
    if (operator && memory[1]) {
      memory[0] = operate(operator, memory[0], memory[1]);
      memory[1] = null;
      replaceDisplay(memory[0]);
    } else if (memory[0] == null) return;

    // store operator
    operator = val;
  };

  const handleSpecialPress = (val) => {
    if (val == "ac" || val == "Escape") {
      // pressed AC button

      memory = [null, null];
      operator = null;
      clearDisplay();
    } else if (val == "del" || val == "Backspace") {
      // pressed DEL button

      if (!memory[getActiveMemorySlot()]) return;

      replaceDisplay(
        getDisplayValue()
          .toString()
          .slice(0, getDisplayValue().toString().length - 1)
      );

      if (displayEl.textContent == "") {
        replaceDisplay(0);
      }
      updateMemory(getDisplayValue());
    }
  };

  const handleEqualsPress = () => {
    // do nothing if no operator or second value stored
    if (operator == null || memory[1] == null) return;

    // set mem1 to returned operation value
    memory[0] = operate(operator, memory[0], memory[1]);
    // clear mem2
    memory[1] = null;
    // clear stored operator
    operator = "equals";
    // display operation value on screen
    replaceDisplay(memory[0]);
  };

  calcEl.addEventListener("mousedown", (e) => {
    // if not a button, don't do anything
    if (!e.target.classList.contains("btn")) return;

    // animate button press by adding class
    e.target.classList.add("pressed");

    const val = e.target.dataset.val;

    if (e.target.classList.contains("digit")) {
      // PRESSED A DIGIT BUTTON
      handleDigitPress(val);
    } else if (e.target.classList.contains("decimal")) {
      // PRESSED DECIMAL BUTTON
      handleDecimalPress();
    } else if (e.target.classList.contains("operator")) {
      // PRESSED AN OPERATOR BUTTON
      handleOperatorPress(val);
    } else if (e.target.classList.contains("special")) {
      // PRESSED A SPECIAL BUTTON
      handleSpecialPress(val);
    } else if (e.target.classList.contains("equals")) {
      // PRESSED EQUALS BUTTON
      handleEqualsPress();
    }
    // console.log(memory);
  });

  /* Handle Keyboard Presses */
  document.addEventListener("keydown", (e) => {
    const k = e.key;
    console.log(k);
    if (k == "=") handleEqualsPress();
    else if (/[\+\-\/\*]/.test(k)) handleOperatorPress(k);
    else if (k == ".") handleDecimalPress();
    else if (/[0-9]/.test(k)) handleDigitPress(k);
    else if (k == "Backspace" || k == "Escape") handleSpecialPress(k);
    console.log(memory, operator);
  });

  document.addEventListener("mouseup", (e) => {
    calcEl.querySelectorAll(".btn").forEach((btn) => btn.classList.remove("pressed"));
  });
})();

/* Map to keys */
/* show which key was just hit and then fade away */
