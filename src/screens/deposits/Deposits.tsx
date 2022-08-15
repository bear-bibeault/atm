import React from "react";
import { useNavigate } from "react-router-dom";
import { accountsSelectors } from "../../store/session";
import { useAppSelector } from "../../store/store";

export const Deposits = () => {
  const navigate = useNavigate();

  const accounts = useAppSelector(accountsSelectors.selectAll);

  return (
    <div className="deposits">
      <p className="mb-4">Information here about deposits and such.</p>

      <h1 className="text-4xl mb-4">Please select an account for your deposit</h1>

      <div className="flex justify-around">
        {accounts.map((account) => (
          <div key={account.id}>
            <button
              type="button"
              className="border-solid border-2 ml-2 mr-2 pt-2 pb-2 pl-4 pr-4 rounded-lg ml-2 mr-2"
              onClick={() => navigate(`/deposit/${account.id}`)}
            >
              <div>{account.name}</div>
              <div className="font-extralight">${account.balance.toFixed(2)}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
