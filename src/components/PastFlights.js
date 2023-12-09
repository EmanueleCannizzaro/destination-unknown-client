import React from 'react'
import Flight from './Flight'
import { v4 as uuidv4 } from 'uuid';
import MoreFlightsButton from './MoreFlightsButton'

export default class PastFlights extends React.Component {

    renderflights = (flights) => flights.map(flight => < Flight key={uuidv4()} flight={flight}/>)

    render() {
      return(
        <div className="flight-block">
          <h1>Past Flights</h1>
          {this.props.flights.length !== 0 ? this.renderflights(this.props.flights): <h3>No Past Flights to Show</h3>}
          {this.props.flights.length !== 0 ?
            < MoreFlightsButton
              nextFlights={() => this.props.nextFlights("pastIndex", "pastFlights")}
              previousFlights={() => this.props.previousFlights("pastIndex", "pastFlights")}
              firstFlights={() => this.props.firstFlights("pastIndex", "pastFlights")}
            /> : null }
        </div>
      )
    }
}
