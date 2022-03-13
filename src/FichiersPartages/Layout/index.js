import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Sider from "./Sider";
import { Layout, Breadcrumb } from "antd";
import "./styles.css";

const { Content } = Layout;

const Container = (Wrapped) => () =>
  (
    <>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider />
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {" "}
              <Wrapped />
            </Content>
          </Layout>
        </Content>

        <Footer />
      </Layout>
    </>
  );

export default Container;
