import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sessionSlice } from "../../store/session";
import { useAppDispatch } from "../../store/store";

//import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSimulateCardInserted = useCallback(
    () => {
      const FAKE_CARD_ID = process.env.REACT_APP_FAKE_CARD_ID;
      navigate(`/pin/${FAKE_CARD_ID}`)
    },
    [navigate]
  )

  useEffect(() => {
    dispatch(sessionSlice.actions.clearSession)
  },[dispatch])

  return (
    <div className="landing">
      <h1 className="text-5xl font-bold mb-4">Welcome to Bear's Bank</h1>

      <h2 className="text-2xl font-semibold mb-4">Your den for savings!</h2>

      <div>Please insert card to begin</div>

      <button type="button" onClick={onSimulateCardInserted}>
        Simulate insert card
      </button>
    </div>
  );
};

export default Landing;
