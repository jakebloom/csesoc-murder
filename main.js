import React from 'react'
import { render } from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import Navbar from './views/modules/Navbar.js'
import Home from './views/modules/Home.js'
import Register from './views/modules/Register.js'
import Login from './views/modules/LogIn.js'
import Me from './views/modules/Me.js'
import Admin from './views/modules/Admin.js'

function getToken(){
	if (localStorage.jwt){
		return JSON.parse(atob(localStorage.jwt.split('.')[1]));
	}
	return null
}

function isValid(token){
	return token.exp > Date.now() / 1000
}

function requireLogin(nextState, replace) {
  var token = getToken()
  if (!token || !isValid(token)) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAdmin(nextState, replace) {
	var token = getToken()
	if (!token || token.admin !== true || !isValid(token)) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
	}
}

render(
	<Router history={hashHistory}>
		<Route path="/" component={Navbar}>
			<IndexRoute component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/me" component={Me} onEnter={requireLogin}/>
			<Route path="/admin" component={Admin} onEnter={requireAdmin}/>
		</Route>
	</Router>
	, document.getElementById('app')
)