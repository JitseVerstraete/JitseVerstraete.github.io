import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import "./Valentine.css";
import { NO_POPUPS, YES_POPUPS } from "./val_popup_data.js";
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

  // helper: shows a popup for a given duration, safely clearing any existing timer
  const showPopupFor = (popup, durationMs) => {
    setActivePopup(popup);

  placeButtonsUnderQuestion();

    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    popupTimerRef.current = setTimeout(() => {
      setActivePopup(null);
      popupTimerRef.current = null;
    }, durationMs);
  };

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

    showPopupFor(popup, POPUP_DURATION_MS);
  }, [noJumpCount]);

  const onYesClick = () => {
    if (!YES_POPUPS?.length) return;

    const randomIndex = Math.floor(Math.random() * YES_POPUPS.length);
    const popup = YES_POPUPS[randomIndex];

    showPopupFor(popup, YES_POPUP_DURATION_MS);
  };

  // cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

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
        onClick={onYesClick}
      >
        Yes
      </button>

      <button
        ref={noRef}
        className={`btn btn-no ${ready ? "ready" : ""}`}
        style={noPos}
        type="button"
        onMouseEnter={moveNoButton}
        onClick={moveNoButton}
      >
        No
      </button>

      <Popup popup={activePopup} />
    </main>
  );
}
