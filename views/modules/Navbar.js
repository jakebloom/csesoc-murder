import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
	render() {
		return (
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
						<ul className="nav navbar-nav navbar-right">
							<li><Link to="/">Admin</Link></li>
							<li><Link to="/">current user</Link></li>
							<li><Link to="/">Log Out</Link></li>
							<li><Link to="/">Login</Link></li>
							<li><Link to="/">Register</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
})


		