import { useClient } from "../hooks/useClient";
import { Note } from "../protocols/note";
import { Button } from "./Button";

interface Props {
  noteBody: Note;
}

export function NoteCard({ noteBody }: Props) {
  const { deleteNote } = useClient();

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
    fontSize: "15px",
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
          onClickFunctions={[() => deleteNote(noteBody.name)]}
        />
        <Button name={"Edit"} onClickFunctions={[() => alert("Test_edit")]} />
      </div>
    </div>
  );
}
