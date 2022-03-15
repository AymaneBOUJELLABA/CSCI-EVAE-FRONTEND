import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SubscriberSider = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu theme="light" mode="inline">
        <Menu.Item

        //onClick={() => push(PATHS.CANDIDATS.LIST)}
        >
          Liste Rubrique
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SubscriberSider;
