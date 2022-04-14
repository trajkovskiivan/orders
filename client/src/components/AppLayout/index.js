import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppLayout({ children }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  useEffect(() => {
    console.log("LOCATION", window.location.pathname);
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActive(0);
    }
    if (pathname === "/stats") {
      setActive(1);
    }
    if (pathname === "/new") {
      setActive(2);
    }
  }, []);
  return (
    <div className="wrapper">
      <div className="header">
        <div
          className={`header_btn ${active === 0 && `btn_active`} `}
          onClick={() => {
            setActive(0);
            navigate("/");
          }}
        >
          <p>Sessions</p>
        </div>
        <div
          className={`header_btn ${active === 1 && `btn_active`}`}
          onClick={() => {
            setActive(1);
            navigate("/stats");
          }}
        >
          <p>Stats</p>
        </div>
        <div
          className={`header_btn ${active === 2 && `btn_active`}`}
          onClick={() => {
            setActive(2);
            navigate("/new");
          }}
        >
          <p>New</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default AppLayout;
