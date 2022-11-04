import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Header() {
  const navigate = useNavigate();

  const headerStyles = {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "blue",
  };

  return (
    <header style={headerStyles} className="Header">
      <Button
        name="Login"
        onClickFunctions={[() => navigate("/")]}
        color={"blue"}
        borderColor={"gray"}
      />
      <Button
        name="Register"
        onClickFunctions={[() => navigate("/register")]}
        color={"blue"}
        borderColor={"gray"}
      />
      <Button
        name="Notes"
        onClickFunctions={[() => navigate("/notes")]}
        color={"blue"}
        borderColor={"gray"}
      />
      <Button
        name="Repositories"
        onClickFunctions={[() => navigate("/repositories")]}
        color={"blue"}
        borderColor={"gray"}
      />
    </header>
  );
}
