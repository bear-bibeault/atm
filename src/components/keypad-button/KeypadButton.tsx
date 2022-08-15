import React from "react";
import Button from "../button";

interface Props {
  label: string;
  onClick: (value: string) => void;
}

const KeypadButton = ({ label, onClick }: Props) => {
  return <Button label={label} onClick={() => onClick(label)} />;
};

export default KeypadButton;
