import React from 'react'

export default React.createClass({
	render() {
		return (
			<div className={"alert row alert-" + this.props.type}> 
				<span>message</span> 
			</div>
		)
	}
})