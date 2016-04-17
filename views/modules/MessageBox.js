import React from 'react'

export default React.createClass({
	render() {
		var box = "";
		if (this.props.type && this.props.message) {
			box = (<div className={"alert row alert-" + this.props.type}> 
						<span>{this.props.message}</span> 
					</div>);	
		}
		return (
			<div>{box}</div>
		)
	}
})