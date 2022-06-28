// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, onChangeStyling} = props
  const {id, language} = languageItem
  const style = isActive ? 'button' : 'button1'
  console.log(isActive)

  const changeStatus = () => {
    onChangeStyling(id)
  }

  return (
    <li className="list-item">
      <button onClick={changeStatus} className={style} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
