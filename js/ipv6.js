document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-mask-char");

    if (maskType === "IPv6") {
      if (maskChar === "" || maskChar === ":") {
        maskChar = "_";
      }

      input.value = maskChar.repeat(39);

      input.value = input.value
        .split("")
        .map((char, index) => {
          if (
            index === 4 ||
            index === 9 ||
            index === 14 ||
            index === 19 ||
            index === 24 ||
            index === 29 ||
            index === 34
          ) {
            return ":";
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

          if (pos !== 0 && input.value[pos - 1] !== ":") {
            newValue[pos - 1] = maskChar;
            pos--;
          }

          input.value = newValue.join("");
          input.setSelectionRange(pos, pos);
        }
      });

      input.addEventListener("input", function (event) {
        const value = event.target.value.replace(/[^0-9a-f]/g, "");

        let formattedValue = maskChar.repeat(39).split("");

        formattedValue[4] = ":";
        formattedValue[9] = ":";
        formattedValue[14] = ":";
        formattedValue[19] = ":";
        formattedValue[24] = ":";
        formattedValue[29] = ":";
        formattedValue[34] = ":";

        for (
          let i = 0, j = 0;
          i < value.length && j < formattedValue.length;
          j++
        ) {
          if (
            j === 4 ||
            j === 9 ||
            j === 14 ||
            j === 19 ||
            j === 24 ||
            j === 29 ||
            j === 34
          ) {
            formattedValue[j] = ":";
            // continue;
          } else {
            formattedValue[j] = value[i++];
          }
        }

        input.value = formattedValue.join("").slice(0, 39);

        let nextUnderscoreIndex = input.value.indexOf(maskChar);
        if (nextUnderscoreIndex !== -1) {
          input.setSelectionRange(nextUnderscoreIndex, nextUnderscoreIndex);
        }

        console.log(event);
        console.log(`This is the value from input - ${event.target.value}`);
      });

      // input.addEventListener("input", function (event) {
      //   let value = event.target.value;

      //   if (maskType === "IPv6") {
      //     // Remove all non-hexadecimal and non-colon characters
      //     value = value.replace(/[^0-9a-fA-F:]/g, "");

      //     // Remove all colons
      //     value = value.replace(/:/g, "");

      //     // Split the value into segments of 4 characters
      //     const segments = value.match(/.{1,4}/g) || [];

      //     // If there are more than 8 segments, remove the extra
      //     if (segments.length > 8) {
      //       segments.length = 8;
      //     }

      //     // Join the segments with colons
      //     value = segments.join(":");

      //     if (value.length > 45) {
      //       value = value.slice(0, 45);
      //     }
      //   }

      //   event.target.value = value;
      // });
    }
  });
});
