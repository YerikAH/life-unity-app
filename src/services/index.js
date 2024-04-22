import axios from "axios";
import { STORAGE_KEY_TOKEN } from "../constants";

export class Services {
  static instance;
  api;

  constructor() {
    this.api = axios.create({
      baseURL: "",
      timeout: 10000,
    });
    this.authGoogle = this.authGoogle.bind(this);
    this.Example = this.Example.bind(this);
  }

  getCommonHeaders() {
    const token = sessionStorage.getItem(STORAGE_KEY_TOKEN);
    return token ? { "x-access-token": token } : {};
  }

  static getInstance() {
    if (!Services.instance) {
      Services.instance = new Services();
    }
    return Services.instance;
  }

  async authGoogle(body) {
    try {
      const response = await this.api({
        method: "post",
        url: "/auth/google",
        data: body,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async Example() {
    try {
      const response = await this.api({
        url: "/me/links",
        headers: this.getCommonHeaders(),
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
