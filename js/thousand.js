document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "thousand") {
        const formattedValue = value.replace(/[^0-9]/g, "");

        // Split the formatted value into groups of 3 digits each from the end
        const groups = formattedValue.match(/\d{1,3}(?=(\d{3})*$)/g);

        this.value = groups ? groups.join(",") : "";
      }
    });
  });
});

console.log(`This script works `);
