import axios from "axios";
async function signup(username, password) {
    try {
        const { data } = await axios.post("http://localhost:4000/api/user/signup", {
            username,
            password,
            isAdmin: false
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export default signup;
