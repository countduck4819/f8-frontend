import React from 'react'

function InfoProducts() {
  return (
    <div className="info-product">
        <div className="img"><img src="https://picsum.photos/1600/500" alt="" /></div>
        <div className="info">
          <h2 className="type">VNG</h2>
          <h3 className="title">Cà phê VNG</h3>
          <div className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe eius voluptate possimus, debitis dicta maxime quod quis a. Adipisci, velit.</div>
          <div className="category">category: Cà phê</div>
          <div className="action">
            <button className='btn'>Go home</button>
            <div className="add-to-card">
              <span className="price">$236.296</span>
              <button className="btn add-card">Add to card</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoProducts