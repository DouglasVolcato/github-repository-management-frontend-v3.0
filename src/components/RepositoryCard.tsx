import styled from "styled-components";
import { Button } from "./Button";

interface Props {
  id: string;
  name: string;
  html_url: string;
  addNoteFunction: (param: any) => void;
}

export function RepositoryCard({ id, name, html_url, addNoteFunction }: Props) {
  const StyledDiv = styled.div`
    background-color: #8bdd08;
    width: 250px;
    margin: 10px;
    padding: 5px;
    border: solid 5px blue;
  `;
  const StyledP = styled.p`
    background-color: #8bdd08;
    margin: 5px;
    font-size: 18px;
    font-weight: ${(props: any) => (props.id ? "normal" : "bold")};
    text-align: center;
  `;
  const StyledButtonsDiv = styled.div`
    background-color: #8bdd08;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  `;

  return (
    <StyledDiv>
      <StyledP>ID: {id}</StyledP>
      <StyledP>{name}</StyledP>
      <StyledButtonsDiv>
        <Button
          name={"Access"}
          onClickFunctions={[() => window.open(html_url)]}
        />
        <Button
          name={"Add note"}
          onClickFunctions={[
            () =>
              addNoteFunction({
                id,
                name,
                html_url,
              }),
          ]}
        />
      </StyledButtonsDiv>
    </StyledDiv>
  );
}
