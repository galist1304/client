import axios from "axios";

export const apiRequest = async (method, URL, payload = {}, isValidToken) => {
    try {
        if (isValidToken == false) {
            await refreshAccessToken();
        }
        const { data } = await axios({
            method,
            url: URL,
            data: payload,
            withCredentials: true
        })
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data.detail;
    }
}

const refreshAccessToken = async () => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/users/refresh',
            withCredentials: true
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}