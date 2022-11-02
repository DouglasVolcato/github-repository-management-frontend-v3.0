import { createContext, ReactNode, useState } from "react";
import { Repository } from "../protocols/repository";
import { Api } from "../utils/api";

interface ContextProps {
  addRepositories: (userName: string) => void;
  getRepositories: () => Repository[];
}

const defaultValue = {
  addRepositories: (userName: string) => {},
  getRepositories: () => [],
};

export const ClientContext = createContext<ContextProps>(defaultValue);

interface Props {
  children: ReactNode;
}

interface State {
  repositories: Repository[];
}

export function ClientProvider({ children }: Props) {
  const [client, setClient] = useState<State>({
    repositories: [],
  });

  async function addRepositories(userName: string) {
    const foundRepositories = await Api.getGithubRepositories(userName);
    setClient({ ...client, repositories: foundRepositories });
  }

  function getRepositories() {
    return client.repositories;
  }

  return (
    <ClientContext.Provider value={{ addRepositories, getRepositories }}>
      {children}
    </ClientContext.Provider>
  );
}
