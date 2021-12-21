import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header, Login, SignUp, TodoList } from "./index";
import ".././css/index.css"
import { Provider } from 'react-redux';
import { store } from '../redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="todoList" element={<TodoList />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
