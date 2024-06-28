import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    starredList: [],
    isStarListActive: false,
    title: '',
    date: '',
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    const enteredDate = event.target.value

    this.setState({
      date: enteredDate,
    })
  }

  onAddAppointements = event => {
    event.preventDefault()

    const {title, date} = this.state

    if (title === '' || date === '') {
      return
    }

    const newDate = new Date(date)

    const year = newDate.getFullYear()

    const month = newDate.getMonth()

    const day = newDate.getDate()

    const formatedDate = format(
      new Date(year, month, day),
      'dd MMMM yyyy, EEEE',
    )

    const listObj = {
      id: uuidv4(),
      title,
      date: formatedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, listObj],
      title: '',
      date: '',
    }))
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isStarred: !eachObj.isStarred}
        }
        return eachObj
      }),
    }))
  }

  onClickForStarList = () => {
    const {isStarListActive} = this.state

    if (isStarListActive === false) {
      this.setState(prevState => ({
        starredList: prevState.appointmentList.filter(
          eachObj => eachObj.isStarred === true,
        ),
        isStarListActive: !prevState.isStarListActive,
      }))
    }

    if (isStarListActive) {
      this.setState({
        isStarListActive: false,
      })
    }
  }

  render() {
    const {title, date, isStarListActive} = this.state

    let listOfAppointements = null

    if (isStarListActive) {
      const {starredList} = this.state
      listOfAppointements = starredList
    } else {
      const {appointmentList} = this.state
      listOfAppointements = appointmentList
    }

    const starBtnBg = isStarListActive ? 'clicked-star-bg' : ''

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="add-appointment-container">
            <form
              className="appointment-section"
              onSubmit={this.onAddAppointements}
            >
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                value={title}
                type="input"
                className="title-input"
                id="title"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <label className="label" htmlFor="title" type="date">
                Date
              </label>
              <input
                value={date}
                type="date"
                className="date-input"
                id="title"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
              />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="img"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div className="appointment-list-section">
            <div className="appointment-detail">
              <h1 className="heading">Appointments</h1>
              <button
                className={`star-btn ${starBtnBg}`}
                onClick={this.onClickForStarList}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointment-container">
              {listOfAppointements.map(eachObj => (
                <AppointmentItem
                  appointmentDetails={eachObj}
                  key={eachObj.id}
                  onChangeStar={this.onChangeStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
