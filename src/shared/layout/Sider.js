import { Layout, Menu } from "antd";
import React, { Component } from "react";

import { AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ubo from "../../ubo.png";

const { Sider } = Layout;
const { SubMenu } = Menu;
export default class SiderApp extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo">
          <Link to="/">
            <img
              style={
                this.props.collapsed
                  ? { height: "111%", width: "116%" }
                  : { height: "147%", width: "92%" }
              }
              src={ubo}
              alt="logo"
            />
          </Link>
        </div>

        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Test">
            <Menu.Item key="1">
              <Link to="/test" style={{ textDecoration: "none" }}>
                Test
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Rubrique">
            <Menu.Item key="2">
              <Link to="/rubriques" style={{ textDecoration: "none" }}>
                Rubriques
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<AppstoreOutlined />} title="evaluation">
            <Menu.Item key="3">
              <Link to="/ues" style={{ textDecoration: "none" }}>
                List des UEs
              </Link>{" "}
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
