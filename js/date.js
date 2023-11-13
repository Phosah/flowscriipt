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

          if (event.key === "Backspace") {
            if (pos !== 0 && input.value[pos - 1] !== "/") {
              newValue[pos - 1] = "_";
              pos--;
            }
          } else if (event.key === "Delete") {
            if (pos < input.value.length - 1 && input.value[pos] !== "/") {
              newValue[pos] = "_";
            }
          }

          input.value = newValue.join("");
          input.setSelectionRange(pos, pos);
        }
      });

      input.addEventListener("input", function (event) {
        const value = event.target.value.replace(/_/g, "").replace(/\//g, "");
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

        event.target.value = formattedValue.join("");
      });
    }
  });
});
