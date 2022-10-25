import React from 'react'

const Repos = ({ repo }) => {

  return (
    <li
      key={repo.name}
    >
      {Object.keys(repo).forEach((key) => {
        return <p>- {repo[key]}</p>
      })}
    </li>
  )

}

export default Repos