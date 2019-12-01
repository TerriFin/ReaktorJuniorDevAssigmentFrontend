import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Module = () => {
  /*
  We need to get the module data from backend here, because only here we know the current url
  I took a small shortcut here, i would have liked to make a container
  that fetches this data with a dedicated api folder and feeds it to this component with props,
  but since this app is so small it would have made the code more complicated than it needed to be
  */
  const [currentModule, setCurrentModule] = useState({})

  // Get current url parameter 'moduleName'
  const { moduleName } = useParams()

  // Get data from backend using url
  useEffect(() => {
    axios.get(`http://localhost:3001/api/${moduleName}`)
      .then((response) => {
        // eslint-disable-next-line no-undef
        window.scrollTo(0, 0)
        setCurrentModule(response.data)
      })
      // run this effect only if url parameter changes
  }, [moduleName])

  // Not every module has dependencies or reverse dependencies,
  // so we return an empty list instead of undefined if that is the case.
  const getDependencies = () => {
    if (currentModule.dependencies) {
      return currentModule.dependencies
    }

    return []
  }

  const getReverseDependencies = () => {
    if (currentModule.reverseDependencies) {
      return currentModule.reverseDependencies
    }

    return []
  }

  /*
  There is no way of modifying the data given by server,
  so there is no way of changing the index of given modules.

  If there needed to be a way of sending stuff to the backend,
  i would add the current module index inside the backend.

  Preferably thought the index would be added automatically by some database or other system.
  */
  if (currentModule) {
    return (
      <div>
        <h1>{moduleName}</h1>
        <br />
        <p>{currentModule.description}</p>
        <br />
        <h2>Dependencies: </h2>
        <br />
        <ul>
          {getDependencies().map((dep, i) => <li key={i}><Link to={dep}>{dep}</Link></li>)}
        </ul>
        <br />
        <h2>Reverse Dependencies: </h2>
        <ul>
          {getReverseDependencies().map((revDep, i) => <li key={i}><Link to={revDep}>{revDep}</Link></li>)}
        </ul>
        <br />
        <p><Link className="back" to="/">Back to index</Link></p>
        <br />
      </div>
    )
  }

  return (
    <div>
      <h1>{moduleName}</h1>
      <br />
      <p>This module is not found in the system, sorry :(</p>
      <br />
      <p><Link className="back" to="/">Back to index</Link></p>
      <br />
    </div>
  )
}

export default Module
