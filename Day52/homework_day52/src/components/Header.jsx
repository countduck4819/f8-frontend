import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
        <div className="container">
          <Link to={``}><div className="logo"><img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/305398052_608642147579341_2974290729526947917_n.jpg?stp=cp0_dst-jpg_p86x86&_nc_cat=101&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeFT9vXw4s9cb8JKwkIL29mTInKP6_qnfAoico_r-qd8CmOIkbd11I82T9sNb-oSIZNZyPua_oQw78EREXFBUp_8&_nc_ohc=6zLlgLiAtG4AX_awYWN&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBkva-AvloSOX8f2tSuHWzubq_C4lZ-ZRzx8t37vC9zcg&oe=658263F6" alt="" /></div></Link>
          <Link to={`card`}>
            <div className="store">
                <i className="fa-solid fa-store"></i>
                <div className="number">0</div>
            </div>
          </Link>
        </div>
      </header>
  )
}

export default Header