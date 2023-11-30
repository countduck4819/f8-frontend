import React, { useEffect, useState } from 'react'
import { app } from '../js/app';
import { client } from '../js/client';
function Remove({id,setRemove}) {
    const removeTodo = async function (e) {
        const {apiKey} = app.convertCookieToObject(document.cookie);
        client.setApiKey(apiKey);
        const {data,response} = await client.delete(`/todos/${id}`)
        console.log(data)
        setRemove()
    }
  return (
    <button id={id} className="btn remove" onClick={removeTodo}>Xóa</button>
  )
}

export default Remove