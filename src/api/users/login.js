import axios from "axios";
async function login(username, password) {
  try {
    const { data } = await axios.post("http://localhost:4000/api/user/login", { username, password });
    return data;
  } catch (error) {
    throw error;
  }
}

export default login;
