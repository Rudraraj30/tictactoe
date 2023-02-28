import React, { useEffect } from "react";
import "./App.css";
import Box from "./box";
import Header from "./Header";
function App() {
  let n = 9;
  let box = [];
  for (let i = 0; i < n; i++) {
    box.push({ id: i, value: "" });
  }
  const [switcht, setSwitcht] = React.useState(true);
  const [move, setMove] = React.useState("X");
  const [boxes, setBoxes] = React.useState(box);
  const [winner, Setwinner] = React.useState("");
  const [count, setCount] = React.useState(9);
  function toggle(id, move) {
    if (boxes[id].value !== "" || winner !== "") return;
    setCount((count) => count - 1);
    setBoxes((box) => {
      let arr = [];
      for (let i = 0; i < box.length; i++) {
        if (i === id) {
          arr.push({ id: id, value: move });
        } else {
          arr.push(box[i]);
        }
      }
      return arr;
    });

    setMove((move) => {
      if (move === "X") {
        return "O";
      }
      if (move === "O") {
        return "X";
      }
    });
  }

  function isWon(boxes) {
    for (let i = 0; i < 3; i++) {
      if (
        boxes[i].value === boxes[i + 3].value &&
        boxes[i + 3].value === boxes[i + 6].value &&
        boxes[i + 6].value.length
      ) {
        return true;
      }
      if (
        boxes[i * 3].value === boxes[i * 3 + 1].value &&
        boxes[i * 3 + 1].value === boxes[i * 3 + 2].value &&
        boxes[i * 3 + 2].value.length
      ) {
        return true;
      }
    }
    if (
      boxes[0].value === boxes[4].value &&
      boxes[4].value === boxes[8].value &&
      boxes[8].value.length
    ) {
      return true;
    }
    if (
      boxes[2].value === boxes[4].value &&
      boxes[4].value === boxes[6].value &&
      boxes[4].value.length
    ) {
      return true;
    }

    return false;
  }
  const show = boxes.map((cur) => (
    <Box key={cur.id} current={cur} toggle={toggle} move={move} />
  ));
  React.useEffect(() => {
    if (isWon(boxes)) {
      Setwinner(move === "X" ? "O" : "X");
    }
  }, [boxes, move]);

  const message =
    winner === ""
      ? count === 0
        ? `MATCH DRAW`
        : `TURN OF ${move}`
      : `${winner} WON`;

  function refreshPage() {
    window.location.reload(false);
  }

  function Timer() {
    const [seconds, setSeconds] = React.useState(5);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
      if (seconds === 0) {
        refreshPage();
      }
    }, [seconds]);
    let s = seconds === 1 ? "" : "s";
    return (
      <div>
        Reloading in {seconds} second{s}
      </div>
    );
  }
  const reloadMassage = winner !== "" || count === 0 ? <Timer /> : "";
  const mainComponent = switcht ? (
    <div className="start" onClick={() => setSwitcht(!switcht)}>
      START
    </div>
  ) : (
    <div className="canvas">
      <div className="main">{show}</div>
      <div className="info">
        {message} <br></br>
        {reloadMassage}
      </div>
    </div>
  );
  console.log(mainComponent);
  return (
    <>
      <Header />
      {mainComponent}
    </>
  );
}

export default App;
