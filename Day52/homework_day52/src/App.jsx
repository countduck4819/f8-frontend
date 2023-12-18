import React from 'react'
import Pagination from './components/Pagination'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header></Header>
      <Outlet/>
      
    </>
  )
}

export default App
