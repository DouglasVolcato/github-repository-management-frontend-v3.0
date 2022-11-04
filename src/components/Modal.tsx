import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Modal({ children }: Props) {
  const divStyles = {
    position: "fixed" as "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.836)",
    fontSize: "1.8vw",
    overflowY: "scroll" as "scroll",
    padding: "0px 0px 50px 0px",
  };

  const modalStyles = {
    width: "max-content",
    margin: "auto",
    border: "solid 2px black",
    padding: "10px",
    backgroundColor: "rgb(216, 214, 106)",
    boxShadow: "1px 1px 1px 1px rgb(71, 71, 71)",
  };

  return (
    <div style={divStyles}>
      <div style={modalStyles}>{children}</div>
    </div>
  );
}
