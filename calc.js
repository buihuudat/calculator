// /*
//  * Implement all your JavaScript in this file!
//  */

$(document).ready(function () {
  const display = $("#display");
  const buttons = $("button");

  const clearBtn = $("#clearButton");
  const equaBtn = $("#equalsButton");

  const addBtn = $("#addButton");
  const subBtn = $("#subtractButton");
  const mulBtn = $("#multiplyButton");
  const divBtn = $("#divideButton");

  const math = ["+", "*", "/", "-"];

  let cal = [];
  let currentOperation = "";
  let currentState = "default";

  buttons.on("click", function () {
    if (currentState === "reset") {
      cal = [];
      currentOperation = "";
      $(display).val("");
    }

    if ($(this).val()) {
      currentState = "default";
      cal.push($(this).val());
    }

    $(this).css("background-color", "#999");
    buttons.not(this).css("background-color", "");

    const valueJoined = cal.join("");
    if (currentOperation && cal[cal.length - 1] !== currentOperation) {
      return $(display).val(eval(valueJoined.split(currentOperation)[1]));
    }
    if (currentOperation) {
      return $(display).val(eval(valueJoined.split(currentOperation)[0]));
    }

    $(display).val(valueJoined);
  });

  addBtn.on("click", function () {
    if (
      currentOperation &&
      currentOperation !== "+" &&
      math.includes(cal[cal.length - 1])
    ) {
      currentOperation = "+";
      return (cal[cal.length - 1] = currentOperation);
    }

    if (math.includes(currentOperation)) {
      const rs = eval(cal.join(""));
      $(display).val(rs);
      cal = [];
      cal.push(rs);
    }

    currentOperation = "+";
    cal.push(currentOperation);
  });
  subBtn.on("click", function () {
    if (
      currentOperation &&
      currentOperation !== "-" &&
      math.includes(cal[cal.length - 1])
    ) {
      currentOperation = "-";
      return (cal[cal.length - 1] = currentOperation);
    }
    if (math.includes(currentOperation)) {
      const rs = eval(cal.join(""));
      $(display).val(rs);
      cal = [];
      cal.push(rs);
    }
    currentOperation = "-";
    cal.push(currentOperation);
  });
  mulBtn.on("click", function () {
    if (!cal.length) return;
    if (
      currentOperation &&
      currentOperation !== "*" &&
      math.includes(cal[cal.length - 1])
    ) {
      currentOperation = "*";
      return (cal[cal.length - 1] = currentOperation);
    }
    if (math.includes(currentOperation)) {
      const rs = eval(cal.join(""));
      $(display).val(rs);
      cal = [];
      cal.push(rs);
    }
    cal.push("*");
    currentOperation = "*";
  });
  divBtn.on("click", function () {
    if (!cal.length) return;
    if (
      currentOperation &&
      currentOperation !== "/" &&
      math.includes(cal[cal.length - 1])
    ) {
      currentOperation = "/";
      return (cal[cal.length - 1] = currentOperation);
    }

    if (math.includes(currentOperation)) {
      const rs = eval(cal.join(""));
      $(display).val(rs);
      cal = [];
      cal.push(rs);
    }
    cal.push("/");
    currentOperation = "/";
  });

  equaBtn.on("click", function () {
    if (!cal.length) return;

    const valueJoined = cal.join("");

    if (!isFinite(eval(valueJoined))) {
      currentState = "reset";
      return $(display).val(eval(valueJoined));
    }

    if (currentOperation === "") {
      return $(display).val(valueJoined);
    }
    if (cal[cal.length - 1] === currentOperation) {
      cal.pop();
      const rs = $(display).val(eval(cal.join("")));
      cal.push(currentOperation);
      return rs;
    }

    if (currentState === "equa") {
      cal.push(currentOperation, valueJoined.split(currentOperation)[1]);
      return $(display).val(eval(cal.join("")));
    }
    $(display).val(eval(valueJoined));
    currentState = "equa";
  });

  clearBtn.on("click", function () {
    reset();
  });

  function reset() {
    cal = [];
    currentOperation = "";
    currentState = "default";
    $(display).val("");
    count = 0;
  }
});
