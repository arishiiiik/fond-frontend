import axios from 'axios'

const API_URL = 'https://fond-backend.onrender.com/api'

console.log('API_URL:', API_URL)

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
})

const refreshAxios = axios.create({
    baseURL: API_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshToken = localStorage.getItem('admin_refresh')
                if (!refreshToken) {
                    throw new Error('No refresh token')
                }
                const response = await refreshAxios.post('/token/refresh/', {
                    refresh: refreshToken
                })
                localStorage.setItem('admin_token', response.data.access)
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                return api(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem('admin_token')
                localStorage.removeItem('admin_refresh')
                window.location.href = '/admin/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export const getProjects = () => api.get('/projects/')
export const getProject = (slug) => api.get(`/projects/${slug}/`)
export const getTeam = () => api.get('/team/')
export const getDocuments = () => api.get('/documents/')

export default api