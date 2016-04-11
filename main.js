import React from 'react'
import { render } from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import Navbar from './views/modules/Navbar.js'
import Home from './views/modules/Home.js'
import Register from './views/modules/Register.js'
import Login from './views/modules/LogIn.js'
import Me from './views/modules/Me.js'
import Admin from './views/modules/Admin.js'

render(
	<Router history={hashHistory}>
		<Route path="/" component={Navbar}>
			<IndexRoute component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/me" component={Me} />
			<Route path="/admin" component={Admin} />
		</Route>
	</Router>
	, document.getElementById('app')
)