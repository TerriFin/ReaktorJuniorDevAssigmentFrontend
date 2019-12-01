import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Modules = (props) => {
  const { modules } = props
  return (
    <div>
      <h1>Modules loaded in the system:</h1>
      <br />
      <ol>
        {modules.map((module, i) => (
          <li key={i}>
            <Link to={module}>
              {module}
            </Link>
          </li>
        ))}
      </ol>
      <br />
    </div>
  )
}

Modules.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modules: propTypes.array.isRequired,
}

export default Modules
