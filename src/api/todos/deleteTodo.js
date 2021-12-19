import axios from "axios";
async function deleteTodo(id) {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.delete(`http://localhost:4000/api/event/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error("Could not delete todo!", error);
    throw error;
  }
}
export default deleteTodo;
