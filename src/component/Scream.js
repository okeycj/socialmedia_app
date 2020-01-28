import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyBotton";
import DeleteScream from "./DeleteScream";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typograghy from "@material-ui/core/Typography";
// icons

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

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
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				like => like.screamId === this.props.scream._id
			)
		)
			return true;
		else return false;
	};

	likeScream = () => {
		// console.log(this.props.scream._id);
		this.props.likeScream(this.props.scream._id);
	};

	unlikeScream = () => {
		this.props.unlikeScream(this.props.scream._id);
	};
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
			user: {
				authenticated,
				credientials
			}
		} = this.props;
		const likeButton = !authenticated ? (
			<MyButton tip="like">
				<Link to="/login">
					<FavoriteBorder color="primary" />
				</Link>
			</MyButton>
		) : this.likedScream() ? (
			<MyButton tip="Undo Like" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="like" onClick={this.likeScream}>
				<FavoriteBorder color="primary" />
			</MyButton>
		);
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
					{likeButton}
					<span>{likeCount} Likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(style)(Scream));
