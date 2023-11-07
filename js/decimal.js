document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "decimal") {
        const numericValue = value.replace(/[^\d.]/g, "");

        // Ensure only one decimal point is present
        const parts = numericValue.split(".");
        if (parts.length > 2) {
          parts.pop();
        }

        this.value = parts.join(".");
      }
    });
  });
});

console.log("This script works");
