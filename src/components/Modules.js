import React from 'react'
import { Link } from 'react-router-dom'

const Modules = props => {
  const { modules } = props
  return ( 
    <div>
      <ul>
        {modules.map((module, i) => 
          <li key={i}>
            <Link to={module}>
              {module}
            </Link>
          </li> 
        )}
      </ul>
    </div>
  )
}

export default Modules
