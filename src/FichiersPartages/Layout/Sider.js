import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router";
import "./styles.css";
import {
  DatabaseOutlined,
  FileAddOutlined,
  OrderedListOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderPage = () => {
  const { push } = useHistory();
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
      >
        <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Rubriques">
          <Menu.Item
            key="1"
            icon={<FileAddOutlined />}
            onClick={() => {
              console.log("hwwwwwww :>> ");
              push("/rubriques/ajouter");
            }}
          >
            Ajouter rubrique
          </Menu.Item>

          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            Liste des rubriques
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SiderPage;
