import React from "react";
import { Link } from 'react-router-dom'

class Home extends React.Component {

  render(){
    return(
      <div id="homePage">
      <div className="adventureAwaits">eDreams Odigeo...</div>
      <h2>You've got the travel bug, but where you should you go?</h2>
      <p id="homePageParagraph">
      Destination Unknown allows you to search for flights using only a start
      location, your travel date(s), and the maximum amount you want to spend
      on your ticket. <b>We'll find you unique destinations within your budget!</b>
      </p>
      <Link to="/search-flights"><button id="startAdventureButton" className="ui button yellow">Start Your Adventure Now</button></Link>
      <p id="bottomP">Clicking on Buy Ticket button will redirect you to www.kiwi.com to complete your purchase.</p>
      </div>
    )
  }

}

export default Home
