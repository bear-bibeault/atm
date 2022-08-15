import React from "react";

interface Props {
  label: string;
  onClick: VoidFunction;
}

const Button = ({ label, onClick }: Props) => {
  return (
    <button
      className="button border-solid border-2 ml-2 mr-2 pt-2 pb-2 pl-4 pr-4 rounded-lg"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
