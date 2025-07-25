import { useState, useEffect, useRef } from "react";

export default function useChrono(isRunning, onTimeout, duration = 60) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (elapsed >= duration && isRunning) {
      onTimeout && onTimeout();
    }
  }, [elapsed, isRunning, onTimeout, duration]);

  const reset = () => setElapsed(0);

  return { elapsed, reset };
}