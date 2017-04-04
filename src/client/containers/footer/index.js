import React from 'react';
import {BackTop} from 'antd';
import './footer.less';


class Footer extends React.PureComponent {
  render() {
    return (
      <div>
        <BackTop target={() => document.getElementById('main-content-div')}/>
        <div className="ant-layout-footer" dangerouslySetInnerHTML={{ __html: 'ztfive版权所有 © 2015-2099' }}/>
      </div>
    );
  }

}

export default Footer;
