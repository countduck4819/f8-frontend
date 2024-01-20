import React from 'react'
import Loading from '../Loading/Loading'
import ConfigTrello from './ConfigTrello'

function Trello({loading,reload}) {
  if (!localStorage.getItem("apiKey")) {
    console.log(localStorage.getItem("apiKey"))
    reload(false)
  }
  return (
    <>
        {loading ? <Loading/>: <ConfigTrello/>}
    </>
  )
}

export default Trello