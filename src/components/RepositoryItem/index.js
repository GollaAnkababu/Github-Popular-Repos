// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props

  const {name, avatarUrl, forksCount, issuesCount, starsCount} = itemDetails

  return (
    <li className="item">
      <img className="img" src={avatarUrl} alt={name} />
      <p className="title">{name}</p>
      <div className="container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
