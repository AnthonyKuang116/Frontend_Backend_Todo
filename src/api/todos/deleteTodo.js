import axios from "axios";
async function deleteTodo(id) {
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/event/${id}`);
    return data;
  } catch (error) {
    console.error("Could not delete todo!", error);
    throw error;
  }
}
export default deleteTodo;
