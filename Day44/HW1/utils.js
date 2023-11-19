export const requestRefresh = async function (client) {
    try {
        const {refreshToken} = JSON.parse(localStorage.getItem("login_token"));
        if (!refreshToken) {
            throw new Error("Refresh token not empty")
        }
        const {response, data} = await client.post("/auth/refresh-token", {
            refreshToken
        })
        console.log(response,data)
        const tokens = data.data.token;
        localStorage.setItem("login_token",JSON.stringify(tokens))
        if (!response.ok) {
            throw new Error("Refresh token Unauthorize")
        }
        return tokens;
    } catch (e) {
        return false;
    }
}