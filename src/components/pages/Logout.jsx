import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://shortly-backend-amcp.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include", // important to send cookies
        }
      );

      if (response.ok) {
        navigate("/login"); // redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
