import axios, {AxiosResponse, AxiosRequestTransformer, AxiosPromise} from 'axios'
import { IUserFormValues, ICurrentUser } from "../store/user/user.types"
export const api = axios.create({baseURL : "http://localhost:8000"})
// process.env.REACT_APP_BASE_API_URL
api.defaults.headers.post['Content-Type'] = 'application/json'

api.interceptors.request.use( (req) => {
  
  if (localStorage.getItem('token') && req.headers) {
   // @ts-ignore
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`;
     // @ts-ignore
    req.headers["x-refresh"] = `${JSON.parse(localStorage.getItem('token')).refreshToken}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error)
})

export enum API_URL {
   SIGN_IN = "/api/session",
   SIGN_UP = "/api/user/register",
   LOG_OUT = "/api/session",
   GET_USERS = "/api/user",
}

export const postRequest = <returnType>(url: string, payload: any): AxiosPromise<returnType> => api.post(url, payload, options)
export const patchRequest = <returnType>(url: string, payload: any): AxiosPromise<returnType> => api.patch(url, payload, options)
export const getRequest = <returnType>(url: string): AxiosPromise<returnType> => api.get(url, options)
export const deleteRequest = (url: string): AxiosPromise => api.delete(url, options)

const options = {
  withCredentials: false,
}

export interface ITokens {
   accessToken: string,
   refreshToken: string
}

interface IHeaders {
   Authorization: string,
   "x-refresh": string
}

