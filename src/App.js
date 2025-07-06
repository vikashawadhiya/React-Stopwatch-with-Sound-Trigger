import React, { useState, useEffect, useRef } from "react";
import "./App.css"
function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(10); // default to 10 seconds
  const intervalRef = useRef(null);
  const beep = useRef(null);

  // Start Stopwatch
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop Stopwatch
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset Stopwatch
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setIsRunning(false);
  };

  // Trigger sound on reaching target time
  useEffect(() => {
    if (seconds === Number(targetTime)) {
      if (beep.current) {
        beep.current.play().catch((err) => console.log("Audio error:", err));
      } else {
        console.log("⏰ Time reached!");
      }
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [seconds, targetTime]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <h1>⏰ React Stopwatch</h1>
      <h2>{seconds} seconds</h2>

      <div style={styles.buttonGroup}>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        <label>Target Time (seconds): </label>
        <input
          type="number"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          style={{ width: "60px" }}
        />
      </div>

      {/* Audio element */}
      <audio ref={beep} src="/beep.mp3" preload="auto" />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "sans-serif",
  },
  buttonGroup: {
    margin: "20px",
  },
};

export default App;
