import axios from "axios";
async function updateTodo(id, from, to, content, creator) {
  try {
    const { data } = await axios.put(`http://localhost:4000/api/event/${id}`, {from, to, content, creator});
    return data;
  } catch (error) {
    console.error("Could not update todo!", error);
    throw error;
  }
}

export default updateTodo;
