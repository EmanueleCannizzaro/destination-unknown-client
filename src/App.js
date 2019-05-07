import React from 'react';
// import { Route, Switch } from 'react-router-dom'
import './App.css';
import Nav from './containers/Nav'
import BodyContainer from './containers/BodyContainer'


class App extends React.Component {

  state = {
    currentUser: null
  }

  setCurrentUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.setItem("token", response.token)
      this.props.history.push('/profile')
    })
  }

  logOut = () => {
		localStorage.removeItem("token")
		this.setState({
			currentUser: null
		}, () => {
			this.props.history.push("/login")
		})
	}

  componentDidMount(){
		const token = localStorage.getItem("token")

		if (token){
			fetch("http://localhost:3000/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then((response) => {
				if (response.errors) {
					alert(response.errors)
				} else {
					this.setState({
						currentUser: response
					})
				}
			})
		}
	}

  render(){
    return (
      <div className="App">
        < Nav currentUser={this.state.currentUser} logOut={this.logOut} handleNavClick={this.handleNavClick}/>
        < BodyContainer setCurrentUser={this.setCurrentUser} currentPage={this.state.currentPage}/>
      </div>
    );
  }
}

export default App;
