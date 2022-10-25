import React, { useEffect, useState } from 'react'
import { getContributors, getRepos } from '../../services/github'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'

import Repos from '../../components/Repos'

const Hunt = () => {

  const [token, setToken] = useState('')
  const [org, setOrg] = useState('aziontech')
  const [repos, setRepos] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [repoWithContributors, setRepoWithContributors] = useState({})

  const loadRepos = async () => {
    try {
      const resp = await getRepos({
        org,
        token
      })
      setRepos(resp.data)
      setLoading(false)

    } catch (e) {
      console.log('ERROR -> loadRepos', e)
    }
  }

  useEffect(() => {
    if (repos.length > 0) {
      repos.map(async (repo) => {
        try {
          const resp = await getContributors({
            token,
            org,
            repo: repo.name
          })
          
          setRepoWithContributors(prevContributors => {
            return {
              ...prevContributors, [repo.name]: {
                name: repo.name,
                contributors: resp.data
              }
            }
          })
        } catch (i) {
          alert(0)
          console.log('getContributors', i)
        }
      })
    }
  }, [repos])

  const handleRepos = (r) => {

    return Object.keys(r).map((item, index) => {
      return (
        <ListGroup 
          key={index}
          as='ul'
          className='mt-3'>
          <ListGroup.Item as='li' active>{item}</ListGroup.Item>
         
          {r[item].contributors.map((c, i) => {
            return <ListGroup.Item key={i}>{c.login}</ListGroup.Item>
          })}
          
        </ListGroup>
      )
    })
  }

  return (
    <>
      <h1>Hunt</h1>
      <div className='row'>
        <div className='col'>
          <Form.Control
            placeholder='Token'
            value={token}
            onChange={(e) => {
              setToken(e.target.value)
            }}
          />
        </div>
        <div className='col'>
          <Form.Control
            placeholder='Org'
            onChange={(e) => {
              setOrg(e.target.value)
            }}
            value={org}
          />
        </div>
        <div className='col'>
          <Button
            variant="primary"
            onClick={() => {
              setLoading(true)
              loadRepos()
            }}
          >
            GET
          </Button>
        </div>
      </div>      
      <div className='row mt-3'>
        <div className='col'>
          {loading && 
            <ProgressBar 
              animated 
              now={100}
              variant='warning'
            />
          }
          {repos.length > 0 &&
              handleRepos(repoWithContributors)
          }
        </div>
      </div>
    </>
  )

}

export default Hunt