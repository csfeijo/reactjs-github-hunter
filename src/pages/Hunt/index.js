import React, { useEffect, useState } from 'react'
import { getContributorData, getContributors, getRepos } from '../../services/github'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'


const Hunt = () => {

  const [token, setToken] = useState('')
  const [org, setOrg] = useState('aziontech')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [repoWithContributors, setRepoWithContributors] = useState({})


  const [nome, setNome] = useState('')

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

            getContributorData({
              userName: c.login
            }).then((resp) => {
              console.log(resp)
              setNome(resp.data.name)
            })

            return (
              <ListGroup.Item key={i}>
                <div className='row'>
                  <div className='col-1'>
                    <Image 
                      src={c.avatar_url} 
                      fluid={true}
                      rounded={true}
                      thumbnail={true}
                    />
                  </div>
                  <div className='col'>
                    <a
                      href={`https://github.com/${c.login}`} 
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Button 
                        variant='light'
                        className='btn-sm'
                      >
                        <FontAwesomeIcon 
                          icon={faAddressCard}
                        />
                        &nbsp;
                        {c.login}
                      </Button>
                    </a>
                    <br/>
                    {/* <Button 
                      variant="secondary"
                      size="sm"
                      className='mt-3'
                      onClick={() => {
                        alert(9)
                      }}
                    >
                      Fetch info
                    </Button> */}
                  </div>
                </div>
              </ListGroup.Item>
            )
          })}
          
        </ListGroup>
      )
    })
  }

  return (
    <div className='mt-3 mb-3'>
      <h1>Hunt Contributors</h1>
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
            <div className='mb-3 mt-3 text-center'>
              <Spinner 
                animation="border" 
                variant="warning"
              />
            </div>
          }
          {repos.length > 0 &&
              handleRepos(repoWithContributors)
          }
        </div>
      </div>
    </div>
  )

}

export default Hunt