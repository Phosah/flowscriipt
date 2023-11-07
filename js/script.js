document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "date") {
      input.addEventListener("input", function (event) {
        const value = event.target.value;
        console.log(value);

        const sanitizedValue = value.replace(/[^0-9]/g, "");

        let formattedValue = "";

        for (let i = 0; i < sanitizedValue.length; i++) {
          if (i === 2 || i === 4) {
            formattedValue += "/" + sanitizedValue[i];
          } else {
            formattedValue += sanitizedValue[i];
          }
        }

        formattedValue = formattedValue.substring(0, 10);

        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (regex.test(formattedValue)) {
          let day = parseInt(formattedValue.substring(0, 2));
          let month = parseInt(formattedValue.substring(3, 5));
          let year = parseInt(formattedValue.substring(6, 10));

          if (day > 31) {
            day = 31;
          }

          if (month > 12) {
            month = 12;
          }

          const currentYear = new Date().getFullYear();
          if (year < 1900 || year > 2100) year = currentYear;

          formattedValue = `${day.toString().padStart(2, "0")}/${month
            .toString()
            .padStart(2, "0")}/${year}`;
        }

        event.target.value = formattedValue;
      });
    }
  });
});
