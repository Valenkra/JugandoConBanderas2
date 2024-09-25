import { useEffect, useState } from "react";

export default function Timer({ onTimeUp, onTimeRemaining }) {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    setSeconds(15); // Reiniciar el temporizador
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        onTimeRemaining(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p>Quedan {seconds}s</p>
  );
};
