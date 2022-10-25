import React, { useEffect, useState } from 'react'
import { getContributors, getRepos } from '../../services/github'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Repos from '../../components/Repos'

const Hunt = () => {

  const [token, setToken] = useState('')
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder='Token'
            value={token}
            onChange={(e) => {
              setToken(e.target.value)
            }}
          />
          <Form.Control
            placeholder='Org'
            onChange={(e) => {
              setOrg(e.target.value)
            }}
            value={org} />
          <Button
            variant="primary"
            onClick={() => {
              loadRepos()
            }}
          >
            GET
          </Button>
        </Form.Group>

        <hr />
        {repos.length > 0 &&
          <ul>
            {handleRepos(repoWithContributors)}
          </ul>
        }

        <hr />

      </Form>
    </>
  )

}

export default Hunt