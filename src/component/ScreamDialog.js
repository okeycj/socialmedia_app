import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyBotton from "../util/MyBotton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core";
// Icon
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/core/UnfoldMore";
// Redux stuff
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = {};

class ScreamDialog extends Component {
	state = {
		open: false
	};
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {
			classes,
			scream: {
				_id,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				userHandle
			},
			UI: { loading }
        } = this.props;
        
        return (
            <Fragment>
                <MyBotton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyBotton>
                <Dialog>
                    
                </Dialog>
            </Fragment>
        )
	}
}
ScreamDialog.propTypes = {
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	scream: state.data.scream,
	UI: state.UI
});

const mapActionsToProps = {
	getScream
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog));
