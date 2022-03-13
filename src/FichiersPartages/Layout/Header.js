import React from "react";
// import { PageHeader } from "antd";
import { Layout, Menu } from "antd";
import "./styles.css";

const { Header } = Layout;

const HeaderPage = () => {
  return (
    // <div className="site-page-header-ghost-wrapper">
    //   <PageHeader ghost={false} title={"Gestion des Questionnaires"} />
    // </div>

    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderPage;
