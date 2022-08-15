import { useNavigate } from "react-router-dom";

import Button from "../../components/button";
import { accountsSelectors } from "../../store/session";
import { useAppSelector } from "../../store/store";

const Balances = () => {
  const navigate = useNavigate();
  const accounts = useAppSelector(accountsSelectors.selectAll);

  return (
    <div className="balances">
      <h1 className="text-4xl mb-4">Account balances</h1>

      {accounts.map((account) => (
        <div className="flex justify-between w-56 mb-4" key={account.id}>
          <div>{account.name}</div>
          <div>${account.balance.toFixed(2)}</div>
        </div>
      ))}

      <div className="mb-4">
        <Button label="BACK" onClick={() => navigate("/menu")} />
        <Button label="EXIT" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default Balances;
