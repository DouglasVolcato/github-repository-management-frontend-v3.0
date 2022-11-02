import styled from "styled-components";

interface Props {
  name: string;
  onClickFunctions: (() => void)[];
}

export function Button({ name, onClickFunctions }: Props) {
  const StyledButton = styled.button`
    font-size: 15px;
    margin: 5px;
    padding: 0.25em 1em;
    border: 2px solid #0edfdf;
    border-radius: 3px;
    color: white;
    font-weight: bold;
    background-color: #04810f;
    width: fit-content;
    cursor: pointer;
    box-shadow: 1px 2px 2px 1px #353535;
    &:hover {
      background-color: #dfca0e;
    }
  `;

  return (
    <StyledButton
      onClick={(event) => {
        event.preventDefault();
        onClickFunctions.map((item) => {
          item();
        });
      }}
    >
      {name}
    </StyledButton>
  );
}
