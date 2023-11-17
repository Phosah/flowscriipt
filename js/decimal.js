document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "decimal") {
      // Set default value to '0'
      input.value = "0";

      input.addEventListener("keydown", function (event) {
        // If the initial value is '0' and the entered key is a digit, replace the initial '0' with the entered digit
        if (this.value === "0" && /\d/.test(event.key)) {
          event.preventDefault();
          this.value = event.key;
        }

        // If a dot already exists in the value, prevent the input of another dot
        if (event.key === "." && this.value.includes(".")) {
          event.preventDefault();
        }
      });

      input.addEventListener("input", function (event) {
        let value = event.target.value;

        // If the input is empty, set it back to '0'
        if (value === "") {
          this.value = "0";
          return;
        }

        // Replace non-digit and non-dot characters
        const numericValue = value.replace(/[^\d.]/g, "");

        // Ensure only one dot is present, and it must be after at least one number
        const parts = numericValue.split(".");
        if (parts.length > 1) {
          const integerPart = parts[0];
          const decimalPart = parts.slice(1).join("");
          this.value = /^\d+$/.test(integerPart) ? parts.join(".") : "0";
        } else {
          this.value = /^\d+$/.test(parts[0]) ? parts[0] : "0";
        }
      });
    }
  });
});
