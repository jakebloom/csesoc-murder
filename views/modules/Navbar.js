import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
	logOut(){
		delete localStorage.jwt
	},

	isLoggedIn(){
		if (localStorage.jwt){
			var payload = JSON.parse(atob(localStorage.jwt.split('.')[1]));
			if (payload.exp > Date.now() / 1000) {
				return true
			}
		}
		return false
	},

	render() {
		var buttons;
		if (this.isLoggedIn()) {
			buttons = <ul className="nav navbar-nav navbar-right"><li><Link to="/me">Me</Link></li><li><Link to="/" onClick={this.logOut}>Log Out</Link></li></ul>
		} else {
			buttons = <ul className="nav navbar-nav navbar-right"><li><Link to="/login">Login</Link></li><li><Link to="/register">Register</Link></li></ul>
		}

		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
		    			<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link to="/" className="navbar-brand">CSESoc Murder</Link>
						</div>

						<div className="collapse navbar-collapse">
								{buttons}
						</div>
					</div>
				</nav>
				<div className="row">{this.props.children}</div>
			</div>
		)
	}
})
		