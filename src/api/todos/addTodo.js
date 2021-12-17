import axios from "axios";
async function addTodo({ from, to, content }) {
    try {
        const { data } = await axios.post("http://localhost:4000/api/event", {
            from,
            to,
            content
        });
        return data;
    } catch (error) {
        console.error("Could not add todo!", error);
        throw error;
    }
}

export default addTodo;