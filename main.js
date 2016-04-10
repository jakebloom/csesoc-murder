import React from 'react'
import { render } from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import Navbar from './views/modules/Navbar.js'

render(
	<Router history={browserHistory}>
		<Route path="/" component={Navbar} />
			
	</Router>
	, document.getElementById('app')
)