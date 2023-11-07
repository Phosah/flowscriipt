document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "currency") {
        let numericValue = value.replace(/[^\d.]/g, "");

        if (numericValue === "" || numericValue === "$ ") {
          this.value = "";
          return;
        }

        if (numericValue.charAt(0) !== "$") numericValue = `$ ${numericValue}`;

        // Ensure only one decimal point is present
        const parts = numericValue.split(".");
        if (parts.length > 2) {
          parts.pop();
        }

        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].substring(0, 2);
        }

        this.value = parts.join(".");
      }
    });
  });
});

console.log("This script works");
