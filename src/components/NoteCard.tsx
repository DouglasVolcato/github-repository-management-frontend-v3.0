import { Note } from "../protocols/note";
import { Button } from "./Button";

interface Props {
  noteBody: Note;
}

export function NoteCard({ noteBody }: Props) {
  const divStyles = {
    border: "solid 5px blue",
    padding: "5px",
    margin: "5px",
    textAlign: "center" as "center",
    color: "#d8d6d6",
    fontWeight: "bold",
    backgroundColor: "#686868",
  };
  const pStyles = {
    margin: "5px",
    backgroundColor: "#686868",
  };
  const cardDivStyles = {
    backgroundColor: "#686868",
  };

  return (
    <div className="NoteCard" style={divStyles}>
      <p style={pStyles}>Name: {noteBody.name}</p>
      <p style={pStyles}>Priority: {noteBody.priority}</p>
      <p style={pStyles}>Deadline: {noteBody.deadline}</p>
      <p style={pStyles}>Note: {noteBody.note}</p>

      <div style={cardDivStyles}>
        <Button
          name={"Access"}
          onClickFunctions={[() => window.open(noteBody.link)]}
        />
        <Button
          name={"Delete"}
          onClickFunctions={[() => alert("Test_Delete")]}
        />
        <Button name={"Edit"} onClickFunctions={[() => alert("Test_edit")]} />
      </div>
    </div>
  );
}
