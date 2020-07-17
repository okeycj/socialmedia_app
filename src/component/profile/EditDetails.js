import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyBotton from "../../util/MyBotton";
// redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
	...theme.others,
	button: {
		float: "right"
	}
});

class EditDetails extends Component {
	state = {
		bio: "",
		website: "",
		location: "",
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credientials);
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	componentDidMount() {
		const { credientials } = this.props;
		this.mapUserDetailsToState(credientials);
	}

	mapUserDetailsToState = credientials => {
		this.setState({
			bio: credientials.bio ? credientials.bio : "",
			website: credientials.website ? credientials.website : "",
			location: credientials.location ? credientials.location : ""
		});
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<MyBotton
					tip="Edit details"
					onClick={this.handleOpen}
					btnClassName={classes.button}
				>
					<EditIcon color="primary" />
				</MyBotton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="A short bio about yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="text"
								label="Website"
								placeholder="Your personal/professional website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label=":Location"
								placeholder="where you live"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	credientials: state.user.credientials
});

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { editUserDetails })(
	withStyles(styles)(EditDetails)
);
