import axios from "axios";
async function updateTodo({rowSelection, from, to, content, isCompleted}) {
  const token = localStorage.getItem('token');
  const creator = localStorage.getItem('creator')
  try {
    await axios.put(`http://localhost:4000/api/event/${rowSelection[0]}`, {from, to, content, isCompleted, creator}, {headers: {'Authorization': `Bearer ${token}`}});
    return {from: from.toISOString(), to: to.toISOString(), content, isCompleted, id: rowSelection[0]};
  } catch (error) {
    console.error("Could not update todo!", error);
    throw error;
  }
}

export default updateTodo;
