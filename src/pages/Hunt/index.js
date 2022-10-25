import React, { useEffect, useState } from 'react'
import { getContributors, getRepos } from '../../services/github'
import Repos from '../../components/Repos'

const Hunt = () => {

  const [token, setToken] = useState('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')
  const [org, setOrg] = useState('aziontech')
  const [repos, setRepos] = useState([])
  const [text, setText] = useState('')
  const [repoWithContributors, setRepoWithContributors] = useState({})

  const loadRepos = async () => {
    try {
      const resp = await getRepos({
        org,
        token
      })
      setRepos(resp.data)

    } catch (e) {
      console.log('ERROR -> loadRepos', e)
    }
  }

  useEffect(() => {
    repos.map(async (repo, index) => {
      const resp = await getContributors({
        token,
        org,
        repo: repo.name
      })
      console.log('----', repo.name)

      // setContributors({ ...contributors, [index]: 'ccc' })
      setRepoWithContributors(prevContributors => {
        return {
          ...prevContributors, [repo.name]: {
            name: repo.name,
            contributors: resp.data
          }
        }
      })

    })

  }, [repos])

  useEffect(() => {
    console.log('loaded', repoWithContributors)
  }, [repoWithContributors])


  const handleRepos = (r) => {

    return Object.keys(r).map((item, index) => {
      return (

        <li key={index}>
          {item}
          <div>Contributors:</div>
          <ul>
            {r[item].contributors.map((c, i) => {
              return <li key={i}>{c.login}</li>
            })}
          </ul>
        </li>
      )
    })
  }

  return (
    <>
      <h1>Hunt</h1>
      <input
        type='text'
        placeholder='Token'
        value={token}
        onChange={(e) => {
          setToken(e.target.value)
        }}
      />
      <input
        type='text'
        placeholder='Org'
        onChange={(e) => {
          setOrg(e.target.value)
        }}
        value={org} />
      <button
        type='button'
        onClick={() => {
          loadRepos()
        }}>
        GET
      </button>
      <hr />
      {repos.length > 0 &&
        <ul>
          {handleRepos(repoWithContributors)}
        </ul>
      }

      <hr />
      <div>{text}</div>
    </>
  )

}

export default Hunt