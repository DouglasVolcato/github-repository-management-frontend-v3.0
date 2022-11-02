import axios from "axios";
import { Repository } from "../protocols/repository";

const githubBaseUrl = "https://api.github.com/users/";

export class Api {
  static async getGithubRepositories(userName: string): Promise<Repository[]> {
    const response = await axios.get<Repository[]>(
      githubBaseUrl + userName + "/repos?per_page=10000"
    );
    return response.data;
  }
}
