import { useNavigate } from "react-router-dom";

import Button from "../../components/button";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="Menu">
      <h1 className="text-4xl mb-4">Please select from the following</h1>

      <div className="mb-4">
        <Button label="BALANCES" onClick={() => navigate("/balances")} />
      </div>

      <div className="mb-4">
        <Button label="WITHDRAWAL" onClick={() => navigate("/withdrawals")} />
      </div>

      <div className="mb-4">
        <Button label="DEPOSIT" onClick={() => navigate("/deposits")} />
      </div>

      <div className="mb-4">
        <Button label="EXIT" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default Menu;
