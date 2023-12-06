document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");
    let maskChar = input.getAttribute("fs-input-mask-char");
    let maskCurrency = input.getAttribute("fs-input-currency");
    let maskCustom = input.getAttribute("fs-input-custom");

    // ************** Date input mask ************** //
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

    // ************** Product Key input mask ************** //
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

          console.log(newValue);
          input.value = newValue.join("");
          console.log(input.value);
          input.setSelectionRange(pos, pos);
        }

        // if (event.key === "Backspace" || event.key === "Delete") {
        //   event.preventDefault();
        //   let pos = input.selectionStart;
        //   let newValue = input.value.split("");
        //   if (event.key === "Backspace" && pos !== 0) {
        //     // Handle backspace key press
        //     for (let i = pos - 1; i >= 0; i--) {
        //       if (newValue[i] !== "-") {
        //         newValue[i] = maskChar;
        //         pos = i;
        //         break;
        //       }
        //     }
        //   } else if (event.key === "Delete" && pos !== input.value.length) {
        //     // Handle delete key press
        //     for (let i = pos; i < input.value.length; i++) {
        //       if (newValue[i] !== "-") {
        //         newValue[i] = maskChar;
        //         break;
        //       }
        //     }
        //   }
        //   input.value = newValue.join("");
        //   console.log(input.value);
        //   input.setSelectionRange(pos, pos);
        // }
      });

      input.addEventListener("input", function (event) {
        console.log(input.value);
        let currentValue = input.value;
        console.log(event.target.value);

        const value = event.target.value
          .replace(new RegExp("\\" + maskChar, "g"), "")
          .replace(/[^a-zA-Z0-9]/g, "");

        console.log(value);
        console.log(currentValue);

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

        input.value = formattedValue.join("").slice(0, 29);

        // Find the position of the next underscore and set the cursor position to that index
        let nextUnderscoreIndex = input.value.indexOf(maskChar);
        if (nextUnderscoreIndex !== -1) {
          input.setSelectionRange(nextUnderscoreIndex, nextUnderscoreIndex);
        }

        console.log(`This is the value from input - ${event.target.value}`);
      });
    }
    // ************** IPV4 input mask ************** //
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
    }

    // ************** IPV6 input mask ************** //
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

    // ************** Thousand input mask ************** //
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

    // ************** Decimal input mask ************** //
    if (maskType === "decimal") {
      // Set default value to '0'
      input.value = "0";

      input.addEventListener("keydown", function (event) {
        // If the initial value is '0' and the entered key is a digit, replace the initial '0' with the entered digit
        if (this.value === "0" && /\d/.test(event.key)) {
          event.preventDefault();
          this.value = event.key;
        }

        // If a dot already exists in the value, prevent the input of another dot
        if (event.key === "." && this.value.includes(".")) {
          event.preventDefault();
        }
      });

      input.addEventListener("input", function (event) {
        let value = event.target.value;

        // If the input is empty, set it back to '0'
        if (value === "") {
          this.value = "0";
          return;
        }

        // Replace non-digit and non-dot characters
        const numericValue = value.replace(/[^\d.]/g, "");

        // Ensure only one dot is present, and it must be after at least one number
        const parts = numericValue.split(".");
        if (parts.length > 1) {
          const integerPart = parts[0];
          const decimalPart = parts.slice(1).join("");
          this.value = /^\d+$/.test(integerPart) ? parts.join(".") : "0";
        } else {
          this.value = /^\d+$/.test(parts[0]) ? parts[0] : "0";
        }
      });
    }

    // ************** Currency input mask ************** //

    if (maskType === "currency") {
      input.value = "0.00";

      input.addEventListener("input", function (event) {
        let value = input.value;

        value = value.replace(/[^0-9.]/g, "");

        let parts = value.split(".");
        let integerPart = parts[0] || "0";
        let decimalPart = parts[1] || "00";

        let cursorPos = input.selectionStart;

        if (cursorPos === 1 && integerPart[1] === "0") {
          integerPart = integerPart.slice(0, 1);
        }

        if (integerPart.length > 1 && integerPart[0] === "0") {
          integerPart = integerPart.slice(1);
        }

        if (integerPart.length > 21) {
          integerPart = integerPart.slice(0, 25);
        }

        if (integerPart !== "0") {
          integerPart = maskCurrency + integerPart;
        }

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        decimalPart = decimalPart.slice(0, 2);

        input.value = integerPart + "." + decimalPart.padEnd(2, "0");

        let isCursorInDecimalPart = cursorPos > integerPart.length;

        //   Set cursor position to the end of the formatted integer part
        if (!isCursorInDecimalPart) {
          console.log(`integer length: ${integerPart.length}`);
          console.log(`cursor positon: ${cursorPos}`);

          //   for (let i = 0; i < integerPart.length; i++) {
          //     if (integerPart[i] === ",") {
          //       cursorPos++;
          //       //   cursorPos = integerPart.length + 1;
          //     }
          //   }
          cursorPos = integerPart.length;
        } else {
          cursorPos;
          console.log(`Cursor currently in decimal part`);
          console.log(`cursor position: ${cursorPos}`);
        }

        input.setSelectionRange(cursorPos, cursorPos);
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          // Check if the cursor is immediately after the dot
          if (input.selectionStart === input.value.indexOf(".") + 1) {
            // If it is, move the cursor to the position before the dot
            input.setSelectionRange(
              input.selectionStart - 1,
              input.selectionStart - 1
            );
            event.preventDefault();
          }
        }
      });
    }

    // ************** Custom input mask ************** //
    if (maskType === "custom") {
      input.addEventListener("input", function (event) {
        const originalInputValue = event.target.value;

        const handlers = {
          // For digits only
          0: function (inputValue, maxLength) {
            const numericValue = inputValue
              ? inputValue.replace(/[^0-9]/g, "")
              : "";
            return numericValue.length > maxLength
              ? numericValue.slice(0, maxLength)
              : numericValue;
          },

          // For Alphabets only
          L: function (inputValue, maxLength) {
            const alphaValue = inputValue
              ? inputValue.replace(/[^a-zA-Z]/g, "")
              : "";
            return alphaValue.length > maxLength
              ? alphaValue.slice(0, maxLength)
              : alphaValue;
          },

          // For Digit or space, optional, Plus(+) and minus(-) signs are allowed.
          "#": function (inputValue, maxLength) {
            const validValue = inputValue
              ? inputValue.replace(/[^0-9+\- ]/g, "")
              : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // For Digit or space, optional.
          9: function (inputValue, maxLength) {
            const validValue = inputValue
              ? inputValue.replace(/[^0-9 ]/g, "")
              : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Alphanumeric (A-Za-z0-9) required.
          A: function (inputValue, maxLength) {
            const validValue = inputValue
              ? inputValue.replace(/[^a-zA-Z0-9]/g, "")
              : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Letter or space, optional
          "?": function (inputValue, maxLength) {
            const validValue = inputValue
              ? inputValue.replace(/[^a-zA-Z ]/g, "")
              : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Requires a character.
          "&": function (inputValue, maxLength) {
            const validValue = inputValue ? inputValue.trim() : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Character or space, optional
          C: function (inputValue, maxLength) {
            const validValue = inputValue ? inputValue : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Alphanumeric (A-Za-z0-9) or space, optional.
          a: function (inputValue, maxLength) {
            const validValue = inputValue
              ? inputValue.replace(/[^a-zA-Z0-9 ]/g, "")
              : "";
            return validValue.length > maxLength
              ? validValue.slice(0, maxLength)
              : validValue;
          },

          // Shift down. Converts all characters to lower case.
          "<": function (inputValue, maxLength) {
            const lettersOnly = inputValue
              ? inputValue.replace(/[^a-zA-Z]/g, "")
              : "";
            const lowercaseValue = lettersOnly.toLowerCase();

            return lowercaseValue.length > maxLength
              ? lowercaseValue.slice(0, maxLength)
              : lowercaseValue;
          },

          // Shift down. Converts all characters to upper case.
          ">": function (inputValue, maxLength) {
            const lettersOnly = inputValue
              ? inputValue.replace(/[^a-zA-Z]/g, "")
              : "";
            const uppercaseValue = lettersOnly.toUpperCase();

            return uppercaseValue.length > maxLength
              ? uppercaseValue.slice(0, maxLength)
              : uppercaseValue;
          },

          //     // Escapes a mask character, turning it into a literal.
          //     else if (maskCustom === "\\") {
          //       console.log(input.value);
          //     }

          //     // Disable a previous shift up or shift down.
          //     else if (maskCustom === "|") {
          //       console.log(input.value);
          //     }
          //   });
          // }
        };

        let currentValue = "";
        let currentIndex = 0;

        // for (let i = 0; i <= maskCustom.length; i++) {
        //   const char = maskCustom[i];
        //   if (handlers[char]) {
        //     currentValue += handlers[char](originalInputValue[currentIndex]);
        //     currentIndex++;
        //   }
        // }

        for (let char of maskCustom) {
          if (handlers[char]) {
            currentValue += handlers[char](originalInputValue[currentIndex]);
            currentIndex++;
          }
        }

        input.value = currentValue;
        console.log(`This is the final input: ${input.value}`);
      });
    }

    // ///////////////////////////////////////////
    // ///////////////This code works!!!!//////////
    // ///////////////////////////////////////////

    // ************** Custom input mask ************** //
    // if (maskType === "custom") {
    //   input.addEventListener("input", function (event) {
    //     const originalInputValue = event.target.value;

    //     const handlers = {
    //       0: function (char) {
    //         return char && char.match(/[0-9]/) ? char : "";
    //       },

    //       L: function (char) {
    //         return char && char.match(/[a-zA-Z]/) ? char : "";
    //       },

    //       "#": function (char) {
    //         return char && char.match(/[0-9+\- ]/) ? char : "";
    //       },
    //     };

    //     let currentValue = "";
    //     let i = 0;

    //     for (let char of maskCustom) {
    //       if (handlers[char]) {
    //         currentValue += handlers[char](originalInputValue[i]) || "";
    //         i += 1;
    //       } else {
    //         // currentValue += char;
    //         console.log(char);
    //       }
    //     }

    //     console.log(`currentValue: ${currentValue}`);
    //     input.value = currentValue;
    //   });
    // }

    // ///////////////////////////////////////////
    // ///////////////This code works for single characters!!!!//////////
    // ///////////////////////////////////////////
    // ************** Custom input mask ************** //
    // if (maskType === "custom") {
    //   input.addEventListener("keypress", function (event) {
    //     const charCode = event.which ? event.which : event.keyCode;

    //     if (maskCustom.includes("0")) {
    //       // For digits only
    //       if (charCode < 48 || charCode > 57) {
    //         event.preventDefault();
    //       }
    //     }
    //   });

    //   input.addEventListener("input", function (event) {
    //     const inputValue = event.target.value;
    //     const maxLength = maskCustom.length;

    //     // For digits only
    //     if (maskCustom.includes("0")) {
    //       const numericValue = inputValue.replace(/[^0-9]/g, "");

    //       if (numericValue.length > maxLength) {
    //         input.value = numericValue.slice(0, maxLength);
    //       } else {
    //         input.value = numericValue;
    //       }
    //     }

    //     // For Alphabets only
    //     else if (maskCustom.includes("L")) {
    //       const alphaValue = inputValue.replace(/[^a-zA-Z]/g, "");

    //       if (alphaValue.length > maxLength) {
    //         input.value = alphaValue.slice(0, maxLength);
    //       } else {
    //         input.value = alphaValue;
    //       }
    //     }

    //     // For Digit or space, optional, Plus(+) and minus(-) signs are allowed.
    //     else if (maskCustom.includes("#")) {
    //       const validValue = inputValue.replace(/[^0-9+\- ]/g, "");

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // For Digit or space, optional.
    //     else if (maskCustom.includes("9")) {
    //       const validValue = inputValue.replace(/[^0-9 ]/g, "");

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Alphanumeric (A-Za-z0-9) required.
    //     else if (maskCustom.includes("A")) {
    //       const validValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Letter or space, optional
    //     else if (maskCustom.includes("?")) {
    //       const validValue = inputValue.replace(/[^a-zA-Z ]/g, "");

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Requires a character.
    //     else if (maskCustom.includes("&")) {
    //       const validValue = inputValue.trim();

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Character or space, optional
    //     else if (maskCustom.includes("C")) {
    //       const validValue = inputValue;

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Alphanumeric (A-Za-z0-9) or space, optional.
    //     else if (maskCustom.includes("a")) {
    //       const validValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");

    //       if (validValue.length > maxLength) {
    //         input.value = validValue.slice(0, maxLength);
    //       } else {
    //         input.value = validValue;
    //       }
    //     }

    //     // Shift down. Converts all characters to lower case.
    //     else if (maskCustom.includes("<")) {
    //       const lowercaseValue = inputValue.toLowerCase();

    //       if (lowercaseValue.length > maxLength) {
    //         input.value = lowercaseValue.slice(0, maxLength);
    //       } else {
    //         input.value = lowercaseValue;
    //       }
    //     }

    //     // Shift up. Converts all characters to upper case.
    //     else if (maskCustom.includes(">")) {
    //       const uppercaseValue = inputValue.toUpperCase();

    //       if (uppercaseValue.length > maxLength) {
    //         input.value = uppercaseValue.slice(0, maxLength);
    //       } else {
    //         input.value = uppercaseValue;
    //       }
    //     }

    //     // Escapes a mask character, turning it into a literal.
    //     else if (maskCustom === "\\") {
    //       console.log(input.value);
    //     }

    //     // Disable a previous shift up or shift down.
    //     else if (maskCustom === "|") {
    //       console.log(input.value);
    //     }
    //   });
    // }
  });
});
