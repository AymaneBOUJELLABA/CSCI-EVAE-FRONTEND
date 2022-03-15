import React from "react";
import { PageHeader } from "antd";

const Header = () => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader ghost={false} title={"Gestion des Questionnaires"} />
    </div>
  );
};

export default Header;
