import axios from 'axios';

axios.defaults.withCredentials = true;

class API {
  static BASE_URL = process.env.REACT_APP_API_URL;

  static async login(reqBody) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, reqBody);
    return response;
  }

  static async getAll(endpoint, params) {
    const response = await axios.get(`${this.BASE_URL}/admin/${endpoint}`, {
      params,
    });
    return response;
  }

  static async getOne(endpoint, param, reqbody = {}) {
    const response = await axios.get(
      `${this.BASE_URL}/admin/${endpoint}/${param}`,
      reqbody
    );
    return response;
  }

  static async create(endpoint, reqBody) {
    const response = await axios.post(
      `${this.BASE_URL}/admin/${endpoint}`,
      reqBody
    );
    return response;
  }

  static async update(endpoint, reqBody) {
    const response = await axios.patch(
      `${this.BASE_URL}/admin/${endpoint}/`,
      reqBody
    );
    return response;
  }
  static async delete(endpoint, param = '', data = {}) {
    const response = await axios.delete(
      `${this.BASE_URL}admin/${endpoint}/${param}`,
      { data }
    );
    return response;
  }
}

export { API };
