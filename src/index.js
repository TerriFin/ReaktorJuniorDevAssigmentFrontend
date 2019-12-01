// Since the app is so small, i just define all css in this one file, and dont use classNames.
import './index.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import axios from 'axios'

import Modules from './components/Modules'
import Module from './components/Module'

const App = () => {
  const [modules, setModules] = useState([])

  /*
  This effect only needs to be run once,
  as there is no way to change the modules once they are fetched.
  */
  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        // eslint-disable-next-line no-undef
        window.scrollTo(0, 0)
        setModules(response.data)
      })
  }, [])

  return (
    <div>
      <Router>
        <Route exact path="/">
          <Modules modules={modules} />
        </Route>
        <Route exact path="/:moduleName">
          <Module />
        </Route>
      </Router>
    </div>
  )
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'))
