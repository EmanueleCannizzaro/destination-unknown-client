import React from 'react'
import Flight from './Flight'
import { v4 as uuidv4 } from 'uuid';
import MoreFlightsButton from './MoreFlightsButton'

export default class UpcomingFlights extends React.Component {

    renderflights = (flights) => flights.map(flight => < Flight key={uuidv4()} flight={flight}/>)

    render() {
      return(
        <div className="flight-block">
          <h1>Upcoming Flights</h1>
          {this.props.flights.length !== 0 ? this.renderflights(this.props.flights): <h3>No Upcoming Flights to Show</h3>}
          {this.props.flights.length !== 0 ?
            < MoreFlightsButton
              nextFlights={() => this.props.nextFlights("upcomingIndex", "upcomingFlights")}
              previousFlights={() => this.props.previousFlights("upcomingIndex", "upcomingFlights")}
              firstFlights={() => this.props.firstFlights("upcomingIndex", "upcomingFlights")}
            /> : null}
        </div>
      )
    }
}
