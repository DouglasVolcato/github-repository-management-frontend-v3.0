import { useEffect } from "react";
import { CardBody } from "../components/CardBody";
import { NoteCard } from "../components/NoteCard";
import { PageTitle } from "../components/PageTitle";
import { useClient } from "../hooks/useClient";

export function Notes() {
  const { getNotes, addAllNotes } = useClient();

  useEffect(() => {
    addAllNotes();
  }, []);

  return (
    <div>
      <CardBody>
        <PageTitle name={"Notes"} />
        {getNotes().map((note, key) => (
          <NoteCard noteBody={note} key={key} />
        ))}
      </CardBody>
    </div>
  );
}
