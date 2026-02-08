import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import "./Valentine.css";
import { NO_POPUPS } from "./val_popup_data.js";
import { YES_POPUP } from "./val_popup_data.js";
import Popup from "./components/Popup";

const JUMPS_PER_POPUP = 5;
const POPUP_DURATION_MS = 4000;
const YES_POPUP_DURATION_MS = 15000;

export default function Valentine() {
  const titleRef = useRef(null);
  const yesRef = useRef(null);
  const noRef = useRef(null);

  const [yesPos, setYesPos] = useState({});
  const [noPos, setNoPos] = useState({});
  const [ready, setReady] = useState(false);

  const [noJumpCount, setNoJumpCount] = useState(0);
  const lastNoMoveAt = useRef(0);

  const popupTimerRef = useRef(null);

  const [activePopup, setActivePopup] = useState(null);

  const placeButtonsUnderQuestion = () => {
    const titleEl = titleRef.current;
    const yesEl = yesRef.current;
    const noEl = noRef.current;

    if (!titleEl || !yesEl || !noEl) return;

    const titleRect = titleEl.getBoundingClientRect();
    const yesRect = yesEl.getBoundingClientRect();
    const noRect = noEl.getBoundingClientRect();

    const gap = 18;
    const totalWidth = yesRect.width + gap + noRect.width;

    const startLeft = titleRect.left + titleRect.width / 2 - totalWidth / 2;
    const top = titleRect.bottom + 18;

    setYesPos({ left: startLeft, top, opacity: 1 });
    setNoPos({ left: startLeft + yesRect.width + gap, top, opacity: 1 });

    requestAnimationFrame(() => setReady(true));
  };

  useLayoutEffect(() => {
    placeButtonsUnderQuestion();

    const onResize = () => placeButtonsUnderQuestion();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const moveNoButton = () => {
    if (!ready) return;

    const now = performance.now();
    if (now - lastNoMoveAt.current < 250) return;
    lastNoMoveAt.current = now;

    const padding = 120;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;

    setNoJumpCount((count) => count + 1);

    setNoPos((prev) => ({
      ...prev,
      left: Math.random() * maxX,
      top: Math.random() * maxY,
    }));
  };

  useEffect(() => {
    if (noJumpCount === 0) return;
    if (noJumpCount % JUMPS_PER_POPUP !== 0) return;

    const index = Math.floor(noJumpCount / JUMPS_PER_POPUP) - 1;
    const popup = NO_POPUPS[index % NO_POPUPS.length];

    setActivePopup(popup);

    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    popupTimerRef.current = setTimeout(() => {
      setActivePopup(null);
      popupTimerRef.current = null;
    }, POPUP_DURATION_MS);

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [noJumpCount]);

  return (
    <main className="valentine-page">
      <h1 ref={titleRef} className="title">
        Will you be my valentine?
      </h1>

      <button
        ref={yesRef}
        className={`btn btn-yes ${ready ? "ready" : ""}`}
        style={yesPos}
        type="button"
      >
        Yes
      </button>

      <button
        ref={noRef}
        className={`btn btn-no ${ready ? "ready" : ""}`}
        style={noPos}
        type="button"
        onMouseEnter={moveNoButton}
      >
        No
      </button>

      <Popup popup={activePopup} />
    </main>
  );
}
