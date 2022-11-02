import styled from "styled-components";
import { Button } from "./Button";

interface Props {
  state: any;
  setStateFunction: any;
  buttonName: string;
  buttonFunction: () => void;
}

export function Form({
  state,
  setStateFunction,
  buttonName,
  buttonFunction,
}: Props) {
  const fields = Object.keys(state);
  const modifiedState = state;

  const StyledForm = styled.form`
    margin: auto;
    padding: 10px;
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    max-width: 98%;
  `;
  const StyledInput = styled.input`
    width: 280px;
    background-color: #464646;
    color: white;
    max-width: 98%;
    margin: 5px;
    box-shadow: 1px 2px 2px 1px #353535;
  `;
  const StyledLabel = styled.label`
    color: white;
    font-weight: bold;
  `;

  return (
    <StyledForm>
      <>
        {fields.map((field) => (
          <>
            <StyledLabel>{field}</StyledLabel>
            <StyledInput
              onChange={async (event) => {
                modifiedState[field] = event.target.value;
                setStateFunction(modifiedState);
              }}
            />
          </>
        ))}
        <Button name={buttonName} onClickFunctions={[() => buttonFunction()]} />
      </>
    </StyledForm>
  );
}
