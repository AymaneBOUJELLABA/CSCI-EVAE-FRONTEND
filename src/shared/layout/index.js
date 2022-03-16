import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import "antd/dist/antd.css";
import "./Style/style.css";

const { Content, Footer } = Layout;

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
          }}
        >
          {props.children}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          CSCI-EVAE © 2022 by Dosi Student
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Container;
