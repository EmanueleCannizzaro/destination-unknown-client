import React from "react";
import BookFlightForm from '../components/BookFlightForm'
import Flight from '../components/Flight'
import Sort from '../components/Sort'
import MoreFlightsButton from '../components/MoreFlightsButton'
import { v4 as uuidv4 } from 'uuid';
import RoundTripFlight from '../components/RoundTripFlight'

//const url = "https://destination-unknown-backend.herokuapp.com";
const url = "http://localhost:3002";

class BookFlight extends React.Component {

  componentWillUnmount(){
      this.props.clearPage()
  }

  renderflights = () => {
    if (this.props.flights === "invalid") {
      return <div className="ui negative message error-message">
        <div className="header">Invalid search. Try searching for a major city or use an airport code.</div>
      </div>
    } else if (this.props.flights.length === 0) {
      return <div className="ui yellow message error-message">
        <div className="header">No Matching Flights. Try Increasing your budget!</div>
    </div>
    } else if (this.props.flights[0] === "default") {
      return null
    } else if ( this.props.roundTripFlight === false){
      return (
        <div>
        < Sort handleSort={this.props.handleSort}/>
        {this.props.flights.map(flight => < Flight key={uuidv4()} handleClick={this.handleClick} flight={flight} button={true}/>)}
        </div>
      )
    } else {
      return (
        <div>
        < Sort handleSort={this.props.handleSort}/>
        {this.props.flights.map(flight => < RoundTripFlight key={uuidv4()} handleClick={this.handleClick} flight={flight} button={true}/>)}
        </div>
      )
    }
  }

    // booking/saving ticket function
    handleClick = (flight) => {

      const newUrl = flight.length ? `${url}/roundTrip` : `${url}/flights`
      alert(newUrl);

      const token = localStorage.getItem("token")
      if(token){
        fetch(newUrl, {
          method: 'POST',
          headers: {"Content-Type": "application/json", "Authorization": token},
          body: JSON.stringify(flight)
        })
      }
      flight.length ? window.open(flight[0].booking_url) : window.open(flight.booking_url)
    }

  render(){
    return(
      <div>
      < BookFlightForm handleSearchFlight={this.props.handleSearchFlight}/>
      {this.renderflights()}
      {this.props.flights[0] === "default" ? null : <MoreFlightsButton nextFlights={this.props.nextFlights} previousFlights={this.props.previousFlights} firstFlights={this.props.firstFlights}/>}
    </div>
    )
  }
}

export default BookFlight
