import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { client } from '../js/client';
import Loaders from './Loaders';

function InfoProducts() {
  const param = useParams();
  const [state,setState] = useState(false)
  const [item,setItem] = useState([]);
  
  useEffect(() => {
    async function getProductId(productId) {
      const {response,data} = await client.get(`/products/${productId}`);
      const newData = data.data
      return {newData};
    }
    console.log(item)
    if (!state) {
      getProductId(param.productId).then(({newData}) => {
        console.log(newData)
        setItem([newData])
        setState(true)
        
    })
    }
    if (item) {
      console.log(item)
    }
  },[item,state])
  return (
    <div className="info-product">
        {state === false ? <Loaders/> : item.map(({_id,name,price,brand,image,category,description}) => {
          return <Fragment key={_id}>
            <div className="img"><img src={image} alt="" /></div>
        <div className="info">
          <h2 className="type">{brand}</h2>
          <h3 className="title">{name}</h3>
          <div className="desc">{description}</div>
          <div className="category">category: {category}</div>
          <div className="action">
            <Link to={`../`}><div className='btn'>Go home</div></Link>
            <div className="add-to-card">
              <span className="price">${price}</span>
              <button className="btn add-card">Add to card</button>
            </div>
          </div>
        </div>
          </Fragment>
        })}
      </div>
  )
}

export default InfoProducts