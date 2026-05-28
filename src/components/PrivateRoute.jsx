import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
        // Если нет токена, перенаправляем на страницу входа
        return <Navigate to="/admin/login" replace />
    }
    
    return children
}

export default PrivateRoute