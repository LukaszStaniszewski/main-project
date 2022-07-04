import axios, {AxiosPromise} from 'axios'
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
   LOG_OUT = "/api/session",
   SIGN_UP = "/api/user/register",
   GET_USERS = "/api/user",
   UPDATE_USERS = "/api/user",
   DELETE_USERS = "/api/user/delete",
   CREATE_COLLECTION = "api/collection/new",
   CREATE_COLLECTION_WITH_ITEMS = "api/collection",
   DETE_COLLECTION = "api/collection/delete",
   GET_COLLECTIONS_WITH_ITEMS = "api/collection",
   GET_COLLECTIONS_WITH_ITEMS_BY_USER = "api/collection/user",
   CREATE_ITEM = "api/item/new",
   DELETE_ITEM ="api/item/delete",
   UPLOAD_IMAGE = "api/collection/image"
}

export const postRequest = <returnType>(url: string, payload: any, options = optionsDefault): AxiosPromise<returnType> => api.post(url, payload, options)
export const patchRequest = <returnType>(url: string, payload: any): AxiosPromise<returnType> => api.patch(url, payload, optionsDefault)
export const getRequest = <returnType>(url: string): AxiosPromise<returnType> => api.get(url, optionsDefault)
export const deleteRequest = (url: string): AxiosPromise => api.delete(url, optionsDefault)

const optionsDefault = {
  withCredentials: false,
}

export const optionsUploadImage = {
   // withCredentials: false,
   // headers: { 'content-type': 'application/octet-stream' },
   headers: { 'content-type': 'multipart/form-data' },
   
 }
export interface ITokens {
   accessToken: string,
   refreshToken: string
}

interface IHeaders {
   Authorization: string,
   "x-refresh": string
}

