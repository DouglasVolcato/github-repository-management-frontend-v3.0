import styled from "styled-components";

interface Props {
  name: string;
}

export function PageTitle({ name }: Props) {
  const StyledTitle = styled.h1`
    color: #d4f806;
    width: 100%;
    text-align: center;
    padding: 30px 10px 10px 10px;
  `;

  return <StyledTitle>{name}</StyledTitle>;
}
