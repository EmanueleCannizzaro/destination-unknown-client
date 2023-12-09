import React from "react";

//const url = "https://destination-unknown-backend.herokuapp.com";
const url = "http://localhost:3002";

class Login extends React.Component {

  state = {
    login:
      {
        loginUsername: '',
        loginPassword: '',
        loginErrors: null,
      },
    signup:
      {
        signupName: '',
        signupUsername: '',
        signupPassword: '',
        signupConfirmPassword: '',
        signupErrors: null
      },
  }

  handleLoginChange = (e) => {
    this.setState({
      login: {
        ...this.state.login,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSignupChange = (e) => {
    this.setState({
      signup: {
        ...this.state.signup,
        [e.target.name]: e.target.value
      }
    })
  }

  createUser = (e) => {
    e.preventDefault()
    const {signup} = this.state
    if (signup.signupPassword === signup.signupConfirmPassword) {
      fetch(`${url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signup),
        headers:{'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors){
          this.setState({
            ...this.state.signup,
            signupErrors: response.errors
          })
        } else {
          this.props.setCurrentUser(response)
        }
      })
    } else {
      this.setState({
        ...this.state.signup,
        signupErrors: "Passwords don't match"
      })
    }
  }

  login = (e) => {
    e.preventDefault()
    fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify(this.state.login),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors){
        this.setState({
          ...this.state.login,
          loginErrors: response.errors
        })
      } else {
        this.props.setCurrentUser(response)
      }
    })
  }

  render(){
    return(
      <div className="ui placeholder segment">
        <div className="ui two column stackable center aligned grid">
          <div className="ui vertical divider">Or</div>
          <div className="middle aligned row">

            <div className="column login-page-div">
              <h1>Login</h1>
              <div className="ui input">
                <form className="ui form login-page-form" onSubmit={this.login}>
                {this.state.loginErrors && <div className="field ui negative message">{this.state.loginErrors}</div> }
                  <div className="field">
                    <input name="loginUsername" onChange={this.handleLoginChange} placeholder="username"/>
                  </div>
                  <div className="field">
                    <input type="password" name="loginPassword" onChange={this.handleLoginChange} placeholder="password"/>
                  </div>
                    <button className="ui button yellow login-signup-buttons">Login</button>
                </form>
              </div>
            </div>

            <div className="column login-page-div">
              <h1>Sign Up</h1>
              <div className="ui input">
                <form className="ui form login-page-form" onSubmit={this.createUser}>
                {this.state.signupErrors && <div className="field ui negative message">{this.state.signupErrors}</div>}
                  <div className="two fields">
                    <div className="field">
                      <input name="signupName" onChange={this.handleSignupChange} placeholder="name"/>
                    </div>
                    <div className="field">
                      <input  name="signupUsername" onChange={this.handleSignupChange} placeholder="username"/>
                    </div>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <input type="password" name="signupPassword" onChange={this.handleSignupChange} placeholder="password"/>
                    </div>
                    <div className="field">
                      <input type="password" name="signupConfirmPassword" onChange={this.handleSignupChange} placeholder="password confirm"/>
                    </div>
                  </div>
                    <button className="ui button yellow login-signup-buttons">Sign Up</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Login
