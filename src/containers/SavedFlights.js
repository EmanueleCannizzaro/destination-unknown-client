import React from "react";
import Flight from '../components/Flight'
import v4 from 'uuid'

class SavedFlights extends React.Component {

  state = {
    flights: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/flights')
    .then(res=>res.json())
    .then(flights => {
      this.setState({
        flights: flights
      })
    })
  }

  upcomingFlights = () => {
    return this.state.flights.filter(flight => {
      return new Date(flight.departure_date) > new Date()
    })
  }

  pastFlights = () => {
    return this.state.flights.filter(flight => {
      return new Date(flight.departure_date) < new Date()
    })
  }

  renderflights = (flights) => {
    return flights.map(flight => < Flight key={v4()} flight={flight}/>)
  }

  render(){
    return(
      <div>
        <h1>Upcoming Flights</h1>
          {this.upcomingFlights().length != 0 ? this.renderflights(this.upcomingFlights()): <h2>No Upcoming Flights</h2>}
        <h1>Past Flights</h1>
          {this.pastFlights().length != 0 ? this.renderflights(this.pastFlights()): <h2>No Past Flights</h2>}
      </div>
    )
  }
}

export default SavedFlights
