import React, { Component } from "react";
// import axios from "axios";
import Scream from "../component/scream/Scream";
import Profile from "../component/profile/Profile";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
class home extends Component {
	componentDidMount() {
		this.props.getScreams();
	}
	render() {
		const { screams, loading } = this.props.data;
		let recentScreamsMarkup = !loading ? (
			screams.map(scream => <Scream key={scream._id} scream={scream} />)
		) : (
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentScreamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	getScreams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
