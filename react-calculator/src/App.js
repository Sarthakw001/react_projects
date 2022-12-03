import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import Buttonbox from "./components/Buttonbox";
import Button from "./components/Button";

const btnvalues = [
  ["C", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const App = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const number = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const decimal = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const sign = (event) => {
    setCalc({
      ...calc,
      sign: event.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equals = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const percent = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const reset = () => {
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: "",
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.sign ? calc.sign : calc.res} />
      <Buttonbox>
        {btnvalues.flat().map((btnvalue, index) => {
          return (
            <Button
              key={index}
              className={
                btnvalue === "=" ? "equals " : btnvalue === "C" ? "C" : ""
              }
              value={btnvalue}
              onClick={
                btnvalue === "C"
                  ? reset
                  : btnvalue === "%"
                  ? percent
                  : btnvalue === "="
                  ? equals
                  : btnvalue === "/" ||
                    btnvalue === "X" ||
                    btnvalue === "-" ||
                    btnvalue === "+"
                  ? sign
                  : btnvalue === "."
                  ? decimal
                  : number
              }
            />
          );
        })}
      </Buttonbox>
    </Wrapper>
  );
};

export default App;
