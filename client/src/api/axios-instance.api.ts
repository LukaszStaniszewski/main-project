import axios, { AxiosPromise } from "axios";
export const baseUrl = process.env.REACT_APP_BASE_API_URL as string;
export const api = axios.create({ baseURL: baseUrl });
api.defaults.headers.post["Content-Type"] = "application/json";

api.interceptors.request.use(
   (req) => {
      if (localStorage.getItem("token") && req.headers) {
         req.headers.Authorization = `Bearer ${
            //@ts-ignore
            JSON.parse(localStorage.getItem("token")).accessToken
         }`;
         req.headers["x-refresh"] = `${
            //@ts-ignore
            JSON.parse(localStorage.getItem("token")).refreshToken
         }`;
      }
      return req;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export enum API_URL {
   SIGN_IN = "/api/session",
   LOG_OUT = "/api/session",
   SIGN_UP = "/api/user/register",
   GET_USERS = "/api/user",
   GET_USER_SEND_URL = "api/user",
   UPDATE_USERS = "/api/user",
   DELETE_USERS = "/api/user/delete",
   CREATE_COLLECTION = "api/collection/new",
   CREATE_COLLECTION_WITH_ITEMS = "api/collection",
   DELETE_COLLECTION = "api/collection/delete",
   GET_COLLECTION_WITH_ITEMS = "api/collection",
   GET_COLLECTIONS_BY_USER = "api/collection/user",
   CREATE_ITEM = "api/item/new",
   DELETE_ITEM = "api/item/delete",
   UPLOAD_IMAGE = "api/collection/image",
   GET_ITEM = "api/item/get",
   CREATE_COMMENT = "api/comment/new",
   GET_COMMENTS = "api/comment/",
   DELETE_COMMENT = "api/comment/delete",
   GET_LATEST_ITEMS = "api/item",
   GET_LARGEST_COLLECTIONS = "api/collection/largest",
   AUTOCOMPLETE = "api/collection/autocomplete",
}

export const postRequest = <returnType>(url: string, payload: any): AxiosPromise<returnType> =>
   api.post(url, payload, optionsDefault);
export const uploadFile = <returnType>(url: string, payload: any): AxiosPromise<returnType> =>
   api.post(url, payload, optionsUploadImage);
export const patchRequest = <returnType>(url: string, payload: any): AxiosPromise<returnType> =>
   api.patch(url, payload, optionsDefault);
export const getRequest = <returnType>(url: string): AxiosPromise<returnType> =>
   api.get(url, optionsDefault);
export const deleteRequest = (url: string): AxiosPromise => api.delete(url, optionsDefault);

const optionsDefault = {
   withCredentials: false,
};

export const optionsUploadImage = {
   // withCredentials: false,
   headers: { "content-type": "multipart/form-data" },
};
export interface ITokens {
   accessToken: string;
   refreshToken: string;
}
