import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isActiveId: 'ALL',
    fetechedData: [],
    isLoading: 'INITIAL',
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    this.setState({isLoading: 'INITIAL'})
    const {isActiveId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${isActiveId}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({fetechedData: updatedData, isLoading: 'SUCCESS'})
    } else {
      this.setState({isLoading: 'FAIL'})
    }
  }

  onChangeStyling = id => {
    this.setState(
      {
        isActiveId: id,
      },
      this.getItems,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderSuccessView = () => {
    const {fetechedData} = this.state

    return (
      <ul className="items">
        {fetechedData.map(eachItem => (
          <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'INITIAL':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAIL':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isActiveId, fetechedData} = this.state
    console.log(fetechedData)
    return (
      <div className="bg-container">
        <h1>Popular</h1>
        <ul className="language-buttons">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageItem={eachItem}
              isActive={eachItem.id === isActiveId}
              onChangeStyling={this.onChangeStyling}
            />
          ))}
        </ul>
        {this.renderView()}
      </div>
    )
  }
}

export default GithubPopularRepos
// Write your code here
