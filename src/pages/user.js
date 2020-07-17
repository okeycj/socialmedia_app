import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../component/scream/Scream";
import StaticProfile from "../component/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
	state = {
		profile: null
	};
	componentDidMount() {
		console.log("res.data.use");
		const handle = this.props.match.params.handle;
		this.prop.getUserData(handle);
		axios
			.get(`http://localhost:5000/api/user/${handle}`)
			.then(res => {
				this.setState({
					profile: res.data.user
				});
				console.log(res.data.user);
			})
			.catch(err => console.log(err));
	}

	render() {
		const { loading, screams } = this.props.data;

		const screamsMarkup = loading ? (
			<p>Loading Data....</p>
		) : screams == null ? (
			<p>No screams from this user</p>
		) : (
			screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
		);

		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{screamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<p>Loading profile...</p>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});
export default connect(mapStateToProps, { getUserData })(user);
