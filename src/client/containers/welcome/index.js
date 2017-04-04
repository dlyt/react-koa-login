import React from 'react'
import './index.less'


class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          Hello, 这里是欢迎界面。
        </h1>
      </div>
    );
  }

}

export default Welcome;
