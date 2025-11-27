import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ListItems from "./pages/ListItems";
import AdminPanel from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/items" element={<ListItems />} />
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
