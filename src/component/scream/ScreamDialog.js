import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyBotton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icon
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
	...theme.others,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover"
	},
	dialogContent: {
		padding: 20
		// overflow: "hidden"
	},
	closeButton: {
		position: "absolute",
		left: "90%"
	},
	expandButton: {
		position: "absolute",
		left: "90%"
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginButtom: 50
	}
});

class ScreamDialog extends Component {
	state = {
		open: false
	};
	handleOpen = () => {
		this.setState({ open: true });
		this.props.getScream(this.props.screamId);
	};
	handleClose = () => {
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			classes,
			scream: {
				_id,
				body,
				date,
				likeCount,
				commentCount,
				userImage,
				userHandle
			},
			comments,
			UI: { loading }
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={150} thickness={1} />
			</div>
		) : (
			<Grid container spacing={10} style={{ width: "100%", margin: "auto" }}>
				<Grid item sm={5}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={6}>
					<Typography
						component={Link}
						color="primary"
						variant="h5"
						to={`/users/${userHandle}`}
					>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography varient="body2" color="textSecondary">
						{dayjs(date).format("h:mm a, MMM DD YYYY")}
					</Typography>
					<Typography varient="body1">{body}</Typography>
					<LikeButton screamId={_id} />
					<span>{likeCount} likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
					<hr className={classes.invisibleSeparator} />
				</Grid>
				<hr className={classes.visibleSeparator} />
				<CommentForm screamId={_id} />
				<Comments comments={comments} />
			</Grid>
		);
		return (
			<Fragment>
				<MyButton
					onClick={this.handleOpen}
					tip="Expand scream"
					tipClassName={classes.expandButton}
				>
					<UnfoldMore color="primary" />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<MyButton
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}
ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	scream: state.data.scream.scream,
	comments: state.data.scream.comments,
	UI: state.UI
});

const mapActionsToProps = {
	getScream,
	clearErrors
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog));
