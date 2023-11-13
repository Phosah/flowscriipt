document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    input.addEventListener("input", function (event) {
      let value = event.target.value;

      if (maskType === "phone") {
        console.log("Phone is working and active");
      }
    });
  });
});
