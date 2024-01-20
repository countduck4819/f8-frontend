import React from 'react'
import "./assets/style.css"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import ConfigTrello from './components/ConfigTrello.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <ConfigTrello/> */}
    </Provider>
  // </React.StrictMode>,
)
