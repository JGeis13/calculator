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
      case "x":
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

  /* Control flow  */

  calcEl.addEventListener("mousedown", (e) => {
    // if not a button, don't do anything
    if (!e.target.classList.contains("btn")) return;

    // animate button press by adding class
    e.target.classList.add("pressed");

    const val = e.target.dataset.val;

    if (e.target.classList.contains("digit")) {
      // PRESSED A DIGIT BUTTON
      if (memory[getActiveMemorySlot()] == null) {
        // if mem1 is empty, replace display val and update mem1
        replaceDisplay(val);
      } else {
        // active memory is not empty - update display value by appending unless 0 is in memory
        appendToDisplay(val);
      }
      updateMemory(getDisplayValue());
    } else if (e.target.classList.contains("decimal")) {
      // PRESSED DECIMAL BUTTON
      // if at the start of value, add a 0 before
      if (memory[getActiveMemorySlot()] == null) {
        appendToDisplay(val);
        updateMemory(0);
      } else {
        // already something in memory
        if (memory[getActiveMemorySlot()] % 1 != 0) {
          // if already a decimal do nothing
          return;
        }
        // otherwise, append
        appendToDisplay(val);
      }
    } else if (e.target.classList.contains("operator")) {
      // PRESSED AN OPERATOR BUTTON

      // flash screen
      displayFlash();

      // if already have an operator and second value, complete operation and shift values
      if (operator && memory[1]) {
        memory[0] = operate(operator, memory[0], memory[1]);
        memory[1] = null;
        replaceDisplay(memory[0]);
      }

      // store operator
      operator = e.target.dataset.val;
    } else if (e.target.classList.contains("special")) {
      // PRESSED A SPECIAL BUTTON

      if (val == "ac") {
        // pressed AC button

        memory = [null, null];
        operator = null;
        clearDisplay();
      } else if (val == "del") {
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
    } else if (e.target.classList.contains("equals")) {
      // PRESSED EQUALS BUTTON

      // do nothing if no operator or second value stored
      if (operator == null || memory[1] == null) return;

      // set mem1 to returned operation value
      memory[0] = operate(operator, memory[0], memory[1]);
      // clear mem2
      memory[1] = null;
      // clear stored operator
      operator = null;
      // display operation value on screen
      replaceDisplay(memory[0]);
    }
    console.log(memory);
  });

  document.addEventListener("mouseup", (e) => {
    calcEl.querySelectorAll(".btn").forEach((btn) => btn.classList.remove("pressed"));
  });
})();
