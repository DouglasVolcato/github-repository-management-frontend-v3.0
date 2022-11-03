import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";
import { useClient } from "../hooks/useClient";

export function NoteEdition() {
  const navigate = useNavigate();
  const { noteName } = useParams();
  const { editNote, getNotes } = useClient();
  const foundNote = getNotes().find((note) => note.name === noteName);
  delete foundNote?._id;
  const [updatedNote, setUpdatedNote] = useState({ ...foundNote });

  useEffect(() => {
    if (!foundNote || !noteName) {
      navigate("/notes");
    }
  }, []);

  return (
    <div>
      <PageTitle name={"Update"} />
      <Form
        state={updatedNote}
        setStateFunction={setUpdatedNote}
        buttonName={"Update"}
        buttonFunction={async () => {
          await editNote(noteName, updatedNote);
          navigate("/notes");
        }}
      />
    </div>
  );
}
