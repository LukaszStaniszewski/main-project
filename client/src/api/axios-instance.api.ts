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

// export const fetchUsers = () => api.get('/users')
// export const deleteUsers = <T> (usersToDelete: T) => api.post('/users', usersToDelete, options)
// export const updateUsers = (usersToUpdate) => api.patch('/users', usersToUpdate)
// export const getUserSession = () => api.get('/api/session', options)

// export const fetchAuthUser = () => api.get('/user', options)
// export const signIn = (userCredentials: IUserFormValues) => api.post('/api/session', userCredentials)
// export const signUp = (userCredentials) => api.post('/', userCredentials, options)
// export const deleteSession = () => api.delete('/api/session', options)

export const User = {
   signIn: (userCredentials:IUserFormValues): AxiosPromise => api.post("/api/session", userCredentials, options),
   signUp: (userCredentials:IUserFormValues): Promise<ICurrentUser> => api.post("/api/user/register", userCredentials, options),
   logout: () : AxiosPromise => api.delete("api/session")
}

const options = {
  withCredentials: false,
}

interface ITokens {
   AccessToken: string,
   RefreshToken: string
}

interface IHeaders {
   Authorization: string,
   "x-refresh": string
}

