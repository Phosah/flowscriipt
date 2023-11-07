document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "IPv6") {
      input.addEventListener("input", function (event) {
        let value = event.target.value;

        // Remove all non-digit and non-dot characters
        value = value.replace(/[^0-9.]/g, "");

        // Remove existing dots
        value = value.replace(/\./g, "");

        // Add a dot after every 3 digits
        value = value.replace(/(\d{3})/g, "$1.");

        // Remove the trailing dot, if any
        value = value.replace(/\.$/, "");

        event.target.value = value;
      });
    }
  });
});
