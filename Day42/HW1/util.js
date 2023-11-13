export const requestRefresh = async (client) => {
    try {
        const {refresh_token: refreshToken} = JSON.parse(localStorage.getItem("login_token"));
    if (!refreshToken) {
        throw new Error("Refresh token not empty")
    } 
    console.log("trc")
    const {response , data} = await client.post("/auth/refresh-token", {
        refreshToken
    })
    console.log("sau")
    if (!response.ok) {
        // Không lấy được token mới
        throw new Error("Refresh token Unauthorize")
    }
    saveToken(data)
    console.log(data)
    return data;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const saveToken = (token) => {
    localStorage.setItem("login_token",JSON.stringify(token))
}