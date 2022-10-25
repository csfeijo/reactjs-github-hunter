import MockAdapter from 'axios-mock-adapter'
import githubRepos from '../mocks/githubReposMock.json'
import githubContributors from '../mocks/githubContributorsMock.json'

const configureMock = (axios) => {
  const mock = new MockAdapter(axios, { delayResponse: 500 })

  // TODO: remove this static aziontech and use the dynamic value - regex maybe?
  mock.onGet('orgs/aziontech/repos').reply(200, githubRepos)
  mock.onGet('repos/aziontech/azionmanager/contributors').reply(200, githubContributors)
  mock.onGet('repos/aziontech/azionadmin/contributors').reply(200, githubContributors)
  mock.onGet('repos/aziontech/azionglb/contributors').reply(200, githubContributors)

}

export default configureMock
