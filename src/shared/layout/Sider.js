import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import ubo from '../../ubo.png'
import {
  AppstoreOutlined,
 
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const {Sider } = Layout;
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
        <Sider trigger={null} collapsible collapsed={this.props.collapsed} >
        <div className="logo" >
          <img src={ubo}/>
        </div>
        
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Rubrique" >
            <Menu.Item key="5"><Link to="/rubriques" style={{textDecoration:"none"}}>Rubriques</Link></Menu.Item>
            
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="evaluation">
            <Menu.Item key="9"><Link to="/ues" style={{textDecoration:"none"}}>List des UEs</Link> </Menu.Item>            
          </SubMenu>
          
      
        </Menu>
        
      </Sider>
    )
  }
}
