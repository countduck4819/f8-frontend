import React from 'react'
import Loading from '../Loading/Loading'
import ConfigTrello from './ConfigTrello'

function Trello({loading,reload}) {
  if (!localStorage.getItem("apiKey")) {
    reload(false)
  }
  return (
    <>
        {loading ? <Loading/>:
        <>
          {/* <Headers/> */}
          <ConfigTrello/>
        </>}
    </>
  )
}

export default Trello