document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "IPv6") {
        // Remove all non-hexadecimal and non-colon characters
        value = value.replace(/[^0-9a-fA-F:]/g, "");

        // Remove all colons
        value = value.replace(/:/g, "");

        // Split the value into segments of 4 characters
        const segments = value.match(/.{1,4}/g) || [];

        // If there are more than 8 segments, remove the extra
        if (segments.length > 8) {
          segments.length = 8;
        }

        // Join the segments with colons
        value = segments.join(":");

        if (value.length > 45) {
          value = value.slice(0, 45);
        }
      }

      event.target.value = value;
    });
  });
});
