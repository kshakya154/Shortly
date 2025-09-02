import React from "react";
import PillNav from "./ui/Pillnav";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("https://shortly-backend-amcp.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/login");
      else console.error("Logout failed");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "url", label: "Url", href: "/url" },
    { id: "analytics", label: "Analytics", href: "/analytics" },
    { id: "about", label: "About us", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
    { id: "logout", label: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="ml-10">
      <PillNav
        logo="/logo.svg"
        logoAlt="Company Logo"
        items={navItems}
        activeHref="/"
        className="custom-nav"
      />
    </div>
  );
}

export default Header;
