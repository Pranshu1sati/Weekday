import React from "react";

const SidebarLeft = () => {
  return (
    <div className="leftBar">
      <img src="./logo.png" alt="" />
      <div className="logoContent">
        <h4>Get jobs</h4>
        <div className="logos">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="logos">
          <span className="material-symbols-outlined">search</span>
        </div>
        <div className="logos">
          <span className="material-symbols-outlined">currency_rupee</span>
        </div>
        <div className="logos">
          <span className="material-symbols-outlined">person_add</span>
        </div>
      </div>
      <div className="ReferLogoContent">
        <h4>REFER</h4>
        <div className="ReferLogo">
          <span className="material-symbols-outlined">recommend</span>
        </div>
        <div className="ReferLogo">
          <span className="material-symbols-outlined">featured_play_list</span>
        </div>
        <div className="ReferLogo">
          <span className="material-symbols-outlined">share</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
