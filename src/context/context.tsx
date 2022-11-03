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
  deleteNote: (noteName: string) => void;
  editNote: (noteName: string | undefined, noteBody: Note | any) => void;
}

const defaultValue = {
  addRepositories: (userName: string) => {},
  getRepositories: () => [],
  addNote: (noteBody: Note) => {},
  getNotes: () => [],
  addAllNotes: () => {},
  deleteNote: (noteName: string) => {},
  editNote: (noteName: string | undefined, noteBody: Note | any) => {},
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
    offlineChecker();
    const foundRepositories = await Api.getGithubRepositories(userName);

    setClient({ ...client, repositories: foundRepositories });
  }

  function getRepositories() {
    offlineChecker();
    return client.repositories;
  }

  async function addNote(noteBody: Note) {
    offlineChecker();
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
    offlineChecker();
    const response = await Api.getAllNotes();
    setClient({ ...client, notes: response });
  }

  function getNotes() {
    offlineChecker();
    return sortFunction(client.notes);
  }

  async function deleteNote(noteName: string) {
    offlineChecker();
    const updatedNoteList = client.notes.filter(
      (note) => note.name !== noteName
    );
    setClient({ ...client, notes: updatedNoteList });
    await Api.deleteNote(noteName);
    setTimeout(async () => {
      const updatedNotes = await Api.getAllNotes();
      setClient({ ...client, notes: updatedNotes });
    }, 5000);
  }

  async function editNote(
    noteName: string | undefined,
    noteBody: Note | undefined
  ) {
    offlineChecker();
    const updatedNoteList = client.notes.map((note) => {
      if (note.name === noteName) {
        return Object.assign(note, noteBody);
      } else {
        return note;
      }
    });
    setClient({ ...client, notes: updatedNoteList });
    const response = await Api.editNote(noteName, noteBody);
    setTimeout(async () => {
      const updatedNotes = await Api.getAllNotes();
      setClient({ ...client, notes: updatedNotes });
    }, 5000);
    return response;
  }

  function sortFunction(arr: any) {
    const priorityHigh = arr
      .filter((i: any) => i.priority === "High")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });
    const priorityMedium = arr
      .filter((i: any) => i.priority === "Medium")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });
    const priorityLow = arr
      .filter((i: any) => i.priority === "Low")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });

    return priorityHigh.concat(priorityMedium).concat(priorityLow);
  }

  function offlineChecker() {
    if (!window.navigator.onLine) {
      alert("You are offline.");
      return false;
    }
    return true;
  }

  return (
    <ClientContext.Provider
      value={{
        addRepositories,
        getRepositories,
        addNote,
        getNotes,
        addAllNotes,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
