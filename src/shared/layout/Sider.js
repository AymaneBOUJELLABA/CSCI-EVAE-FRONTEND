import {
  AppstoreOutlined,
  DatabaseOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import ubo from "../../ubo.png";

const { Sider } = Layout;
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

const Sider2 = (props) => {
  const auth = useAuth();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  const { _collapsed } = props;
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Sider trigger={null} collapsible collapsed={_collapsed} s>
      <div className="logo">
        <Link to="/">
          <img
            style={
              _collapsed
                ? { height: "111%", width: "116%" }
                : { height: "147%", width: "92%" }
            }
            src={ubo}
            alt="logo"
          />
        </Link>
      </div>

      <Menu
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {auth.user && auth.role != "ETU" ? (
          <>
            {" "}
            <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Rubrique">
              <Menu.Item icon={<UnorderedListOutlined />} key="1">
                <Link to="/rubriques" style={{ textDecoration: "none" }}>
                  Liste des Rubriques
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<DatabaseOutlined />}
              title="Unite Enseignementes"
            >
              <Menu.Item icon={<UnorderedListOutlined />} key="2">
                <Link
                  to="/UniteEnseignements"
                  style={{ textDecoration: "none" }}
                >
                  Liste des UEs
                </Link>
              </Menu.Item>
            </SubMenu>
          </>
        ) : (
          <></>
        )}
      </Menu>
    </Sider>
  );
};

export default Sider2;
