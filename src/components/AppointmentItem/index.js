import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStar} = props
  const {title, date, id, isStarred} = appointmentDetails

  const onClickStar = () => {
    onChangeStar(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-card">
      <div className="appointment-details">
        <p className="appointment-para">{title}</p>
        <button
          className="appointment-btn"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starImg} className="appointment-star" alt="star" />
        </button>
      </div>
      <p className="appointment-time">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
