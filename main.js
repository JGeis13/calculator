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

  /* UI functions  */

  const appendToDisplay = (val) => {
    displayEl.textContent += val;
  };

  const replaceDisplay = (val) => {
    displayEl.textContent = val;
  };

  /* Control flow  */

  calcEl.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("digit")) {
      // If a digit button was pressed and the screen is empty, replace display contents
      if (displayEl.textContent == "") {
        replaceDisplay(e.target.dataset.val);
        // otherwise, append to what is already on display
      } else if (displayEl.textContent != "") {
        appendToDisplay(e.target.dataset.val);
      }
    }
  });
})();
