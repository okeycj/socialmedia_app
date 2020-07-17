import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
	paper: {
		padding: 20
	},
	profile: {
		"& .image-wrapper": {
			textAlign: "center",
			position: "relative"
		},
		"& .profile-image": {
			width: 200,
			height: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%"
		},
		"& .profile-details": {
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle"
			},
			"& a": {
				color: theme.palette.primary.main
			}
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0"
		}
	}
});

const StaticProfile = props => {
	const {
		classes,
		profile: { userHandle, date, profilePics, bio, website, location }
	} = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={profilePics} alt="profile" className="profile-image" />
				</div>
				<div className="profile-details">
					<MuiLink
						component={Link}
						to={`users/${userHandle}`}
						color="primary"
						variant="h5"
					>
						@{userHandle}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<Fragment>
							<LocationOn color="primary" /> <span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{" "}
								{website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{" "}
					<span>Joined {dayjs(date).format("MM YYYY")}</span>
				</div>
			</div>
		</Paper>
	);
};

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default withStyle(styles)(StaticProfile);
