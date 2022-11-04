import { useState } from "react";

interface Props {
  name: string;
  onClickFunctions: (() => void)[];
  color?: string;
  borderColor?: string;
}

export function Button({ name, onClickFunctions, color, borderColor }: Props) {
  const [hover, setHover] = useState(false);

  function setButtonColor() {
    return hover ? "#d4eb0a" : color && color !== "" ? color : "#04810f";
  }

  function setBorderColor() {
    return borderColor ? "2px solid " + borderColor : "2px solid #0edfdf";
  }

  const buttonStyles = {
    fontSize: "15px",
    margin: "5px",
    padding: "0.25em 1em",
    border: setBorderColor(),
    borderRadius: "3px",
    color: hover ? "black" : "white",
    fontWeight: "bold",
    backgroundColor: setButtonColor(),
    width: "fit-content",
    cursor: "pointer",
    boxShadow: "1px 2px 2px 1px #353535",
  };

  return (
    <button
      style={buttonStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(event) => {
        event.preventDefault();
        onClickFunctions.map((item) => {
          item();
        });
      }}
    >
      {name}
    </button>
  );
}
