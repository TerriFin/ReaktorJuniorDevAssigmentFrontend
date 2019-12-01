import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Module = () => {
  const [currentModule, setCurrentModule] = useState({})

  const { moduleName } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3001/index/${moduleName}`)
      .then((response) => {
        setCurrentModule(response.data)
      })
  }, [moduleName])

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

  if (currentModule) {
    return (
      <div>
        <h1>{moduleName}</h1>
        <p>{currentModule.description}</p>
        <h2>Dependencies: </h2>
        <ul>
          {getDependencies().map((dep, i) => <li key={i}><Link to={dep}>{dep}</Link></li>)}
        </ul>
        <h2>Reverse Dependencies: </h2>
        <ul>
          {getReverseDependencies().map((revDep, i) => <li key={i}><Link to={revDep}>{revDep}</Link></li>)}
        </ul>
        <Link to="/">Back to index</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>{moduleName}</h1>
      <p>This module is not found in the system, sorry :(</p>
      <Link to="/">Back to index</Link>
    </div>
  )
}

export default Module
