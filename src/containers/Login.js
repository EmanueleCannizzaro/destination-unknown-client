import React from "react";

class Login extends React.Component {

  state = {
    login:
      {
        loginUsername: '',
        loginPassword: ''
      },
    signup:
      {
        signupName: '',
        signupUsername: '',
        signupPassword: '',
        signupConfirmPassword: ''
      }
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
    if (this.state.signupPassword === this.state.signupConfirmPassword) {
      fetch(`http://localhost:3000/signup`, {
        method: 'POST',
        body: JSON.stringify(this.state.signup),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors){
          alert(response.errors)
        } else {
          this.props.setCurrentUser(response)
        }
      })
    } else {
      alert("passwords don't match")
    }
  }

  login = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify(this.state.login),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors){
        alert(response.errors)
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
                  <div className="field">
                    <input name="loginUsername" onChange={this.handleLoginChange} placeholder="username"/>
                  </div>
                  <div className="field">
                    <input type="password" name="loginPassword" onChange={this.handleLoginChange} placeholder="password"/>
                  </div>
                    <button className="ui button login-signup-buttons">Login</button>
                </form>
              </div>

            </div>

            <div className="column login-page-div">
              <h1>Sign Up</h1>

              <div className="ui input">
                <form className="ui form login-page-form" onSubmit={this.createUser}>
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
                    <button className="ui button login-signup-buttons">Sign Up</button>
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
