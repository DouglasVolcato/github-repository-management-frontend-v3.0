import { useNavigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";
import { Note } from "../protocols/note";
import { Button } from "./Button";

interface Props {
  noteBody: Note;
}

export function NoteCard({ noteBody }: Props) {
  const { deleteNote } = useClient();
  const navigate = useNavigate();

  function setColor() {
    if (noteBody.priority === "Low") {
      return "#505050";
    } else if (noteBody.priority === "Medium") {
      return "#799904";
    } else if (noteBody.priority === "High") {
      return "#960000";
    }
  }

  const divStyles = {
    border: "solid 5px blue",
    padding: "5px",
    margin: "5px",
    textAlign: "center" as "center",
    color: "#d8d6d6",
    fontWeight: "bold",
    backgroundColor: setColor(),
    width: "300px",
  };
  const pStyles = {
    margin: "5px",
    backgroundColor: setColor(),
    fontSize: "15px",
  };
  const cardDivStyles = {
    backgroundColor: setColor(),
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
          color={"red"}
        />
        <Button
          name={"Edit"}
          onClickFunctions={[() => navigate("/note-edition/" + noteBody.name)]}
          color={"gray"}
        />
      </div>
    </div>
  );
}
