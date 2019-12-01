import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import axios from 'axios'

import Modules from './components/Modules'
import Module from './components/Module'

const App = () => {
  const [modules, setModules] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/index')
    .then(response => {
      setModules(response.data)
    })
  }, [])

  return (
    <div>
      <Router>
        <Route exact path='/'>
          <Modules modules={modules} />
        </Route>
        <Route exact path='/:moduleName'>
          <Module />
        </Route>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))