import React, { useState, useEffect } from "react";
import "./App.css";

const CountdownTimer = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime =
            prevTime.seconds === 0
              ? prevTime.minutes === 0
                ? { minutes: 0, seconds: 0 }
                : { minutes: prevTime.minutes - 1, seconds: 59 }
              : { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };

          if (newTime.minutes === 0 && newTime.seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handlePlay = () => {
    if (!isActive && (time.minutes > 0 || time.seconds > 0)) {
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime({ minutes: 0, seconds: 0 });
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleChange = (e) => {
    if (!isActive) {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 0) {
        setTime({ minutes: value, seconds: 0 });
      }
    }
  };

  return (
    <div className="box">
      <input
        className="time"
        type="text"
        placeholder="Enter minutes"
        value={time.minutes}
        onChange={handleChange}
        disabled={isActive}
      />
      <div className="box2">
        <button className="button" onClick={handlePlay} disabled={isActive}>
          Play
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
        <button className="button" onClick={handlePause} disabled={!isActive}>
          Pause
        </button>
      </div>
      <div className="timer">
        <p>
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
