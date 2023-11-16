document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-mask-char");

    if (maskType === "productKey") {
      if (maskChar === "") {
        maskChar = "_";
      }

      input.value = maskChar.repeat(29);

      input.value = input.value
        .split("")
        .map((char, index) => {
          if (index === 5 || index === 11 || index === 17 || index === 23) {
            return "-";
          } else {
            return char;
          }
        })
        .join("");

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" || event.key === "Delete") {
          event.preventDefault();

          let pos = input.selectionStart;
          let newValue = input.value.split("");
          console.log(newValue);

          if (pos !== 0 && input.value[pos - 1] !== "-") {
            newValue[pos - 1] = maskChar;
            pos--;
          }

          input.value = newValue.join("");
          input.setSelectionRange(pos, pos);
        }
      });

      input.addEventListener("input", function (event) {
        const value = event.target.value
          .replace(new RegExp("\\" + maskChar, "g"), "")
          .replace(/[^a-zA-Z0-9]/g, "");

        let formattedValue = maskChar.repeat(29).split("");

        formattedValue[5] = "-";
        formattedValue[11] = "-";
        formattedValue[17] = "-";
        formattedValue[23] = "-";

        for (
          let i = 0, j = 0;
          i < value.length && j < formattedValue.length;
          j++
        ) {
          if (j === 5 || j === 11 || j === 17 || j === 23) {
            // formattedValue[j] = "-";
            continue;
          } else {
            formattedValue[j] = value[i++];
          }
        }

        // formattedValue[0] = "-";
        // formattedValue[1] = "-";
        // formattedValue[-1] = "-";
        // formattedValue[-1] = "-";

        // console.log(formattedValue[23]);

        // console.log(input.value);

        // for (
        //   let i = 0, j = 0;
        //   i < value.length && j < formattedValue.length;
        //   j++
        // ) {
        //   if (j === 5 || j === 11 || j === 17 || j === 23) {
        //     // Maintain the initial slashes
        //     formattedValue[j] = "-";
        //   } else {
        //     formattedValue[j] = value[i++];
        //   }
        // }

        input.value = formattedValue.join("").slice(0, 29);

        console.log(event);
        console.log(`This is the value from input - ${event.target.value}`);
      });
    }
  });
});
