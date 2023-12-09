import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import BookFlight from './BookFlight'
import SavedFlights from './SavedFlights'
import Login from './Login'
import Home from '../components/Home'


//const url = "https://destination-unknown-backend.herokuapp.com";
const url = "http://localhost:3002";

class BodyContainer extends React.Component {

  state = {
    flights: ["default"],
    invalid: false,
    isLoading: false,
    index: 0,
    roundTripFlight: false
  }

  clearPage = () => {
    this.setState({
      flights: ["default"]
    })
  }

  handleSort = (sortOption) => {
    switch(sortOption){
      case "Price: Low to High":
        return this.sortPriceLowToHigh()
      case "Price: High to Low":
        return this.sortPriceHighToLow()
      case "Departure Time":
        return this.sortDepartureTime()
      case "Arrival Time":
        return this.sortArrivalTime()
      case "City: A-Z":
        return this.sortCity()
      default:
        return this.sortPriceLowToHigh()
    }
  }

  sortCity = () => {

    let sortedFlights = []

    if (this.state.roundTripFlight) {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a[1].end_location.localeCompare(b[1].end_location)
      })
    } else {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a.end_location.localeCompare(b.end_location)
      })
    }
    this.setState({
      flights: sortedFlights,
      index: 0
    })
  }

  sortDepartureTime = () => {

    let sortedFlights = []

    if (this.state.roundTripFlight) {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a[1].unx_dtime - b[1].unx_dtime
      })
    } else {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a.unx_dtime - b.unx_dtime
      })
    }
    this.setState({
      flights: sortedFlights,
      index: 0
    })
  }

  sortArrivalTime = () => {

    let sortedFlights = []

    if (this.state.roundTripFlight) {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a[1].unx_atime - b[1].unx_atime
      })
    } else {
      sortedFlights = [...this.state.flights].sort((a,b) => {
      return a.unx_atime - b.unx_atime
      })
    }
    this.setState({
      flights: sortedFlights,
      index: 0
    })
  }

  sortPriceHighToLow = () => {

    let sortedFlights = []

    if (this.state.roundTripFlight) {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return b[0].price - a[0].price
      })
    } else {
      sortedFlights = [...this.state.flights].sort((a,b) => {
      return b.price - a.price
      })
    }
    this.setState({
      flights: sortedFlights,
      index: 0
    })
  }

  sortPriceLowToHigh = () => {

    let sortedFlights = []

    if (this.state.roundTripFlight) {
      sortedFlights = [...this.state.flights].sort((a,b) => {
        return a[0].price - b[0].price
      })
    } else {
      sortedFlights = [...this.state.flights].sort((a,b) => {
      return a.price - b.price
      })
    }
    this.setState({
      flights: sortedFlights,
      index: 0
    })
  }

  nextFlights = () => {
    if (this.state.index + 10 >= this.state.flights.length) {
      return null
    } else {
      this.setState( prevState => {
        return {
          index: prevState.index + 10
        }
      }, () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
      })
    }
  }

  previousFlights = () => {
    if (this.state.index <= 0) {
      return null
    } else {
      this.setState( prevState => {
        return {
          index: prevState.index - 10
        }
      }, () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
      })
    }
  }

  firstFlights = () => {
    this.setState({
      index: 0
    }, () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
    })
  }

  renderFlights = () => {
    return this.state.flights.slice(this.state.index, this.state.index + 10)
  }

  renderCurrentPage = () => {
    const bookFlightComponent = < BookFlight nextFlights={this.nextFlights} firstFlights={this.firstFlights} previousFlights={this.previousFlights} handleSearchFlight={this.handleSearchFlight} roundTripFlight={this.state.roundTripFlight} flights={this.state.invalid ? "invalid" : this.renderFlights()} handleSort={this.handleSort} clearPage={this.clearPage}/>
    return <Switch>
      <Route exact path='/' render={() => <Home/> } />
      <Route path='/my-flights' render={(routeProps) => < SavedFlights {...routeProps}/>} />
      <Route path='/search-flights' render={() => bookFlightComponent} />
      <Route path='/login' render={() => < Login setCurrentUser={this.props.setCurrentUser}/>} />
      <Redirect to="/search-flights" />
    </Switch>
  }

  renderLoadingScreen = () => {
    if(this.state.isLoading){
    return(
      <div className="ui active dimmer">
        <div id="loading-text" className="ui text loader">Finding You Amazing Destinations!</div>
      </div>
    )
    } else {
      return null
    }
  }

  handleSearchFlight = (formData) => {
    this.setState({
      isLoading: true
     })

    if (formData.roundTrip) {
      fetch(`${url}/flightsSearchRound`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({return_date: formData.returnDateFormatted, start_location: formData.departure, date: formData.dateFormatted, price: formData.budget, currency: formData.currency})
      })
      .then(res=>res.json())
      .then(flights => {
        if(flights[0] === "invalid"){
          this.setState({
            flights: [],
            invalid: true,
            isLoading: false,
            roundTripFlight: false
          })
        } else {
          this.setState({
            flights: flights,
            roundTripFlight: true,
            isLoading: false,
            invalid: false,
          })
        }
      })
    } else {
      fetch(`${url}/flightsSearch`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({start_location: formData.departure, date: formData.dateFormatted, price: formData.budget, currency: formData.currency})
      })
      .then(res=>res.json())
      .then(flights => {
        if(flights[0] === "invalid"){
          this.setState({
            flights: [],
            invalid: true,
            isLoading: false
          })
        } else {
          this.setState({
            flights: flights,
            invalid: false,
            isLoading: false,
            roundTripFlight: false
          })
        }
      })
    }
  }

  render(){
    // console.log(this.state.flights);
    return(
      <div className="main-body">
      {this.renderLoadingScreen()}
      {this.renderCurrentPage()}
      </div>
    )
  }
}

export default BodyContainer
