import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Register } from "./components/Register.jsx";
import { Login } from "./components/Login.jsx";
import { NewProduct } from "./components/NewProduct.jsx";
import { Products } from "./components/Products.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/newProduct" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
