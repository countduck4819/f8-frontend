import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./scss/style.scss"
import { store } from './redux/redux.js'
import { Provider } from 'react-redux'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import ProductsList from './components/ProductsList.jsx'
import InfoProducts from './components/InfoProducts.jsx'
const router = createBrowserRouter([
  {
    path: "",
    element: <>
      <App/>
    </>,
    children: [
      {

      },
      {
        path: "card",
        element: <InfoProducts/>,
      },
      {
        path: "products/1",
        index: true,
        element: <ProductsList/>,
      },
      {
        index: true,
        element: <ProductsList/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
