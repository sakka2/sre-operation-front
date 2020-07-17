import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './css/reset.css'
import './css/operation.css'
import './css/modal.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
serviceWorker.unregister()
