import { Note } from "./note";
import { SecurityKey } from "./securityKeys";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  repositories: Note[];
  securityKeys: SecurityKey[];
}
