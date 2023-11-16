document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-mask-char");

    if (maskType === "IPv4") {
      if (maskChar === "" || maskChar === ".") {
        maskChar = "_";
      }

      input.value = maskChar.repeat(15);

      input.value = input.value
        .split("")
        .map((char, index) => {
          if (index === 3 || index === 7 || index === 11) {
            return ".";
          } else {
            return char;
          }
        })
        .join("");
      console.log(input.value);

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" || event.key === "Delete") {
          event.preventDefault();

          let pos = input.selectionStart;
          let newValue = input.value.split("");
          console.log(newValue);

          if (pos !== 0 && input.value[pos - 1] !== ".") {
            newValue[pos - 1] = maskChar;
            pos--;
          }

          input.value = newValue.join("");
          input.setSelectionRange(pos, pos);
        }
      });

      input.addEventListener("input", function (event) {
        // const value = event.target.value.replace(/[^0-9.]/g, "");
        const value = event.target.value.replace(/\D/g, "");

        let formattedValue = maskChar.repeat(15).split("");

        formattedValue[3] = ".";
        formattedValue[7] = ".";
        formattedValue[11] = ".";

        for (
          let i = 0, j = 0;
          i < value.length && j < formattedValue.length;
          j++
        ) {
          if (j === 3 || j === 7 || j === 11) {
            formattedValue[j] = ".";
            // continue;
          } else {
            formattedValue[j] = value[i++];
          }
        }

        input.value = formattedValue.join("").slice(0, 15);

        let nextUnderscoreIndex = input.value.indexOf(maskChar);
        if (nextUnderscoreIndex !== -1) {
          input.setSelectionRange(nextUnderscoreIndex, nextUnderscoreIndex);
        }

        console.log(event);
        console.log(`This is the value from input - ${event.target.value}`);
      });

      // input.addEventListener("input", function (event) {
      //   let value = event.target.value;

      //   // Remove all non-digit and non-dot characters
      //   value = value.replace(/[^0-9.]/g, "");

      //   // Remove existing dots
      //   value = value.replace(/\./g, "");

      //   const segments = value.match(/\d{1,3}/g) || [];

      //   if (segments.length > 4) {
      //     segments.length = 4;
      //   }

      //   value = segments.join(".");

      //   event.target.value = value;
      // });
    }
  });
});
