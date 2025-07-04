import axios from "axios"
import { getUserSessionClient } from "../actions/actions"

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SUPABASE_URL,
})

// Agrega un interceptor que se ejecuta antes de cada request
axiosClient.interceptors.request.use(async (config) => {
  const session = await getUserSessionClient()
  const token = session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default axiosClient