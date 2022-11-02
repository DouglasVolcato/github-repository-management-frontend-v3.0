import { Form } from "../components/Form";
import { useState } from "react";
import { CardBody } from "../components/CardBody";
import { PageTitle } from "../components/PageTitle";
import { RepositoryCard } from "../components/RepositoryCard";
import { useClient } from "../hooks/useClient";
import { Repository } from "../protocols/repository";

export function Repositories() {
  const { addRepositories, getRepositories } = useClient();
  const [searchParams, setSearchParams] = useState({
    Username: "",
    Repository: "",
  });

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {getRepositories().map((item: Repository) => {
          if (searchParams.Repository !== "") {
            if (
              item.id.toString().includes(searchParams.Repository) ||
              item.name.includes(searchParams.Repository)
            ) {
              return (
                <RepositoryCard
                  id={item.id}
                  name={item.name}
                  html_url={item.html_url}
                  addNoteFunction={() => alert("teste!!!")}
                />
              );
            }
          } else {
            return (
              <RepositoryCard
                id={item.id}
                name={item.name}
                html_url={item.html_url}
                addNoteFunction={() => alert("teste!!!")}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
