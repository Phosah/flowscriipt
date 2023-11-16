document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-mask-char");

    if (maskType === "date") {
      if (maskChar === "") {
        maskChar = "_";
      }

      input.value = maskChar.repeat(10);
      input.value = input.value
        .split("")
        .map((char, index) => {
          if (index === 2 || index === 5) {
            return "/";
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

          if (pos !== 0 && input.value[pos - 1] !== "/") {
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
          .replace(/\//g, "")
          .replace(/\D/g, "");

        let formattedValue = maskChar.repeat(10).split("");

        formattedValue[2] = "/";
        formattedValue[5] = "/";

        input.value = formattedValue.join("");

        for (
          let i = 0, j = 0;
          i < value.length && j < formattedValue.length;
          j++
        ) {
          if (j === 2 || j === 5) {
            // Maintain the initial slashes
            formattedValue[j] = "/";
          } else {
            formattedValue[j] = value[i++];
          }
        }

        input.value = formattedValue.join("").slice(0, 10);

        let day = formattedValue.slice(0, 2).join("");
        let month = formattedValue.slice(3, 5).join("");
        let year = formattedValue.slice(6).join("");

        // Day formatting
        if (parseInt(day.charAt(0)) > 3) {
          day = "3" + day.charAt(1);
          formattedValue[0] = day.charAt(0);
        } else if (
          parseInt(day.charAt(0)) === 3 &&
          parseInt(day.charAt(1)) > 1
        ) {
          day = day.charAt(0) + "1";
          formattedValue[1] = day.charAt(1);
          console.log(`${day.charAt(1)} is greater than 1`);
        } else {
          formattedValue[0] = day.charAt(0);
          formattedValue[1] = day.charAt(1);
        }

        // Month formatting
        console.log(`month - ${month}`);
        let newMonth = month;
        if (parseInt(month.charAt(0)) > 1) {
          newMonth = "0" + month.charAt(1);
          formattedValue[3] = newMonth.charAt(0);
        } else if (
          parseInt(month.charAt(0)) === 1 &&
          parseInt(month.charAt(1)) > 2
        ) {
          newMonth = month.charAt(0) + "2";
          formattedValue[4] = newMonth.charAt(1);
        } else {
          formattedValue[3] = month.charAt(0);
          formattedValue[4] = month.charAt(1);
        }

        // Day limit based on month
        if (
          newMonth === "04" ||
          newMonth === "06" ||
          newMonth === "09" ||
          newMonth === "11"
        ) {
          if (parseInt(day) > 30) {
            day = "30";
            formattedValue[0] = day.charAt(0);
            formattedValue[1] = day.charAt(1);
          }
        } else if (newMonth === "02") {
          if (parseInt(day) > 29) {
            day = "29";
            formattedValue[0] = day.charAt(0);
            formattedValue[1] = day.charAt(1);
          }
        } else {
          if (parseInt(day) > 31) {
            day = "31";
            formattedValue[0] = day.charAt(0);
            formattedValue[1] = day.charAt(1);
          }
        }

        // Year formatting
        let newYear = year;
        if (!isNaN(parseInt(newYear.charAt(3)))) {
          if (parseInt(newYear) < 1900 || parseInt(newYear) > 2100) {
            newYear = new Date().getFullYear().toString();
            formattedValue[6] = newYear.charAt(0);
            formattedValue[7] = newYear.charAt(1);
            formattedValue[8] = newYear.charAt(2);
            formattedValue[9] = newYear.charAt(3);
          } else {
            formattedValue[6] = newYear.charAt(0);
            formattedValue[7] = newYear.charAt(1);
            formattedValue[8] = newYear.charAt(2);
            formattedValue[9] = newYear.charAt(3);
          }
        }

        event.target.value = formattedValue.join("");

        let nextUnderscoreIndex = input.value.indexOf(maskChar);
        if (nextUnderscoreIndex !== -1) {
          input.setSelectionRange(nextUnderscoreIndex, nextUnderscoreIndex);
        }
        console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
      });
    }
  });
});
