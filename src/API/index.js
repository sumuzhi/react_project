import axios from './myAxios'
import {BASE_URL} from "../config/config";

export const LoginSend = values => axios.post(`${BASE_URL}/login`, values)
