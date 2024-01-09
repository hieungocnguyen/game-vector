import "./app.css";
import Lixi from "./components/Lixi";
import { useEffect, useState } from "preact/hooks";

export function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  if (step === 1) {
    setTimeout(() => {
      setStep(2);
    }, 4000);
  }

  if (step === 2) {
    setTimeout(() => setStep(3), 1000);
  }

  return (
    <div className="container">
      <div
        class={`flip-box ${step === 3 ? "appear" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <div class={`flip-box-inner ${isOpen ? "openCard" : ""}`}>
          <div class="flip-box-front">
            <h2>Tap to open</h2>
          </div>
          <div class="flip-box-back">
            <h2>...</h2>
          </div>
        </div>
      </div>
      <div
        className={`lixi ${step == 1 ? "shake" : ""} ${
          step == 2 ? "zoom" : ""
        } ${step == 3 ? "stand" : ""} `}
      >
        <Lixi />
      </div>
    </div>
  );
}
