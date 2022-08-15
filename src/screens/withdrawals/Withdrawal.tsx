import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/button";
import { accountsSelectors, selectSession, withdraw } from "../../store/session";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const Withdrawal = () => {
  const { accountID } = useParams();
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [overdraft, setOverdraft] = useState(false);
  const [overLimit, setOverLimit] = useState(false);

  const nonce = useAppSelector(selectSession).nonce!;
  const account = useAppSelector(accountsSelectors.selectAll)?.find((account) => account.id === +accountID!)!;

  const onAmount = useCallback(
    async (amount: number) => {
      setOverdraft(false);
      setOverLimit(false);
      if (account?.balance - amount < 0) {
        setOverdraft(true);
        return;
      }
      if (account.daily + amount > account.limit) {
        setOverLimit(true);
        return;
      }
      try {      
        await dispatch(
          withdraw({
            nonce,
            accountID: account.id,
            amount,
          })
        );
        navigate("/menu");
      } catch (e: any) {
        navigate("/error");
      }
    },
    [account, dispatch, navigate, nonce]
  )

  return (
    <div className="withdrawal">
      <h1 className="text-2xl mb-4">Withdrawal from {account.name}</h1>

      <p className="mb-4">Select an amount</p>

      <div className="mb-8">
        <Button label="$20" onClick={() => onAmount(20)} />

        <Button label="$40" onClick={() => onAmount(40)} />
        <Button label="$60" onClick={() => onAmount(60)} />
        <Button label="$80" onClick={() => onAmount(80)} />
        <Button label="$1000" onClick={() => onAmount(100)} />
      </div>

      <div className="mb-8">
        <Button label="BACK" onClick={()=> navigate(-1)} />
        <Button label="EXIT" onClick={() => navigate("/")} />
      </div>

      {overdraft && <div className="">Overdraft warning</div>}
      {overLimit && <div className="">Over limit warning</div>}
    </div>
  );
};
