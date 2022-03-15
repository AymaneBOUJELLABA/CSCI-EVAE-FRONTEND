import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import Sider from "./Sider";

const Container = (Wrapped) => () =>
  (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <div style={{ margin: "100px", overflow: "auto" }}>
          <Wrapped />
        </div>
        <Footer />
      </Layout>
    </Layout>
  );

export default Container;
