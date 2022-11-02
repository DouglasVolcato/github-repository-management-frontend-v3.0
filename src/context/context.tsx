import { createContext, ReactNode, useState } from "react";
import { Note } from "../protocols/note";
import { Repository } from "../protocols/repository";
import { Api } from "../utils/api";

interface ContextProps {
  addRepositories: (userName: string) => void;
  getRepositories: () => Repository[];
  addNote: (noteBody: Note) => void;
  getNotes: () => Note[];
  addAllNotes: () => void;
}

const defaultValue = {
  addRepositories: (userName: string) => {},
  getRepositories: () => [],
  addNote: (noteBody: Note) => {},
  getNotes: () => [],
  addAllNotes: () => {},
};

export const ClientContext = createContext<ContextProps>(defaultValue);

interface Props {
  children: ReactNode;
}

interface State {
  repositories: Repository[];
  notes: Note[];
}

export function ClientProvider({ children }: Props) {
  const [client, setClient] = useState<State>({
    repositories: [],
    notes: [],
  });

  async function addRepositories(userName: string) {
    const foundRepositories = await Api.getGithubRepositories(userName);

    setClient({ ...client, repositories: foundRepositories });
  }

  function getRepositories() {
    return client.repositories;
  }

  async function addNote(noteBody: Note) {
    setClient({
      ...client,
      notes: [...client.notes, noteBody],
    });
    await Api.createNote(noteBody);
    setTimeout(async () => {
      const updatedNotes = await Api.getAllNotes();
      setClient({ ...client, notes: updatedNotes });
    }, 3000);
  }

  async function addAllNotes() {
    const response = await Api.getAllNotes();
    setClient({ ...client, notes: response });
  }

  function getNotes() {
    return client.notes;
  }

  return (
    <ClientContext.Provider
      value={{
        addRepositories,
        getRepositories,
        addNote,
        getNotes,
        addAllNotes,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
