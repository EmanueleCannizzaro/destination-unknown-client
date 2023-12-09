import React from "react";
import PastFlights from '../components/PastFlights'
import UpcomingFlights from '../components/UpcomingFlights'
import withAuth from '../HOC/withAuth'

//const url = "https://destination-unknown-backend.herokuapp.com";
const url = 'http://localhost:3002/search-flights';

class SavedFlights extends React.Component {

  state = {
    flights: [],
    upcomingIndex: 0,
    pastIndex: 0
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    fetch(`${url}/flights`, {
    headers: {"Authorization": token}
    })
    .then(res=>res.json())
    .then(flights => {
      this.setState({
        flights: flights
      })
    })
  }

  upcomingFlights = () => {

    const upcomingFlights = this.state.flights.filter(flight => {
      return new Date(flight.departure_date) > new Date()
    })
    return upcomingFlights.sort((a,b) => {
      return new Date(a.departure_date) - new Date(b.departure_date)
    })
  }

  pastFlights = () => {
    const pastFlights = this.state.flights.filter(flight => {
      return new Date(flight.departure_date) < new Date()
    })
    return pastFlights.sort((a,b) => {
      return new Date(b.departure_date) - new Date(a.departure_date)
    })
  }

  nextFlights = (tense, funcName) => {
    if (this.state[tense] + 3 >= this[funcName]().length) {
      return null
    } else {
      this.setState( prevState => {
        return {
        [tense]: prevState[tense] + 3
        }
      })
    }
  }

  previousFlights = (tense) => {
    if (this.state[tense] <= 0) {
      return null
    } else {
      this.setState( prevState => {
        return {
          [tense]: prevState[tense] - 3
        }
      })
    }
  }

  firstFlights = (tense) => {
    this.setState({
      [tense]: 0
    })
  }

  render(){
    return(
      <div>
          <UpcomingFlights flights={this.upcomingFlights().slice(this.state.upcomingIndex, this.state.upcomingIndex + 3)} nextFlights={this.nextFlights} firstFlights={this.firstFlights} previousFlights={this.previousFlights}/>
          <PastFlights flights={this.pastFlights().slice(this.state.pastIndex, this.state.pastIndex + 3)} nextFlights={this.nextFlights} firstFlights={this.firstFlights} previousFlights={this.previousFlights}/>
      </div>
    )
  }
}

export default withAuth(SavedFlights)
