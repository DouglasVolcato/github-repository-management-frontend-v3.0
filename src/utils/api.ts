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
    return response.data;
  }

  static async makeRegistration(
    userBody: RegisterUserBody
  ): Promise<User | null> {
    try {
      const response = await axios.post<User>(
        baseUrl + "/user/create-user",
        userBody
      );
      if (response.status === 200) {
        alert("Successfully registered!");
      }
      return response.data;
    } catch (err) {
      if (userBody.password.length < 7) {
        alert("The password must have, at least, 6 characters.");
      } else {
        alert("Email already registered.");
      }
      return null;
    }
  }

  static async getAllNotes(): Promise<Note[]> {
    const response = await axios.get<Note[]>(
      baseUrl + "/repo/get-all-repository"
    );
    return response.data;
  }

  static async createNote(noteBody: Note): Promise<Note> {
    const response = await axios.post<Note>(
      baseUrl + "/repo/create-repository",
      noteBody
    );
    return response.data;
  }

  static async deleteNote(noteName: string): Promise<Note> {
    const response = await axios.delete<Note>(
      baseUrl + "/repo/delete-repository/" + noteName
    );
    return response.data;
  }

  static async editNote(
    noteName: string | undefined,
    noteBody: Note | undefined
  ): Promise<Note> {
    const response = await axios.put<Note>(
      baseUrl + "/repo/update-repository/" + noteName,
      noteBody
    );
    console.log(response);
    return response.data;
  }
}
