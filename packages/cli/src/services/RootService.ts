import axios from "axios";
import ApiService from "./ApiService";

export default class RootService extends ApiService {
  getVersion: () => Promise<string> = async () => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/version`,
      // headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data as string;
      })
      .catch((error) => {
        throw error;
      });
  };
}
