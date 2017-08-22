import React, { Component } from 'react';

/**
* Progress bar that shows only percentage
*/
class ProgressBar extends Component {
	render() {
		return (
			<div className="progress-bar-wrapper">
        <div className="progress-bar-progress" style={{width: this.props.percentage + '%', backgroundColor: this.props.color}}/>
				<div className="progress-bar-total" style={{backgroundColor: this.props.color}} />
			</div>
		);
	}
}

export default ProgressBar;