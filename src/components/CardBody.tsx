import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function CardBody({ children }: Props) {
  const divStyles = {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap" as "wrap",
  };

  return <div style={divStyles}>{children}</div>;
}
