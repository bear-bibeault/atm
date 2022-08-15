import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  useEffect(
    () => {
      setTimeout(
        () => navigate('/'),
        10000
      )
    },
    [navigate]
  )

  return (
    <div className="error">
      <p className="text-4xl">
        An error has occurred. Please try again later.
      </p>
    </div>
  );
}

export default Error;
