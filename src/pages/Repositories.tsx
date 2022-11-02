import { Form } from "../components/Form";
import { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { RepositoryCard } from "../components/RepositoryCard";
import { useClient } from "../hooks/useClient";
import { Repository } from "../protocols/repository";
import { Note } from "../protocols/note";
import { CardBody } from "../components/CardBody";

export function Repositories() {
  const { addNote } = useClient();
  const { addRepositories, getRepositories } = useClient();
  const [searchParams, setSearchParams] = useState({
    Username: "",
    Repository: "",
  });

  async function createNote(noteBody: Note) {
    addNote({
      name: noteBody.name,
      link: noteBody.link,
      priority: "Low",
      deadline: new Date().toISOString().slice(0, 10),
      note: "Empty",
    });
  }

  return (
    <div className="Repositories">
      <PageTitle name={"Repositories"} />
      <Form
        state={searchParams}
        setStateFunction={() => setSearchParams}
        buttonName={"Search"}
        buttonFunction={() => {
          if (searchParams.Username !== "") {
            addRepositories(searchParams.Username);
          }
        }}
      />
      <CardBody>
        {getRepositories().map((item: Repository, index: number) => {
          if (searchParams.Repository !== "") {
            if (
              item.id.toString().includes(searchParams.Repository) ||
              item.name.includes(searchParams.Repository)
            ) {
              return (
                <RepositoryCard
                  index={index}
                  id={item.id}
                  name={item.name}
                  html_url={item.html_url}
                  addNoteFunction={createNote}
                />
              );
            }
          } else {
            return (
              <RepositoryCard
                index={index}
                id={item.id}
                name={item.name}
                html_url={item.html_url}
                addNoteFunction={createNote}
              />
            );
          }
        })}
      </CardBody>
    </div>
  );
}
