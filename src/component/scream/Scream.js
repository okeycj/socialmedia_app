import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyBotton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typograghy from "@material-ui/core/Typography";
// icons

import ChatIcon from "@material-ui/icons/Chat";
import { connect } from "react-redux";
import LikeButton from "./LikeButton";

const style = {
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectFit: "cover"
	}
};

class Scream extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			scream: {
				body,
				date,
				userImage,
				userHandle,
				_id,
				likeCount,
				commentCount
			},
			user: { authenticated, credientials }
		} = this.props;
		const deleteButton =
			authenticated && userHandle === credientials.userHandle ? (
				<DeleteScream screamId={_id} />
			) : null;
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="Profile image"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typograghy
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typograghy>
					{deleteButton}
					<Typograghy variant="body2" color="textSecondary">
						{dayjs(date).fromNow()}
					</Typograghy>
					<Typograghy varient="body1">{body}</Typograghy>
					<LikeButton screamId={_id} />
					<span>{likeCount} Likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
					<ScreamDialog screamId={_id} userHandle={userHandle} />
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(withStyles(style)(Scream));
