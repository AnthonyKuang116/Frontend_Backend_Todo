import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header, Login, SignUp, TodoList } from "./index";
import ".././css/index.css"

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

  }, [loggedIn]);

  return (
    <div className="App">
      <Router>
        <Header {...{ loggedIn, setLoggedIn }} />
        <Routes>
          <Route path="/" element={<Login {...{ loggedIn, setLoggedIn }} />} />
          <Route path="login" element={<Login {...{ loggedIn, setLoggedIn }} />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="todoList" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
