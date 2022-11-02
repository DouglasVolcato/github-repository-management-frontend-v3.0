import { useState } from "react";

interface Props {
  name: string;
  onClickFunctions: (() => void)[];
}

export function Button({ name, onClickFunctions }: Props) {
  const [hover, setHover] = useState(false);

  const buttonStyles = {
    fontSize: "15px",
    margin: "5px",
    padding: "0.25em 1em",
    border: "2px solid #0edfdf",
    borderRadius: "3px",
    color: hover ? "black" : "white",
    fontWeight: "bold",
    backgroundColor: hover ? "#d4eb0a" : "#04810f",
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
