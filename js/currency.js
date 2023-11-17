document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-currency");

    if (maskType === "currency") {
      input.value = "0.00";

      input.addEventListener("keydown", function (event) {
        // If the initial value is '0.00' and the entered key is a digit, replace the '0' with the entered digit
        if (this.value === "0.00" && /\d/.test(event.key)) {
          event.preventDefault();
          // this.value = event.key + ".00";
          this.value = `${maskChar}${event.key}.00`;
        }
      });

      input.addEventListener("input", function (event) {
        let value = event.target.value;

        let numericValue = value.replace(/[^\d.]/g, "");
        if (numericValue === "" || numericValue === maskChar) {
          this.value = maskChar + "0.00";
          return;
        }
        if (numericValue.charAt(0) !== maskChar && numericValue !== maskChar)
          numericValue = `${maskChar} ${numericValue}`;

        // Ensure only one decimal point is present
        const parts = numericValue.split(".");
        if (parts.length > 2) {
          parts.pop();
        }
        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].substring(0, 2);
        }

        // Add commas as thousand separators to the part before the decimal point
        const groups = parts[0].match(/\d{1,3}(?=(\d{3})*(\D|$))/g);
        parts[0] = groups ? groups.join(",") : "";

        // Append the currency symbol to the numeric value
        this.value = maskChar + parts.join(".");
      });
    }
  });
});
