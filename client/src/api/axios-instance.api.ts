import axios from 'axios'

// export const api = axios.create({baseURL : process.env.REACT_APP_BASE_API_URL})

// api.defaults.headers.post['Content-Type'] = 'application/json'

// api.interceptors.request.use( (req) => {
//   if (localStorage.getItem('token')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`;
//     req.headers["x-refresh"] = `${JSON.parse(localStorage.getItem('token')).refreshToken}`;
//   }
//   return req;
// }, (error) => {
//   return Promise.reject(error)
// })

// export const fetchUsers = () => api.get('/users')
// export const deleteUsers = <T> (usersToDelete: T) => api.post('/users', usersToDelete, options)
// export const updateUsers = (usersToUpdate) => api.patch('/users', usersToUpdate)
// export const getUserSession = () => api.get('/api/session', options)

// export const fetchAuthUser = () => api.get('/user', options)
// export const signIn = (userCredentials) => api.post('/api/session', userCredentials)
// export const signUp = (userCredentials) => api.post('/', userCredentials, options)
// export const deleteSession = () => api.delete('/api/session', options)

// const options = {
//   withCredentials: false,
// }