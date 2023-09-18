import React, { useState } from "react";

export default function Timer() {
  const [timer, setTimer] = useState(10);
  function TimerCall() {
    setTimer((e) => e + 1);
    clearInterval(TimerCall);
  }

  setInterval(TimerCall(), 1000);
  return (
    <div>
      <h1>{timer}</h1>
    </div>
  );
}
