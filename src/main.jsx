import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import './team.css'
import './document.css'
import './fond.css'
import './contacts.css'
import './project.css'
import './project_description.css'

// Восстанавливаем путь после редиректа
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath && redirectPath !== '/') {
  sessionStorage.removeItem('redirectPath');
  window.history.replaceState(null, '', redirectPath);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)