import {
  ApartmentOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

import React from 'react';
import ReactDOM from 'react-dom';
import ShowDetails from './showDetails';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class GetDetails extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  
    
  render() {
    const { collapsed } = this.state;console.log(this.props);
    return (
        <ShowDetails code={this.props.code}/>
    );
  }
}

