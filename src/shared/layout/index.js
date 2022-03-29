import "antd/dist/antd.css";
import "./Style/style.css";

import React, { useState } from "react";

import Header from "./Header";
import { Layout } from "antd";
import Sider from "./Sider";
import { useLocation } from "react-router-dom";

const { Content, Footer } = Layout;

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname;
}

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  return (
    <Layout>
      {/* <Sider collapsed={collapsed} /> */}
      <Sider _collapsed={collapsed} />
      <Layout className="site-layout" style={{ height: "100vh" }}>
        <Header togglee={toggle} collapsed={collapsed} />

        <Content
          className="site-layout-background contentscroll"
          style={{
            margin: "24px 16px 0px 16px",
            padding: 24,
            height: "100%",
            backgroundColor: HeaderView() == "/connexion" ? "#EAEDED" : "",
          }}
        >
          {props.children}
        </Content>

        <Footer style={{ textAlign: "center", maxHeight: 15 }}>
          CSCI-EVAE © 2022 créé par DOSI DEV Tiger
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Container;
