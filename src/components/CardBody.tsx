import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

export function CardBody({ children }: Props) {
  const StyledDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  `;

  return <StyledDiv>{children}</StyledDiv>;
}
