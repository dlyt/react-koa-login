import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Welcome from './welcome'
import Admin from './admin/adminPage'


class ModalSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.previousLocation = this.props.location
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Welcome}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
    )
  }
}


const App = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
)

export default App
