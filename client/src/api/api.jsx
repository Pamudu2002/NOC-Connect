import axios from "axios";

export const api = axios.create({

  //baseURL: 'http://192.168.30.154:5000/api',

  // baseURL: 'http://192.168.1.4:5000/api',

  baseURL: 'http://localhost:5000/api',
})