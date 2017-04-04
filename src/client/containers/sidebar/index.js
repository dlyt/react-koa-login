import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import { Menu, Icon } from 'antd'
 import Manage from '../manage/ManagePage'
import './sidebar.less'
import Logo from '../logo'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class Sidebar extends Component {

  render() {
    return (
      <aside className="ant-layout-sidebar">
        <Logo />
        <Router>
          <Menu
           theme={'dark'}
           mode="inline"
          >
           <Menu.Item key="1"><Link to='/admin/manage'>管理</Link></Menu.Item>

         </Menu>
       </Router>
      </aside>
    )
  }
}


export default connect(null, {  })(Sidebar)
