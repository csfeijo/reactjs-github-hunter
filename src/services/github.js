import api from './api'


// Estrutura para usar o try/catch na APP
export const getRepos = async ({ token, org }) => {
  // https://api.github.com/orgs/$GH_ORG/repos
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json'
  }

  let error = {}
  const resp = await api
    .get(`/orgs/${org}/repos`, { headers })
    .catch(e => { error = e.response })
  return resp || error
}

export const getContributors = async ({ token, org, repo }) => {
  // https://api.github.com/repos/$GH_REPO/contributors
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json'
  }

  let error = {}
  const resp = await api
    .get(`repos/${org}/${repo}/contributors`, { headers })
    .catch(e => { error = e.response })
  return resp || error
}

export const getContributorData = async ({ userName }) => {
  let error = {}
  const resp = await api
    .get(`${userName}`)
    .catch(e => { error = e.response })
  return resp || error
}