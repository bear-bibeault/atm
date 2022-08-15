import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import KeypadButton from "../../components/keypad-button";

import { selectSession, accountsSelectors, deposit } from "../../store/session";
import { useAppDispatch, useAppSelector } from "../../store/store";

const toDollars = (value: number) =>
  `${Math.trunc(value / 100)}.${value % 100 < 10 ? "0" : ""}${value % 100}`;

export const Deposit = () => {
  const { accountID } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nonce = useAppSelector(selectSession).nonce!;
  const account = useAppSelector(accountsSelectors.selectAll)?.find((account) => account.id === +accountID!)!;

  const [amount, setAmount] = useState(0);

  const onDone = useCallback(async () => {
    try {
      await dispatch(
        deposit({
          nonce,
          accountID: account.id,
          amount,
        })
      );
      navigate("/menu");
    } catch (e: any) {
      navigate("/error");
    }    
  }, [account.id, amount, dispatch, navigate, nonce]);

  const onKeypad = useCallback(
    (value: string) => 
      setAmount(amount * 10 + +value),
    [amount]
  )

  const onBackspace = useCallback(
    () => 
      setAmount(Math.trunc(amount / 10)),
    [amount]
  )

  return (
    <div className="deposit flex w-full justify-around">
      <div className="w-1/2">
        <p className="mb-8">
          Enter your deposit amount, then feed your checks or bills into the feeder below. Click the done
          button when finished. Your deposits must be verified by the bank prior to appearing in your
          balances. Please allow 3 to 5 days for processing.
        </p>

        <div className="text-4xl mb-8">${toDollars(amount)}</div>

        <div className="mb-8">
          <Button label="DONE" onClick={onDone} />
        </div>
      </div>

      <div className="">
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

        <div className="mb-4">
          <Button label="EXIT" onClick={()=> navigate("/")} />
        </div>
      </div>
    </div>
  );
};

