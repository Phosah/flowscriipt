// document.addEventListener("DOMContentLoaded", function () {
//   const inputElements = document.querySelectorAll("[fs-input-mask]");

//   inputElements.forEach(function (input) {
//     const maskType = input.getAttribute("fs-input-mask");

//     if (maskType === "date") {
//       input.value = "__/__/____";

//       input.addEventListener("keydown", function (event) {
//         if (event.key === "Backspace" || event.key === "Delete") {
//           event.preventDefault();

//           let pos = input.selectionStart;
//           if (pos !== 0) {
//             pos--;
//             if (input.value[pos - 1] === "/") {
//               pos--;
//             }
//             input.value =
//               input.value.substring(0, pos - 1) +
//               "_" +
//               input.value.substring(pos);
//             input.setSelectionRange(pos - 1, pos - 1);
//           }
//         }
//       });

//       input.addEventListener("input", function (event) {
//         console.log(`Pressed key: ${event.key}`);
//         const value = event.target.value.replace(/_/g, "").replace(/\//g, "");
//         let formattedValue = "__/__/____".split("");
//         console.log(`Formatted value: ${formattedValue}`);

//         for (
//           let i = 0, j = 0;
//           i < value.length && j < formattedValue.length;
//           i++, j++
//         ) {
//           if (j === 2 || j === 5) {
//             j++;
//           }
//           formattedValue[j] = value[i];
//         }

//         event.target.value = formattedValue.join("");
//       });
//     }
//   });
// });

// Reusable example
// document.addEventListener("DOMContentLoaded", function () {
//   const inputElements = document.querySelectorAll("[fs-input-mask]");

//   inputElements.forEach(function (input) {
//     const maskType = input.getAttribute("fs-input-mask");

//     if (maskType === "date") {
//       input.value = "__/__/____";

//       input.addEventListener("keydown", function (event) {
//         if (event.key === "Backspace" || event.key === "Delete") {
//           event.preventDefault();

//           let pos = input.selectionStart;
//           if (pos !== 0) {
//             if (input.value[pos - 1] === "/") {
//               pos--;
//             }
//             input.value =
//               input.value.substring(0, pos - 1) +
//               "_" +
//               input.value.substring(pos);
//             input.setSelectionRange(pos - 1, pos - 1);
//           }
//         }
//       });

//       input.addEventListener("input", function (event) {
//         const value = event.target.value.replace(/_/g, "").replace(/\//g, "");
//         let formattedValue = "__/__/____".split("");

//         // Extract day, month, and year
//         let day = value.substring(0, 2);
//         let month = value.substring(2, 4);
//         let year = value.substring(4);

//         // Apply default values if needed
//         day = Math.min(31, parseInt(day, 10) || 31)
//           .toString()
//           .padStart(2, "0");
//         month = Math.min(12, parseInt(month, 10) || 12)
//           .toString()
//           .padStart(2, "0");
//         year = Math.max(
//           1900,
//           Math.min(
//             new Date().getFullYear(),
//             parseInt(year, 10) || new Date().getFullYear()
//           )
//         )
//           .toString()
//           .padStart(4, "0");

//         formattedValue[0] = day.charAt(0);
//         formattedValue[1] = day.charAt(1);
//         formattedValue[3] = month.charAt(0);
//         formattedValue[4] = month.charAt(1);
//         formattedValue[6] = year.charAt(0);
//         formattedValue[7] = year.charAt(1);
//         formattedValue[8] = year.charAt(2);
//         formattedValue[9] = year.charAt(3);

//         for (let i = 0; i < formattedValue.length; i++) {
//           if (formattedValue[i] !== "_") {
//             formattedValue[i] = event.target.value[i];
//           }
//         }

//         event.target.value = formattedValue.join("");
//       });
//     }
//   });
// });

// Reusable example
// document.addEventListener("DOMContentLoaded", function () {
//   const inputElements = document.querySelectorAll("[fs-input-mask]");

//   inputElements.forEach(function (input) {
//     const maskType = input.getAttribute("fs-input-mask");

//     if (maskType === "date") {
//       input.value = "__/__/____";

//       input.addEventListener("keydown", function (event) {
//         if (event.key === "Backspace" || event.key === "Delete") {
//           event.preventDefault();

//           let pos = input.selectionStart;

//           if (pos > 0 && pos < 11) {
//             if (input.value.charAt(pos - 1) !== "/") {
//               input.value =
//                 input.value.substring(0, pos - 1) +
//                 "_" +
//                 input.value.substring(pos);
//               input.setSelectionRange(pos - 1, pos - 1);
//             }
//           }
//         }
//       });

//       input.addEventListener("input", function (event) {
//         let pos = input.selectionStart;
//         let newValue = input.value.replace(/[^0-9\/]/g, "_").substr(0, 10);
//         if (newValue.charAt(pos - 1) === "/") {
//           pos++;
//         }
//         input.value = newValue;
//         input.setSelectionRange(pos, pos);
//       });
//     }

//     for (let i = 0; i < input.value.length; i++) {
//       console.log(input.value.charAt(i));
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const inputElements = document.querySelectorAll("[fs-input-mask]");

//   inputElements.forEach(function (input) {
//     const maskType = input.getAttribute("fs-input-mask");

//     if (maskType === "date") {
//       input.value = "__/__/____";

//       input.addEventListener("keydown", function (event) {
//         if (event.key === "Backspace" || event.key === "Delete") {
//           event.preventDefault();

//           let pos = input.selectionStart;
//           console.log(pos);
//           if (pos !== 0) {
//             let newValue = input.value.split("");
//             pos--;

//             if (input.value[pos] !== "/") {
//               newValue[pos] = "_";
//               input.value = newValue.join("");
//             } else {
//               pos--; // Skip the slash '/'
//             }

//             input.setSelectionRange(pos, pos);
//           }
//         }
//       });

//       input.addEventListener("input", function (event) {
//         const value = event.target.value.replace(/_/g, "").replace(/\//g, "");
//         let formattedValue = "__/__/____".split("");

//         for (
//           let i = 0, j = 0;
//           i < value.length && j < formattedValue.length;
//           i++, j++
//         ) {
//           if (j === 2 || j === 5) {
//             j++;
//           }
//           formattedValue[j] = value[i];
//         }

//         event.target.value = formattedValue.join("");
//       });
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll("[fs-input-mask]");

  inputElements.forEach(function (input) {
    const maskType = input.getAttribute("fs-input-mask");

    if (maskType === "date") {
      input.value = "__/__/____";

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" || event.key === "Delete") {
          event.preventDefault();

          let pos = input.selectionStart;
          let newValue = input.value.split("");
          console.log(newValue);

          if (event.key === "Backspace" || event.key === "Delete") {
            if (pos !== 0 && input.value[pos - 1] !== "/") {
              newValue[pos - 1] = "_";
              pos--;
            }
          }

          input.value = newValue.join("");
          input.setSelectionRange(pos, pos);
        }
      });

      input.addEventListener("input", function (event) {
        // const value = event.target.value.replace(/_/g, "").replace(/\//g, "");
        const value = event.target.value
          .replace(/_/g, "")
          .replace(/\//g, "")
          .replace(/\D/g, "");
        let formattedValue = "__/__/____".split("");

        for (
          let i = 0, j = 0;
          i < value.length && j < formattedValue.length;
          i++, j++
        ) {
          if (j === 2 || j === 5) {
            j++;
          }
          formattedValue[j] = value[i];
        }

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
        console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
      });
    }
  });
});
