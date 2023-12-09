import React from "react";
import DatePicker from "react-datepicker";
import { Dropdown } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import airports from '../airport_data'
var moment = require("moment");

const airportData = airports.map(airport => {
  return {key: uuidv4(), value: airport.iata, text: `${airport.city}, ${airport.name}`}
})


class BookFlightForm extends React.Component {

  state = {
    departure: "",
    filteredAirports: [],
    placeholderOutDate: null,
    dateFormatted: "",
    placeholderInDate: null,
    returnDateFormatted: "",
    budget: "",
    currency: "USD",
    roundTrip: false,
  }

  handleOutDateChange = (date) => {
    const storedMoment = moment(date).format("DD/MM/YYYY");
    this.setState({
      placeholderOutDate: date,
      dateFormatted: storedMoment
    });
  }

  handleReturnDateChange = (date) => {
    const storedMoment = moment(date).format("DD/MM/YYYY");
    this.setState({
      placeholderInDate: date,
      returnDateFormatted: storedMoment
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  returnAirports = (search) => {
    const selectedAirports = airportData.filter(airport => {
      return airport.text.toLowerCase().includes(search.target.value.toLowerCase())
    })
    this.setState({
      filteredAirports: selectedAirports.slice(0, 10)
    })
  }

  handleAirportChange = (e, {value}) => {
    // this.returnAirports(e.target.value)
    this.setState({
      departure: value
    })
  }

  setCurrency = (e) => {
    this.setState({
      currency: e.target.value
    })
  }

  setRoundTrip = () => {
    this.setState(prevState => {
      return {
        roundTrip: !prevState.roundTrip
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSearchFlight(this.state)
  }

  render(){
    console.log(this.state.departure);
    return(
      <form autoComplete="off" onSubmit={this.handleSubmit} className="ui form" id="search-form" >
        <div className="two fields">
          <div id="currency-dropdown" className="field">
            <select className="ui search dropdown" onChange={this.setCurrency}>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </div>

          <div id="roundTrip-dropdown" className="field">
            <select className="ui search dropdown" onChange={this.setRoundTrip}>
              <option>One Way</option>
              <option>Round Trip</option>
            </select>
          </div>
        </div>

        <div className={this.state.roundTrip ? "four fields" : "three fields"}>

        <div className="field">
        <label>Departure City</label>
          <Dropdown
            placeholder='Select Airport'
            fluid
            search
            selection
            value={this.state.departure}
            options={this.state.filteredAirports}
            onSearchChange={this.returnAirports}
            onChange={this.handleAirportChange}
          />
          </div>

          <div className="field">
            <label>Max Budget</label>
            <div className="ui disabled icon input">
              <i className="dollar icon"></i>
              <input type="number" onChange={this.handleChange} value={this.state.budget} name={"budget"} placeholder="Budget" />
            </div>
          </div>

          <div className="field">
            <label>Departure Date</label>
            <DatePicker
              id="datePicker"
              placeholderText={moment(new Date()).format("MM/DD/YYYY")}
              minDate={new Date()}
              selected={this.state.placeholderOutDate}
              onChange={this.handleOutDateChange}
            />
          </div>

          {this.state.roundTrip &&
          <div className="field">
            <label>Return Date</label>
            <DatePicker
              id= "datePicker"
              placeholderText={this.state.dateFormatted && moment(new Date(this.state.placeholderOutDate)).format("MM/DD/YYYY")}
              selected={this.state.placeholderInDate}
              minDate={this.state.placeholderOutDate}
              onChange={this.handleReturnDateChange}
              />
          </div>
          }
        </div>
          <button id="searchflight-button" className="ui button yellow">Find a Destination!</button>
      </form>
    )
  }
}

export default BookFlightForm
