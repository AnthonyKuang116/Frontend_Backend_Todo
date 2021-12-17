import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header, Login, SignUp, TodoList } from "./index";
import ".././css/index.css"

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    async function fetchTodos() {
      const data = await getTodos(userId);
      setTodos(data);
    }
  }, [userId]);

  return (
    <div className="App">
      <Router>
        <Header {...{ loggedIn, setLoggedIn }} />
        <Routes>
          <Route path="/" element={<Login {...{ loggedIn, setLoggedIn }} />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="todoList" element={<TodoList {...{ todos, setTodos }} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
