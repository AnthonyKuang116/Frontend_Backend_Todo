import axios from "axios";
async function getTodo() {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get("http://localhost:4000/api/event", {headers: {'Authorization': `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error("Could not get todos!", error);
    throw error;
  }
}

export default getTodo;