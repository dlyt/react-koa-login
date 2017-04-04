import React from 'react'
import { connect } from 'react-redux'
import { logout, auth } from '../../actions/authActions'
import {Icon, Menu} from 'antd'
import './header.less'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item


class Header extends React.PureComponent {
  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const name = this.props.auth.user.name
    return (
      <div className="ant-layout-header">
        <Menu className="header-menu" mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{name}</span>}>
              <MenuItem key="setting:1">
                <Icon type="logout"/>
                <a href='#' onClick={this.logout.bind(this)}>退出</a>
              </MenuItem>
          </SubMenu>
        </Menu>
      </div>
    )
  }

}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired,
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Header)
