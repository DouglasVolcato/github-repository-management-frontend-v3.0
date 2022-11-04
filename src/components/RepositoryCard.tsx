import { Note } from "../protocols/note";
import { Button } from "./Button";

interface Props {
  id: string;
  name: string;
  html_url: string;
  addNoteFunction: (noteBody: Note) => void;
  index: number;
}

export function RepositoryCard({
  id,
  name,
  html_url,
  addNoteFunction,
  index,
}: Props) {
  const divStyles = {
    backgroundColor: "#8bdd08",
    width: "250px",
    margin: " 10px",
    padding: "5px",
    border: "solid 5px blue",
  };
  const pStyles = {
    backgroundColor: "#8bdd08",
    margin: "5px",
    fontSize: "18px",
    textAlign: "center" as "center",
    fontWeight: "bold",
  };
  const buttonsDivStyles = {
    backgroundColor: "#8bdd08",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap" as "wrap",
  };

  return (
    <div style={divStyles} key={index}>
      <p style={pStyles}>ID: {id}</p>
      <p style={pStyles}>{name}</p>
      <div style={buttonsDivStyles}>
        <Button
          name={"Access"}
          onClickFunctions={[() => window.open(html_url)]}
          color={"darkblue"}
        />
        <Button
          name={"Add note"}
          onClickFunctions={[
            () =>
              addNoteFunction({
                name,
                link: html_url,
              }),
          ]}
        />
      </div>
    </div>
  );
}
