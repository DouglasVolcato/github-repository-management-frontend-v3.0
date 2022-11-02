import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";

export function Header() {
  const navigate = useNavigate();

  const StyledHeader = styled.header`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    background-color: blue;
  `;

  return (
    <StyledHeader className="Header">
      <Button name="Login" onClickFunctions={[() => navigate("/")]} />
      <Button
        name="Register"
        onClickFunctions={[() => navigate("/register")]}
      />
      <Button name="Notes" onClickFunctions={[() => navigate("/notes")]} />
      <Button
        name="Repositories"
        onClickFunctions={[() => navigate("/repositories")]}
      />
    </StyledHeader>
  );
}
