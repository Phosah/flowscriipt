document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "productKey") {
        const formattedValue = value.replace(/[^a-zA-Z0-9]/g, "");

        // Split the formatted value into groups of 5 characters each
        const groups = formattedValue.match(/.{1,5}/g);

        // Join the groups with hyphens
        this.value = groups ? groups.join("-") : "";
      }
    });
  });
});

console.log(`This script works `);
