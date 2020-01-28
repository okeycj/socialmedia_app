import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import MyButton from "../util/MyBotton";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notification from "@material-ui/icons/Notifications";

class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<MyButton tip="Post a Scream!">
								<AddIcon color="primary" />
							</MyButton>
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon color="primary" />
								</MyButton>
							</Link>
							<MyButton tip="Notification">
								<Notification color="primary" />
							</MyButton>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

Navbar.propsTypes = {
	authenticated: PropsTypes.bool.isRequired
};
const mapStateToProps = state => ({
	authenticated: state.authenticated
});

export default connect(mapStateToProps)(Navbar);