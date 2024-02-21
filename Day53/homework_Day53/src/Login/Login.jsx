import React, { useEffect, useState } from "react";
import "./style.scss";
import { fetchInput, getApiKey } from "../middleware/inputMiddleware";
import { useDispatch } from "react-redux";
import { client } from "../js/config/client";
import Trello from "../components/Trello";
import Headers from "../components/Headers";
import { Box, Container } from "@mui/material";
import BoardBar from "../components/BoardBar/BoardBar";

function Login() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [checkIn, setCheckIn] = useState(false);
    const [inputText, setInputText] = useState("");
    const [checkApiKey, setCheckApiKey] = useState(true);
    const handleChange = function (e) {
        setInputText(e.target.value);
    };
    const reload = function (bool) {
        setCheckIn(bool);
    };
    async function Loading() {
        if (localStorage.getItem("apiKey") && checkApiKey === true) {
            setCheckApiKey(false);
            setCheckIn(true);
            setLoading(true);
            client.setApiKey(JSON.parse(localStorage.getItem("apiKey")));
            await dispatch(await getApiKey());
            setLoading(false);
        }
    }

    const handleSubmit = async function (e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z._-]+@[a-z]+\.[0-9a-zA-Z._-]{2,}$/;
        if (pattern.test(inputText)) {
            setLoading(true);
            await dispatch(await fetchInput(inputText));
            await dispatch(await getApiKey());
            setLoading(false);
            setCheckIn(true);
            setCheckApiKey(false);
        } else {
            console.log("yeu cau nhap lai");
        }
        setInputText("");
    };
    useEffect(() => {
        Loading();
    }, [checkIn]);
    return (
        <>
            {checkIn ? (
                <>
                    <Container
                        disableGutters
                        maxWidth={false}
                        sx={{
                            height: "100vh",
                            backgroundColor: (theme) => {
                                return theme.palette.mode === "dark"
                                    ? "#2c3e50"
                                    : "#1565c0";
                            },
                        }}
                    >
                        <Box
                            px={2}
                            sx={{
                                // color: "primary.light",
                                width: "100%",
                                height: (theme) => theme.trello.appBarHeight,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: (theme) => {
                                    return theme.palette.mode === "dark"
                                        ? "#222"
                                        : "#1565c0";
                                },
                            }}
                        >
                            <Headers />
                        </Box>
                        <Box
                            px={2}
                            sx={{
                                width: "100%",
                                height: (theme) => theme.trello.boardBarHeight,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                overflowX: "auto",
                                borderBottom: "1px solid white",
                                backgroundColor: (theme) => {
                                    return theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#1976d2";
                                },
                            }}
                        >
                            <BoardBar></BoardBar>
                        </Box>
                        <Box
                            sx={{
                                // backgroundColor: "primary.main",
                                width: "100%",
                                height: (theme) =>
                                    `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
                                display: "flex",
                                alignItems: "center",
                                bgcolor: (theme) => {
                                    return theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#1976d2";
                                },
                            }}
                        >
                            <Trello
                                checkIn={checkIn}
                                loading={loading}
                                reload={reload}
                            />
                        </Box>
                    </Container>
                </>
            ) : (
                <>
                    <div className="login">
                        <div className="login-form">
                            <form action="" onSubmit={handleSubmit}>
                                <label htmlFor="input-login">
                                    Enter the Email!
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={inputText}
                                    type="text"
                                    id="input-login"
                                    className="input-login"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Login;
