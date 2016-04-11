import React from 'react'

export default React.createClass({
	render() {
		return (
			<div className="alert row {{this.props.className}}"> 
				<span>message</span> 
			</div>
		)
	}
})