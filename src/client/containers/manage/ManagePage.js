import React from 'react'
import './manage.less'
import {Row, Col, Button, message} from 'antd'
import {connect} from 'react-redux'

class Manage extends React.PureComponent {
  render() {
    return(
      <div>管理界面</div>
    )
  }
}

export default connect(null, {})(Manage);
