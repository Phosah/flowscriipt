document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "IPv4") {
      input.addEventListener("input", function (event) {
        let value = event.target.value;

        // Remove all non-digit and non-dot characters
        value = value.replace(/[^0-9.]/g, "");

        // Remove existing dots
        value = value.replace(/\./g, "");

        const segments = value.match(/\d{1,3}/g) || [];

        if (segments.length > 4) {
          segments.length = 4;
        }

        value = segments.join(".");

        event.target.value = value;
      });
    }
  });
});
