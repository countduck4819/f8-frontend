export const requestApiKey = async function (clients) {
    try {
        const { userEmail } = JSON.parse(localStorage.getItem("apiKey"));
        if (!userEmail) {
            throw new Error("Refresh apiKey not empty")
        }
        const { data, response } = await clients.get(`/api-key?email=${userEmail}`);
        const objectClient = data.data;
        objectClient.userEmail = userEmail;
        localStorage.setItem("apiKey",JSON.stringify(objectClient))
        if (!response.ok) {
            throw new Error("UserEmail not Authorization")
        } 
        return objectClient
    }
    catch (e){
        return false;
    }
}