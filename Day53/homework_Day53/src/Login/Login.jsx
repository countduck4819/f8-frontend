import React, { useEffect, useState } from 'react'
import "./style.scss"
import { fetchInput, getApiKey } from '../middleware/inputMiddleware';
import { useDispatch } from 'react-redux';
import { client } from '../js/config/client';
import Trello from '../components/Trello';
function Login() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [checkIn, setCheckIn] = useState(false)
    const [inputText, setInputText] = useState("");
    const [checkApiKey, setCheckApiKey] = useState(true);
    const handleChange = function(e) {
        setInputText(e.target.value)
    }
    const reload = function (bool) {
        setCheckIn(bool)
    }
    async function Loading() {
        if (localStorage.getItem("apiKey") && checkApiKey === true) {
            setCheckApiKey(false)
            setCheckIn(true)
            setLoading(true)
            client.setApiKey(JSON.parse(localStorage.getItem("apiKey")));
            await dispatch(await getApiKey())
            setLoading(false)
        }
    }

    const handleSubmit = async function (e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z._-]+@[a-z]+\.[0-9a-zA-Z._-]{2,}$/
        if (pattern.test(inputText)) {
            setLoading(true)
            await dispatch(await fetchInput(inputText))
            await dispatch(await getApiKey())
            setLoading(false)
            setCheckIn(true)
            setCheckApiKey(false)
        }
        else {
            console.log("yeu cau nhap lai")
        }
        setInputText("");
    }
    useEffect(() => {
        Loading()
    }, [checkIn])
  return (
    <>
        {checkIn ? <Trello checkIn={checkIn} loading={loading} reload={reload}/>: <div className="login">
            <div className="login-form">
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="input-login">Enter the Email!</label>
                    <input onChange={handleChange} value={inputText} type="text" id="input-login" className="input-login"/>
                </form>
            </div>
        </div>}
    </>
  )
}

export default Login