import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeLists from "./pages/RecipeLists.tsx";
import RecipeDetail from "./pages/RecipeDetail";
import Navbar from "./components/Navbar";

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RecipeLists />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
