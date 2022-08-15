import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/button";
import KeypadButton from "../../components/keypad-button";
import { establishSession } from "../../store/session";
import { useAppDispatch } from "../../store/store";

const Pin = () => {
  const { cardID } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!cardID) navigate("/");
  }, [cardID, navigate]);

  const onKeypad = useCallback(async (value: string) => setPin(`${pin}${value.charAt(0)}`), [pin]);

  useEffect(() => {
    if (pin.length === 4 && cardID) {
      (async () => {
        try {
          await dispatch(establishSession({ cardID, pin })).unwrap();
          navigate("/menu");
        } catch (e: any) {
          navigate("/error"); //TODO:
        }
      })();
    }
  }, [cardID, dispatch, navigate, pin]);

  const onBackspace = useCallback(() => setPin(pin.slice(0, -1)), [pin]);

  return cardID ? (
    <div className="pin flex w-full justify-around">
      <div>
        <p className="mb-8">Please enter your PIN</p>

        <div className="mb-8">
          <Button label="EXIT" onClick={() => navigate("/")} />
        </div>

        <div className="text-4xl">{pin.replaceAll(/./g, "*")}</div>
      </div>

      <div>
        <div className="mb-4">
          <KeypadButton label="1" onClick={onKeypad} />
          <KeypadButton label="2" onClick={onKeypad} />
          <KeypadButton label="3" onClick={onKeypad} />
        </div>
        <div className="mb-4">
          <KeypadButton label="4" onClick={onKeypad} />
          <KeypadButton label="5" onClick={onKeypad} />
          <KeypadButton label="6" onClick={onKeypad} />
        </div>
        <div className="mb-4">
          <KeypadButton label="7" onClick={onKeypad} />
          <KeypadButton label="8" onClick={onKeypad} />
          <KeypadButton label="9" onClick={onKeypad} />
        </div>
        <div className="mb-4">
          <KeypadButton label="0" onClick={onKeypad} />
        </div>

        <div className="mb-4">
          <Button label="DELETE" onClick={onBackspace} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Pin;
