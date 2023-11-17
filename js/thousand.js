document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "thousand") {
      input.value = "0";

      input.addEventListener("keydown", function (event) {
        if (this.value === "0" && /\d/.test(event.key)) {
          event.preventDefault();
          this.value = event.key;
        }
      });

      input.addEventListener("input", function (event) {
        let value = event.target.value;

        const formattedValue = value.replace(/[^0-9]/g, "");

        if (formattedValue === "") {
          this.value = "0";
          return;
        }

        // Split the formatted value into groups of 3 digits each from the end
        // const groups = formattedValue.match(/\d{1,3}(?=(\d{3})*$)/g);
        const groups = formattedValue.match(/\d{1,3}(?=(\d{3})*(\D|$))/g);

        this.value = groups ? groups.join(",") : "";
      });
    }
  });
});
