import React from 'react'
import { Link } from 'react-router-dom'
import {Breadcrumb, Icon} from 'antd'
import './breadcrumd.less'


const Item = Breadcrumb.Item;

class Bread extends React.PureComponent {
  render() {
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb><Item key="systemHome"><Icon type="home"/><Link to='/admin'> 首页</Link></Item></Breadcrumb>
      </div>
    );
  }
}

export default Bread;
