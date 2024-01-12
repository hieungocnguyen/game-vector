import "./app.css";
import Lixi from "./components/Lixi";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { toPng } from "html-to-image";

export function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  if (step === 1) {
    setTimeout(() => {
      setStep(2);
    }, 4000);
  }

  if (step === 2) {
    setTimeout(() => setStep(3), 1000);
  }

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="container">
      <div
        class={`flip-box ${step === 3 ? "appear" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <div class={`flip-box-inner ${isOpen ? "openCard" : ""}`} ref={ref}>
          <div class="flip-box-front">
            <h2>Tap to open</h2>
          </div>
          <div class="flip-box-back">
            <h2>quotes random</h2>
          </div>
        </div>
        {isOpen && (
          <div className="button-download" onClick={onButtonClick}>
            DownLoad
          </div>
        )}
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
