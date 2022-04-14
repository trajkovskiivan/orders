import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  return (
    <div className="header">
      <div
        className={`header_btn ${active === 0 && `btn_active`} `}
        onClick={() => {
          setActive(0);
          navigate("/main");
        }}
      >
        <p>Sessions</p>
      </div>
      <div
        className={`header_btn ${active === 1 && `btn_active`}`}
        onClick={() => {
          setActive(1);
          navigate("/tags");
        }}
      >
        <p>Tags</p>
      </div>
      <div
        className={`header_btn ${active === 2 && `btn_active`}`}
        onClick={() => {
          setActive(2);
          navigate("/premiumAccounts");
        }}
      >
        <p>Premium</p>
      </div>
    </div>
  );
};

export default Header;
