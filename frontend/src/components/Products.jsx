import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch("http://localhost:8080/api/sessions/logout");

    if (response.status == 200) {
      await response.json();
      document.cookie = `jwtCookie=`;
    }
  };
  return (
    <>
      <h1>Products</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};
