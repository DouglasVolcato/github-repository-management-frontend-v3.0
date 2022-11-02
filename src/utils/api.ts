import axios from "axios";
import { LoginUserBody } from "../protocols/loginUserBody";
import { Note } from "../protocols/note";
import { RegisterUserBody } from "../protocols/registerUserBody";
import { Repository } from "../protocols/repository";
import { User } from "../protocols/user";

const githubBaseUrl = "https://api.github.com/users/";
const baseUrl = "https://repository-management.herokuapp.com";

export class Api {
  static async getGithubRepositories(userName: string): Promise<Repository[]> {
    const response = await axios.get<Repository[]>(
      githubBaseUrl + userName + "/repos?per_page=10000",
      {
        transformRequest: (data: Repository[], headers: any) => {
          delete headers["Authorization"];
        },
      }
    );
    return response.data;
  }

  static async makeLogin(
    userBody: LoginUserBody
  ): Promise<{ token: string; userId: string }> {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    const response = await axios.post<{ token: string; userId: string }>(
      baseUrl + "/auth/login",
      userBody
    );
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    console.log(response.data);
    return response.data;
  }

  static async makeRegistration(userBody: RegisterUserBody): Promise<User> {
    const response = await axios.post<User>(
      baseUrl + "/user/create-user",
      userBody
    );
    console.log(response.data);
    return response.data;
  }

  static async getAllNotes(): Promise<Note[]> {
    const response = await axios.get<Note[]>(
      baseUrl + "/repo/get-all-repository"
    );
    console.log(response.data);
    return response.data;
  }

  static async createNote(noteBody: Note) {
    const response = await axios.post(
      baseUrl + "/repo/create-repository",
      noteBody
    );
    console.log(response);
  }
}
