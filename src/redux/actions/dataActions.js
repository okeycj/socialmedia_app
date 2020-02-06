import {
	SET_SCREAMS,
	SET_SCREAM,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	SET_ERRORS,
	CLEAR_ERRORS,
	POST_SCREAM,
	LOADING_UI,
	STOP_LOADING_UI
} from "../types";
import axios from "axios";

export const getScreams = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get("http://localhost:5000/api/scream/allscreams")
		.then(res => {
			dispatch({
				type: SET_SCREAMS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_SCREAMS,
				payload: []
			});
		});
};
// Post a Scream

export const postScream = newScream => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post("http://localhost:5000/api/scream/addscream", newScream)
		.then(res => {
			dispatch({
				type: POST_SCREAM,
				payload: res.data
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Like a scream
export const likeScream = screamId => dispatch => {
	axios
		.get(`http://localhost:5000/api/scream/like/${screamId}`)
		.then(res => {
			dispatch({
				type: LIKE_SCREAM,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

// Unlike a scream
export const unlikeScream = screamId => dispatch => {
	axios
		.get(`http://localhost:5000/api/scream/unlike/${screamId}`)
		.then(res => {
			dispatch({
				type: UNLIKE_SCREAM,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const deleteScream = screamId => dispatch => {
	axios
		.delete(`http://localhost:5000/api/scream/${screamId}`)
		.then(() => {
			dispatch({
				type: DELETE_SCREAM,
				payload: screamId
			});
		})
		.catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const getScream = screamId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios.get(`http://localhost/scream/${screamId}`).then(res => {
		dispatch({
			type: SET_SCREAM,
			payload: res.data
		});
		dispatch({ type: STOP_LOADING_UI });
	});
};
