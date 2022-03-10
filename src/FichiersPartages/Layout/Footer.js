import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

const AppFooter = () => (
  <Footer>
    <div className="container_antd">
      <Row type="flex" align="middle" justify="center">
        <Col sm={24}>
          <p className="text-center footer">© CSCI-EVAE 2022</p>
        </Col>
      </Row>
    </div>
  </Footer>
);

export default AppFooter;
