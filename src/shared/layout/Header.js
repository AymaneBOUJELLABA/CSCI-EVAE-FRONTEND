import { Button, Dropdown, Layout, Menu } from "antd";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
export default function HeaderApp(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log(auth);

    auth.logout();
    console.log("logged out ", auth.user);
    navigate("/connexion");
    //window.location.href = "/connexion";
  };
  console.log(auth);
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        <b style={{width:'50px', marginRight:'5px'}}>Se déconnecter</b>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: props.togglee,
        }
      )}
      <div style={{ float: "right", margin: "3px", marginRight: "40px" }}>
        {auth.user ? (
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Button type="primary" shape="circle" size="large">
              <b>{auth.user.charAt(0).toUpperCase()} </b>
              {/* or button */}
              {/* <Button size="large" type="primary" ghost onClick={handleLogout}>
            Logout
          </Button>
           */}
            </Button>
          </Dropdown>
        ) : (
          <div></div>
        )}
      </div>
    </Header>
  );
}
